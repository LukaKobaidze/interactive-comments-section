import CommentContext, { CommentType } from './comment-context';
import React, { useEffect, useState } from 'react';
import dataJSON from '../data/data.json';

export type UserType = {
  image: {
    png: string;
    webp: string;
  };
  username: string;
};

export const generateNewComment = (user: UserType, content: string) => {
  return {
    user,
    content,
    id: Math.floor(Math.random() * Date.now()),
    score: [],
    createdAt: new Date().getTime(),
    replies: [],
  };
};

export const generateNewReply = (
  user: UserType,
  content: string,
  replyingTo: string
) => {
  return {
    user,
    content,
    replyingTo,
    id: Math.floor(Math.random() * Date.now()),
    score: [],
    createdAt: new Date().getTime(),
  };
};

export const findCommentWithId = (
  data: typeof dataJSON.comments,
  id: number,
  commentType: CommentType.Comment | CommentType.Reply
) => {
  const commentIndex = data.findIndex(
    comment =>
      comment.id === id || comment.replies.some(reply => reply.id === id)
  );
  const replyIndex =
    commentType === CommentType.Reply
      ? data[commentIndex].replies.findIndex(reply => reply.id === id)
      : undefined;

  return commentType === CommentType.Reply
    ? data[commentIndex].replies[replyIndex!]
    : data[commentIndex];
};

type Props = {
  children: React.ReactNode;
};

const CommentContextProvider = ({ children }: Props) => {
  const initialCommentsData = () =>
    JSON.parse(window.localStorage.getItem('comments')!) || dataJSON.comments;
  const [commentsData, setCommentsData] = useState<typeof dataJSON.comments>(
    initialCommentsData()
  );

  useEffect(() => {
    window.localStorage.setItem('comments', JSON.stringify(commentsData));
  }, [commentsData]);

  const addCommentHandler = (enteredText: string) => {
    setCommentsData(prevState => {
      const copyState = prevState.slice();
      const newComment = generateNewComment(dataJSON.currentUser, enteredText);
      copyState.push(newComment);
      return copyState;
    });
  };

  const addReplyHandler = (
    id: number,
    username: string,
    enteredText: string
  ) => {
    setCommentsData(prevState => {
      const newReply = generateNewReply(
        dataJSON.currentUser,
        enteredText,
        username
      );
      const copyState = prevState.slice();
      const index = copyState.findIndex(
        comment =>
          comment.id === id || comment.replies.some(reply => reply.id === id)
      );
      copyState[index].replies.push(newReply);
      return copyState;
    });
  };

  const editTextHandler = (
    id: number,
    enteredText: string,
    type: CommentType.Comment | CommentType.Reply
  ) => {
    setCommentsData(prevState => {
      const copyState = prevState.slice();
      const comment = findCommentWithId(copyState, id, type);
      comment.content = enteredText;
      return copyState;
    });
  };

  const deleteHandler = (
    id: string | number,
    commentType: CommentType.Comment | CommentType.Reply
  ) => {
    setCommentsData(prevState => {
      const copyState = prevState.slice();

      if (commentType === CommentType.Reply) {
        const index = copyState.findIndex(comment => {
          if (commentType === CommentType.Reply) {
            return comment.replies.some(reply => reply.id === id);
          }
          return comment.id === id;
        });
        copyState[index].replies = copyState[index].replies.filter(
          reply => reply.id !== id
        );
        return copyState;
      }

      return copyState.filter(comment => comment.id !== id);
    });
  };

  const voteHandler = (
    id: number,
    vote: string[],
    commentType: CommentType.Comment | CommentType.Reply
  ) => {
    setCommentsData(prevState => {
      const copyState = prevState.slice();
      const idComment = findCommentWithId(copyState, id, commentType);

      if (idComment.user.username === dataJSON.currentUser.username) {
        return prevState;
      }
      const commentScore = idComment.score;
      const voteIndex = commentScore.findIndex(score => score[0] === vote[0]);
      if (voteIndex === -1) {
        commentScore.unshift(vote);
      } else {
        commentScore.splice(voteIndex, 1, vote);
      }

      return copyState;
    });
  };

  return (
    <CommentContext.Provider
      value={{
        commentsData,
        currentUser: dataJSON.currentUser,
        onAddComment: addCommentHandler,
        onAddReply: addReplyHandler,
        onDelete: deleteHandler,
        onEditText: editTextHandler,
        onVote: voteHandler,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export default CommentContextProvider;
