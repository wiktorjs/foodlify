import { MinusSquare, PlusSquare, User } from '@phosphor-icons/react';
import classes from './Servings.module.scss';
export default function Servings({servings, onSubtract, onAdd}) {

  return (
    <div className={classes.servings}>
      <MinusSquare
        className={classes['servings--change']}
        weight="bold"
        onClick={onSubtract}
      />

      <span>
        <User className={classes['servings--icon']} weight="bold" />
        {servings}
      </span>

      <PlusSquare
        className={classes['servings--change']}
        weight="bold"
        onClick={onAdd}
      />
    </div>
  );
}
