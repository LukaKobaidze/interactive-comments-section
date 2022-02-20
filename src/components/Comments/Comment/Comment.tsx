import { useContext, useState } from 'react';
import CommentContext from 'context/comment-context';
import CommentAuthor from './CommentAuthor';
import CommentText from './CommentText';
import CommentControls from './CommentControls';
import CommentScore from './CommentScore';
import CommentsAdd from '../CommentsAdd';
import ModalDelete from './ModalDelete';
import 'styles/Comments/Comment/Comment.scss';

type Props = {
  id: number;
  avatar: {
    png: string;
    webp: string;
  };
  username: string;
  createdAt: number;
  text: string;
  score: string[][];
  replyingTo?: string;
};

const Comment = (props: Props) => {
  const commentCtx = useContext(CommentContext);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  const showDeleteModalHandler = () => {
    setIsDeleteModalShown(true);
  };

  const hideDeleteModalHandler = () => {
    setIsDeleteModalShown(false);
  };

  const toggleReplyingHandler = () => {
    setIsReplying((prevState) => !prevState);
  };

  const toggleEditingHandler = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <>
      <div className="comment comment--element">
        <div className="comment__div-1">
          <CommentScore
            score={props.score}
            id={props.id}
            username={props.username}
            commentType={props.replyingTo ? 'reply' : 'comment'}
          />
        </div>
        <div className="comment__div-2">
          <div className="comment__author">
            <CommentAuthor
              avatar={props.avatar}
              username={props.username}
              createdAt={props.createdAt}
            />
          </div>
          <CommentControls
            type={
              commentCtx.currentUser.username === props.username
                ? 'you'
                : 'other'
            }
            toggleReplyingHandler={toggleReplyingHandler}
            toggleEditingHandler={toggleEditingHandler}
            showDeleteModalHandler={showDeleteModalHandler}
          />
          <CommentText
            id={props.id}
            text={props.text}
            isEditing={isEditing}
            toggleEditingHandler={toggleEditingHandler}
            replyingTo={props.replyingTo}
            type={
              commentCtx.currentUser.username === props.username
                ? 'you'
                : 'other'
            }
          />
        </div>
      </div>
      {isReplying && (
        <CommentsAdd
          replyingTo={{ id: props.id, username: props.username }}
          addReplyHandler={commentCtx.onAddReply}
          toggleReplyingHandler={toggleReplyingHandler}
        />
      )}

      {isDeleteModalShown && (
        <ModalDelete
          username={props.username}
          id={props.id}
          commentType={props.replyingTo ? 'reply' : 'comment'}
          hideDeleteModalHandler={hideDeleteModalHandler}
        />
      )}
    </>
  );
};

export default Comment;
