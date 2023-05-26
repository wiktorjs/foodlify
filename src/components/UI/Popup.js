import { X } from '@phosphor-icons/react';
import classes from './Popup.module.scss';
import { useDispatch } from 'react-redux';
import { setNotification } from '@/store/user-slice';
export default function Popup({ message, active }) {
    const dispatch = useDispatch();
    const closeHandler = () => dispatch(setNotification(''));
  return (
    <div className={classes.box}>
      <X className={classes.close} weight="bold" onClick={closeHandler} />
      <p className={classes.message}>{message}</p>
    </div>
  );
}
