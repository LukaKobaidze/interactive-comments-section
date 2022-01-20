import { useContext, useEffect, useRef } from 'react';
import Button from '../UI/Button';
import Textarea from '../UI/Textarea';
import '../../styles/Comments/CommentsAdd.scss';
import CommentContext from '../../context/comment-context';
import Picture from '../UI/Picture';

type Props = {
  addCommentHandler?: (enteredText: string) => void;
  addReplyHandler?: (id: number, username: string, enteredText: string) => void;
  replyingTo?: { id: number; username: string };
  toggleReplyingHandler?: () => void;
};

const CommentsAdd = (props: Props) => {
  const {
    addCommentHandler,
    replyingTo,
    addReplyHandler,
    toggleReplyingHandler,
  } = props;
  const { currentUser } = useContext(CommentContext);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (replyingTo) {
      textAreaRef.current?.focus();
      const valueLength = textAreaRef.current?.value.length;
      textAreaRef.current?.setSelectionRange(valueLength!, valueLength!);
    }
  }, [replyingTo]);

  const buttonClickHandler = () => {
    textAreaRef.current?.focus();
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (addReplyHandler && replyingTo && textAreaRef.current?.value) {
      if (toggleReplyingHandler) {
        toggleReplyingHandler();
      }
      addReplyHandler(
        replyingTo.id,
        replyingTo.username,
        textAreaRef.current.value
      );
    }
    if (addCommentHandler && textAreaRef.current?.value) {
      addCommentHandler(textAreaRef.current.value);
      textAreaRef.current.value = '';
    }
  };

  return (
    <div
      className={`comment--element comments-add ${
        replyingTo ? 'comments-add--reply' : ''
      }`}
    >
      <div className="comments-add__avatar">
        <Picture
          png={require(`../../assets${currentUser.image.png.slice(1)}`)}
          webp={require(`../../assets${currentUser.image.webp.slice(1)}`)}
          alt=""
        />
      </div>
      <form className="comments-add__form" onSubmit={submitHandler}>
        <Textarea
          className="comments-add__form--input"
          placeholder={
            replyingTo
              ? `Reply to ${replyingTo.username}...`
              : 'Add a comment...'
          }
          elementRef={textAreaRef}
        />

        <Button
          className="comments-add__form--submit"
          onClick={buttonClickHandler}
          type="submit"
        >
          {replyingTo ? 'REPLY' : 'SEND'}
        </Button>
      </form>
    </div>
  );
};

export default CommentsAdd;
