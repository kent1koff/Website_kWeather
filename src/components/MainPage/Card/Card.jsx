import './Card.scss';
import { useTheme } from '../../Theme';

const Card = ({ width, children, height }) => {
  const { theme } = useTheme();

  return (
    <div className={`card ${theme}`} style={{ width, height }}>{children}</div>
  )
}

export default Card;