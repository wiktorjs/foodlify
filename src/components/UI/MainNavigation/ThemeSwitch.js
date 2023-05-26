import { Moon, Sun } from '@phosphor-icons/react';
import classes from './ThemeSwitch.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDarkTheme } from '@/store/user-slice';
function ThemeSwitch() {
  const {darkTheme} = useSelector(state => state.user);

  const [isChecked, setIsChecked] = useState(darkTheme || false);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const checkInputHandler = () => {
    setIsChecked(inputRef.current.checked);
    localStorage.setItem('dTheme', inputRef.current.checked);
    dispatch(setDarkTheme(inputRef.current.checked));

    document.querySelector('body').classList.toggle('dark');
  };

  useEffect(() => {
    const dTheme = JSON.parse(localStorage.getItem('dTheme') || 'false');
    const isDark = dTheme ? true : false;
    setIsChecked(isDark);
    dispatch(setDarkTheme(isDark));
    
    isDark && document.querySelector('body').classList.add('dark');
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

export default ThemeSwitch;