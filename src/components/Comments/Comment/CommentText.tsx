import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import useViewportDimensions from 'hooks/useViewportDimensions';
import CommentContext from 'context/comment-context';
import Textarea from 'components/UI/Textarea';
import Button from 'components/UI/Button';
import 'styles/Comments/Comment/CommentText.scss';

type Props = {
  id: number;
  text: string;
  isEditing: boolean;
  type: 'you' | 'other';
  toggleEditingHandler: () => void;
  replyingTo?: string;
};

const CommentText = (props: Props) => {
  const { onEditText } = useContext(CommentContext);
  const { id, text, isEditing, type, toggleEditingHandler, replyingTo } = props;
  const { width: viewportWidth } = useViewportDimensions();
  const [textHeight, setTextHeight] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
      const textareaLength = textareaRef.current?.value.length;
      textareaRef.current?.setSelectionRange(textareaLength!, textareaLength!);
    }
  }, [isEditing]);

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextHeight(textRef.current?.clientHeight);
    }
  }, [viewportWidth]);

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toggleEditingHandler();
    if (textareaRef.current?.value === text) return;

    if (type === 'you') {
      onEditText(
        id,
        textareaRef.current?.value!,
        replyingTo ? 'reply' : 'comment'
      );
    }
  };

  return (
    <div className="comment-text">
      {!isEditing && (
        <p className="comment-text--p" ref={textRef}>
          {replyingTo && (
            <span className="comment-text--link">@{replyingTo}</span>
          )}{' '}
          {text}
        </p>
      )}

      {isEditing && (
        <form onSubmit={submitHandler}>
          <Textarea
            className="comment-text__textarea"
            defaultValue={text}
            style={{ height: `${textHeight + 15}px` }}
            elementRef={textareaRef}
          />
          <Button className="comment-text__btn-update">UPDATE</Button>
        </form>
      )}
    </div>
  );
};

export default CommentText;
