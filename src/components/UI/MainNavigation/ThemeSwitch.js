import { Moon, Sun } from '@phosphor-icons/react';
import classes from './ThemeSwitch.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setDarkTheme } from '@/store/user-slice';
export default function ThemeSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const checkInputHandler = () => {
    setIsChecked(inputRef.current.checked);
    localStorage.setItem('dTheme', inputRef.current.checked);
    dispatch(setDarkTheme(inputRef.current.checked));
  };

  useEffect(() => {
    const dTheme = JSON.parse(localStorage.getItem('dTheme') || 'false');
    const isDark = dTheme ? true : false;
    setIsChecked(isDark);
    dispatch(setDarkTheme(isDark));
  }, []);

  return (
    <div className={classes.toggleWrapper}>
      <input
        type="checkbox"
        className={classes.dn}
        id="dn"
        ref={inputRef}
        onChange={checkInputHandler}
        checked={JSON.parse(isChecked)}
      />
      <label htmlFor="dn" className={classes.toggle}>
        <span className={classes['icon-box']}>
          {!isChecked ? (
            <Sun className={classes.icon} weight="bold" />
          ) : (
            <Moon className={classes.icon} weight="bold" />
          )}
        </span>
      </label>
    </div>
  );
}
