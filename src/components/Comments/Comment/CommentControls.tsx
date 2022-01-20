import IconDelete from '../../UI/Icons/IconDelete';
import IconEdit from '../../UI/Icons/IconEdit';
import IconReply from '../../UI/Icons/IconReply';
import ButtonIconText from '../../UI/ButtonIconText';
import '../../../styles/Comments/Comment/CommentControls.scss';

type Props = {
  type: 'you' | 'other';
  toggleReplyingHandler?: () => void;
  toggleEditingHandler?: () => void;
  showDeleteModalHandler?: () => void;
};

const CommentControls = (props: Props) => {
  const {
    type,
    toggleReplyingHandler,
    toggleEditingHandler,
    showDeleteModalHandler,
  } = props;

  return (
    <>
      <div className="comment-controls">
        {type === 'other' && (
          <ButtonIconText
            icon={<IconReply />}
            text="Reply"
            className="comment-controls--reply"
            onClick={toggleReplyingHandler}
          />
        )}
        {type === 'you' && (
          <>
            <ButtonIconText
              icon={<IconDelete />}
              text="Delete"
              className="comment-controls--delete"
              onClick={showDeleteModalHandler}
            />
            <ButtonIconText
              icon={<IconEdit />}
              text="Edit"
              className="comment-controls--edit"
              onClick={toggleEditingHandler}
            />
          </>
        )}
      </div>
    </>
  );
};

export default CommentControls;
