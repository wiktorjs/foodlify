import classes from './Loader.module.scss';
export default function Loader({type, text}) {
  return (
    <div id="loader" className={`${classes['loader']} ${classes[type]}`}>
      <svg className={classes['circle-outer']} viewBox="0 0 86 86">
        <circle className={classes.back} cx="43" cy="43" r="40"></circle>
        <circle className={classes.front} cx="43" cy="43" r="40"></circle>
        <circle className={classes.new} cx="43" cy="43" r="40"></circle>
      </svg>
      <svg className={classes['circle-middle']} viewBox="0 0 60 60">
        <circle className={classes.back} cx="30" cy="30" r="27"></circle>
        <circle className={classes.front} cx="30" cy="30" r="27"></circle>
      </svg>
      <svg className={classes['circle-inner']} viewBox="0 0 34 34">
        <circle className={classes.back} cx="17" cy="17" r="14"></circle>
        <circle className={classes.front} cx="17" cy="17" r="14"></circle>
      </svg>
      <div className={classes.text} data-text={text ? text : 'Loading...'}></div>
    </div>
  );
}
