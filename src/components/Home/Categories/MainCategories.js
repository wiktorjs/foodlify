import classes from './Categories.module.scss';
import { CATEGORIES } from "@/store/categories-images";
import Category from "./Category";

export default function MainCategories() {
  return (
    <div className={classes['categories-box']}>
      {CATEGORIES.map((category, i) => (
        <Category key={i} src={category.img} name={category.name} />
      ))}
    </div>
  );
}
