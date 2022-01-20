import '../../styles/UI/Button.scss';

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'reset' | 'submit';
  onClick?: () => void;
};

const Button = ({ children, className, type, onClick }: Props) => {
  return (
    <button className={`button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
