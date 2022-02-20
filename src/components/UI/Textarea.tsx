import 'styles/UI/Textarea.scss';

type Props = {
  className?: string;
  style?: Object;
  placeholder?: string;
  defaultValue?: string;
  elementRef?: React.RefObject<HTMLTextAreaElement>;
};

const Textarea = (props: Props) => {
  return (
    <textarea
      className={`textarea ${props.className}`}
      style={props.style}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      ref={props.elementRef}
    />
  );
};

export default Textarea;
