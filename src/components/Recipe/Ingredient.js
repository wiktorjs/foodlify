import { CheckSquare, Square } from '@phosphor-icons/react';
import classes from './Ingredient.module.scss';
import { useState } from 'react';

export default function Ingredient({ id, details }) {
  const [checked, setIsChecked] = useState(false);
  const checkedInputHandler = () => setIsChecked((prevState) => !prevState);

  return (
    <li id="checklist" className={classes.item}>
      <div className={classes.checkbox}>
        <input
          className={classes.input}
          type="checkbox"
          id={id}
          onChange={checkedInputHandler}
        />

        {checked ? (
          <CheckSquare weight="duotone" fill="#00c86b" />
        ) : (
          <Square weight="regular" />
        )}
      </div>

      <label
        className={`${classes.label} ${checked ? classes.checked : ''}`}
        htmlFor={id}
      >
        {details.text} ({details.weight}g)
      </label>
      
    </li>
  );
}
