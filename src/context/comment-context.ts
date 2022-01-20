import { createContext } from 'react';
import dataJSON from '../data/data.json';

export enum CommentType {
  Comment = 'comment',
  Reply = 'reply',
}

const CommentContext = createContext({
  commentsData: dataJSON.comments,
  currentUser: dataJSON.currentUser,
  onAddComment: (enteredText: string) => {},
  onAddReply: (id: number, username: string, enteredText: string) => {},
  onDelete: (
    id: number,
    commentType: CommentType.Comment | CommentType.Reply
  ) => {},
  onEditText: (
    id: number,
    enteredText: string,
    type: CommentType.Comment | CommentType.Reply
  ) => {},
  onVote: (
    id: number,
    vote: string[],
    type: CommentType.Comment | CommentType.Reply
  ) => {},
});

export default CommentContext;
