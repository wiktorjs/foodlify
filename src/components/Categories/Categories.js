import { useState } from 'react';
import classes from './Categories.module.scss';
import NavigationButton from '../UI/NavigationButton';
import Category from './Category';
import RecipeCard from '../RecipeCard/RecipeCard';
import { CATEGORIES } from '@/store/categories-images';

export default function Categories() {
  const [buttonIsActive, setButtonIsActive] = useState(false);

  const openButtonHandler = () => setButtonIsActive(prevState => !prevState);
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
        {CATEGORIES.map((category, i) => (
          <Category key={i} src={category.img} name={category.name} />
        ))}
      </div>

      <div className={classes['recipes-box']}>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </section>
  );
}
