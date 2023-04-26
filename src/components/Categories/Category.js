import classes from "./Categories.module.scss";

export default function Category(props) {
  return (
    <div className={classes.category}>
      <img src={props.src.src} />
      <p>{props.name}</p>
    </div>
  );
}
