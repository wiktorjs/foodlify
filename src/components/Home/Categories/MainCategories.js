import classes from './Categories.module.scss';
import { CATEGORIES } from '@/store/categories';
import Category from './Category';

export default function MainCategories() {
  const mainCategories = CATEGORIES.slice(0, 6);

  return (
    <div className={classes['categories-box']}>
      {mainCategories.map((category, i) => (
        <Category key={i} id={i} src={category.img} name={category.name} />
      ))}
    </div>
  );
}
