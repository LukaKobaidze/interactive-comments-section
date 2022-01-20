import { createPortal } from 'react-dom';
import '../../styles/UI/Backdrop.scss';

type Props = {
  className?: string;
  onClick?: () => void;
};

const Backdrop = ({ className, onClick }: Props) => {
  return createPortal(
    <div className={`backdrop ${className}`} onClick={onClick} />,
    document.getElementById('backdrop') as HTMLDivElement
  );
};

export default Backdrop;
