import { useState } from 'react';
import classes from './Details.module.scss';
import { Clock, Fire } from '@phosphor-icons/react';
import { adjustPortion, convertIngredients } from '@/utils/convert-ingredients';
import Servings from './Servings';
import ListItem from '../UI/ListItem';

export default function Details(props) {
  const {
    defaultIngredients,
    url,
    defaultServings,
    time,
    defaultKcal,
    defaultMacros,
    cusineTypes,
    categories,
  } = props.details;

  const [displayedServings, setDisplayedServings] = useState(defaultServings);

  const servingsDecrementHandler = () => {
    if (displayedServings === 1) return;
    setDisplayedServings((prevServings) => --prevServings);
  };

  const servingsIncrementHandler = () =>
    setDisplayedServings((prevServings) => ++prevServings);
  //
  const macros = defaultMacros.map((macro) => [
    macro.label,
    `${Math.round(
      adjustPortion(macro.quantity, defaultServings, displayedServings)
    )}${macro.unit}`,
  ]);

  const ingredients = convertIngredients(
    defaultIngredients,
    defaultServings,
    displayedServings
  );

  return (
    <>
      <div className={classes.details}>
        <h2>Ingredients</h2>
        <hr />
        <Servings
          servings={displayedServings}
          onSubtract={servingsDecrementHandler}
          onAdd={servingsIncrementHandler}
        />

        <ul>
          {ingredients.map((ingredient, i) => (
            <ListItem key={i} id={i} type='INGREDIENT'>{ingredient.text} ({ingredient.weight}g)</ListItem>
          ))}
        </ul>
        <a className={classes.link} href={url} target="_blank">
          Full recipe can be found here.
        </a>
      </div>

      <div className={classes.details}>
        <h2> Additional details </h2>
        <hr />

        <div className={classes.prep}>
          <span>
            <Clock className={classes.icon} weight="bold" />
            {time} min
          </span>

          <span>
            <Fire className={classes.icon} weight="bold" />
            {Math.round(
              adjustPortion(defaultKcal, defaultServings, displayedServings)
            )}{' '}
            kcal
          </span>
        </div>

        <div className={classes.macro}>
          {macros.map((macro, i) => (
            <p key={i}>
              <span>{macro[0]}:</span> {macro[1]}
            </p>
          ))}
        </div>

        <p>
          <span>Cusine:</span> {cusineTypes?.slice(0, 3).join(', ')}
        </p>

        <div className={classes.categories}>
          <p>Categories:</p>
          {categories.map((category, i) => (
            <span key={i}>{category}</span>
          ))}
        </div>
      </div>
    </>
  );
}
