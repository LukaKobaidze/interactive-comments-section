import { useContext, useMemo } from 'react';
import CommentContext from '../../../context/comment-context';
import Picture from '../../UI/Picture';
import '../../../styles/Comments/Comment/CommentAuthor.scss';

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
    const secondsAgo = Math.floor((Date.now() - +createdAt) / 1000);
    const minutesAgo = secondsAgo / 60;
    const hoursAgo = minutesAgo / 60;
    const daysAgo = hoursAgo / 24;
    const weekAgo = daysAgo / 7;
    const monthsAgo = daysAgo / 30;
    const yearsAgo = monthsAgo / 12;

    if (yearsAgo >= 1) {
      return `${Math.floor(yearsAgo)} ${yearsAgo >= 2 ? 'years' : 'year'} ago`;
    }
    if (monthsAgo >= 1) {
      return `${Math.floor(monthsAgo)} ${
        monthsAgo >= 2 ? 'months' : 'month'
      } ago`;
    }
    if (weekAgo >= 1) {
      return `${Math.floor(weekAgo)} ${weekAgo >= 2 ? 'weeks' : 'week'} ago`;
    }
    if (daysAgo >= 1) {
      return `${Math.floor(daysAgo)} ${daysAgo >= 2 ? 'days' : 'day'} ago`;
    }
    if (hoursAgo >= 1) {
      return `${Math.floor(hoursAgo)} ${hoursAgo >= 2 ? 'hours' : 'hour'} ago`;
    }
    if (minutesAgo >= 1) {
      return `${Math.floor(minutesAgo)} ${
        minutesAgo >= 2 ? 'minutes' : 'minute'
      } ago`;
    }
    return `${secondsAgo} ${secondsAgo >= 2 ? 'seconds' : 'second'} ago`;
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
