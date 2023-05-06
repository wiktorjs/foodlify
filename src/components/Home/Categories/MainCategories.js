import classes from './Categories.module.scss';
import { CATEGORIES } from "@/store/categories-images";
import Category from "./Category";
import { useState } from 'react';

export default function MainCategories() {

  return (
    <div className={classes['categories-box']}>
      {CATEGORIES.map((category, i) => (
        <Category key={i} id={i} src={category.img} name={category.name} />
      ))}
    </div>
  );
}
