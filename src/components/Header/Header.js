import classes from './Header.module.scss';
import { ArrowRight } from '@phosphor-icons/react';
import headerImage from '@/img/header-image.png'
import Image from 'next/image';

export default function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.content}>
        <h1><span>Foodlify</span> - become your own private chef.</h1>
        <a className={classes.button} href='#'>
          Browse Recipes
          <ArrowRight weight='bold' className={classes.icon} />
        </a>

      </div>

      <div className={classes.image}>
        <img src={headerImage.src} alt='Food bowl image' />
      </div>
    </header>
  );
}
