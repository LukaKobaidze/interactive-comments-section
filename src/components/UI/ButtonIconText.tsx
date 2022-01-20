import '../../styles/UI/ButtonIconText.scss';

type Props = {
  icon: React.ReactNode;
  text: string;
  className?: string;
  onClick?: () => void;
};

const ButtonIconText = ({ icon, text, className, onClick }: Props) => {
  return (
    <div className={`button-icon-text ${className}`}>
      <button className="button-icon-text__btn" onClick={onClick}>
        {text}
      </button>
      <div className="button-icon-text__icon-div">{icon}</div>
    </div>
  );
};

export default ButtonIconText;
