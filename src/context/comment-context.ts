import { createContext } from 'react';
import { CommentType } from 'shared/types/comment.type';
import dataJSON from 'data/data.json';

const CommentContext = createContext({
  commentsData: dataJSON.comments,
  currentUser: dataJSON.currentUser,
  onAddComment: (enteredText: string) => {},
  onAddReply: (id: number, username: string, enteredText: string) => {},
  onDelete: (id: number, commentType: CommentType) => {},
  onEditText: (id: number, enteredText: string, type: CommentType) => {},
  onVote: (id: number, vote: string[], type: CommentType) => {},
});

export default CommentContext;
