import { useContext, useMemo } from 'react';
import CommentContext from 'context/comment-context';
import Picture from 'components/UI/Picture';
import 'styles/Comments/Comment/CommentAuthor.scss';
import { getTimeAgo } from 'shared/functions';

type Props = {
  avatar: {
    png: string;
    webp: string;
  };
  username: string;
  createdAt: number;
};

const CommentAuthor = ({ avatar, username, createdAt }: Props) => {
  const { currentUser } = useContext(CommentContext);

  const renderTime = useMemo(() => {
    return getTimeAgo(createdAt);
  }, [createdAt]);

  return (
    <div className="comment-author">
      <div className="comment-author__img-div">
        <Picture
          png={require(`../../../assets${avatar.png.slice(1)}`)}
          webp={require(`../../../assets${avatar.webp.slice(1)}`)}
          alt=""
        />
      </div>
      <p className="comment-author__text">{username}</p>
      {currentUser.username === username && (
        <div className="comment-author--you">you</div>
      )}
      <p className="comment-author__date">{renderTime}</p>
    </div>
  );
};

export default CommentAuthor;
