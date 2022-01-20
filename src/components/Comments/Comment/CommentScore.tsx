import { useContext } from 'react';
import CommentContext, { CommentType } from '../../../context/comment-context';
import IconPlus from '../../UI/Icons/IconPlus';
import IconMinus from '../../UI/Icons/IconMinus';
import '../../../styles/Comments/Comment/CommentScore.scss';

type Props = {
  score: string[][];
  id: number;
  username: string;
  commentType: CommentType.Comment | CommentType.Reply;
};

const CommentScore = (props: Props) => {
  const { commentsData, currentUser, onVote } = useContext(CommentContext);
  const { score, id, username, commentType } = props;

  const scoreNumber = score.reduce((acc, vote) => {
    if (vote[1] === 'upvote') {
      return acc + 1;
    }
    if (vote[1] === 'downvote') {
      return acc - 1;
    }
    return acc;
  }, 0);

  const upVoteHandler = () => {
    if (username === currentUser.username) return;
    onVote(id, [currentUser.username, 'upvote'], commentType);
  };
  const downVoteHandler = () => {
    if (username === currentUser.username) return;
    onVote(id, [currentUser.username, 'downvote'], commentType);
  };

  const voted = (): string | undefined => {
    if (!commentsData) return undefined;
    const comment = commentsData.find(
      comment =>
        comment.id === id || comment.replies.some(reply => reply.id === id)
    );
    if (!comment) {
      return undefined;
    }

    const findScore = (score: string[]) => score[0] === currentUser.username;

    if (commentType === CommentType.Reply) {
      const find = comment?.replies
        .find(reply => reply.id === id)!
        .score.find(findScore);
      if (!find) return undefined;
      return find[1];
    }
    const findScoreVote = comment?.score.find(findScore);
    if (!findScoreVote) return undefined;
    return findScoreVote[1];
  };

  return (
    <div className="comment-score">
      <button
        className={`comment-score__button ${
          voted() === 'upvote' && 'comment-score__button--active'
        }`}
        onClick={upVoteHandler}
      >
        <IconPlus />
      </button>
      <div className="comment-score__number">{scoreNumber}</div>
      <button
        className={`comment-score__button ${
          voted() === 'downvote' && 'comment-score__button--active'
        }`}
        onClick={downVoteHandler}
      >
        <IconMinus />
      </button>
    </div>
  );
};

export default CommentScore;
