import classes from './Categories.module.scss';
import Category from './Category';
import vegetablesImg from '../../img/vegetables.jpg';
import nutsImg from '../../img/nuts.jpg';
import ketoImg from '../../img/keto.jpg';
import breakfastImg from '../../img/breakfast.jpg';
import lunchImg from '../../img/lunch.jpg';
import dinnerImg from '../../img/dinner.jpg';
import NavigationButton from '../UI/NavigationButton';
import { useState } from 'react';

export default function Categories() {
  const [buttonIsActive, setButtonIsActive] = useState(false);

  const openButtonHandler = () => setButtonIsActive(!buttonIsActive);
  return (
    <section className={classes.categories}>
      <div className={classes.menu} onClick={openButtonHandler}>
        <NavigationButton active={buttonIsActive} />
        <p>{!buttonIsActive ? 'Show' : 'Hide'} all categories</p>
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
        </div>
      </div>

      <div className={classes['categories-box']}>
        <Category src={vegetablesImg} name="Vegan" />
        <Category src={nutsImg} name="Nuts" />
        <Category src={ketoImg} name="Keto" />
        <Category src={breakfastImg} name="Breakfast" />
        <Category src={lunchImg} name="Lunch" />
        <Category src={dinnerImg} name="Dinner" />
      </div>
    </section>
  );
}
