import { useContext } from 'react';
import CommentContext from 'context/comment-context';
import Comment from './Comment/Comment';
import CommentsAdd from './CommentsAdd';
import 'styles/Comments/Comments.scss';

const Comments = () => {
  const { commentsData, onAddComment } = useContext(CommentContext);

  const generateJSXComment = (data: any) => {
    return (
      <Comment
        id={data.id}
        avatar={data.user.image}
        username={data.user.username}
        createdAt={data.createdAt}
        text={data.content}
        score={data.score}
        replyingTo={data.replyingTo}
      />
    );
  };

  const renderCommentsAndReplies = () => {
    return commentsData.map((comment) => (
      <li key={comment.id}>
        {generateJSXComment(comment)}

        {/* Replies */}

        {comment.replies[0] && (
          <ul className="replies">
            {comment.replies.map((reply) => (
              <li key={reply.id}>{generateJSXComment(reply)}</li>
            ))}
          </ul>
        )}
      </li>
    ));
  };

  return (
    <>
      <ul className="comments">{renderCommentsAndReplies()}</ul>
      <CommentsAdd addCommentHandler={onAddComment} />
    </>
  );
};

export default Comments;
