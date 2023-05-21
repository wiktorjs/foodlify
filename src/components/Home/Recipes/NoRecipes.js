import { BowlFood, ForkKnife, Shrimp, Warning } from '@phosphor-icons/react';
import classes from './NoRecipes.module.scss';
import Countdown from '@/components/UI/Countdown';

export default function NoRecipes({ error, message, retryRequest }) {
  return (
    <div className={`${classes.wrapper} ${error ? classes.error : ''}`}>
      <h2 className={classes.logo}>Foodlify</h2>

      <div className={classes.content}>
        {error && (
          <p className={classes['error-box']}>
            <Warning className={classes.icon} weight="duotone" /> Error:
          </p>
        )}

        <p className={classes.text}>
          {error && (
            <>
              {error}
              <br /> <span className={classes.countdown}><Countdown time={15} countdownHandler={retryRequest} /></span>
            </>
          )}
          {message && message}
          {!error && !message && 'Start searching to discover amazing recipes!'}
        </p>
      </div>

      <div className={classes.icons}>
        {!error && (
          <>
            <ForkKnife className={classes.icon} weight="light" />
            <BowlFood className={classes.icon} weight="light" />
            <Shrimp className={classes.icon} weight="light" />
          </>
        )}
      </div>
    </div>
  );
}
