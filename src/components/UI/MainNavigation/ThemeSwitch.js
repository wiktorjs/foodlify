import { Moon, Sun } from '@phosphor-icons/react';
import classes from './ThemeSwitch.module.scss';
import { useRef, useState } from 'react';
export default function ThemeSwitch() {
  const [isChecked, setIsChecked] = useState(false);
  const inputRef = useRef();

  const checkInputHandler = () => setIsChecked(inputRef.current.checked);

  return (
    <div className={classes.toggleWrapper}>
      <input
        type="checkbox"
        className={classes.dn}
        id="dn"
        ref={inputRef}
        onChange={checkInputHandler}
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
