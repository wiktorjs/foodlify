import { Eye, EyeClosed, Password, User } from '@phosphor-icons/react';
import classes from './Input.module.scss';
import { useState } from 'react';
export default function Input(props) {
  const [inputType, setInputType] = useState(props.type.type);

  const showPasswordHandler = () =>
    setInputType(inputType === 'text' ? 'password' : 'text');

  return (
    <div className={classes['input-container']}>
      <label
        className={`${classes['input__label']} ${
          props.invalid ? classes.invalid : ''
        }`}
        htmlFor={props.type.for}
      >
        {props.type.label}
      </label>

      {props.type.for === 'password' ? (
        <Password
          className={classes.icon}
          weight="regular"
        />
      ) : (
        <User className={classes.icon} weight="regular" />
      )}

      <input
        placeholder={props.type.placeholder}
        title={`${props.type.label} input`}
        type={inputType}
        className={`${classes['input__field']} ${
          props.invalid ? classes.invalid : ''
        }`}
        id={props.type.for}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />

      {props.type.for === 'password' && (
        inputType === 'password' ?
        <EyeClosed className={`${classes.icon} ${classes['icon-pwrd']}`} weight='regular'   onClick={showPasswordHandler} /> :
        <Eye className={`${classes.icon} ${classes['icon-pwrd']}`} weight='regular'   onClick={showPasswordHandler} /> 
        )}
    </div>
  );
}
