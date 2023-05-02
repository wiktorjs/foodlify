import { useState } from 'react';
import classes from './Filters.module.scss';
import NavigationButton from '../../UI/NavigationButton';
export default function Filters({mobile}) {
  const [buttonIsActive, setButtonIsActive] = useState(false);
  const openButtonHandler = () => {
    setButtonIsActive((prevState) => !prevState);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.menu} onClick={openButtonHandler}>
          <NavigationButton active={buttonIsActive} />
           <p>Filters</p>

        </div>

        <div
          className={`${classes['filters-wrapper']} ${
            buttonIsActive ? classes.active : ''
          }`}
        >
          <hr className={classes.hr} />
          <div className={classes.filters}>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
            <p>Test</p>
          </div>
        </div>
      </div>


    </>
  );
}
