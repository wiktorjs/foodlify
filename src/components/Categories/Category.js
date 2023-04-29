import Image from "next/image";
import classes from "./Category.module.scss";

export default function Category(props) {
  return (
    <div className={classes.category}>
      <Image className={classes.img} src={props.src.src} alt="category image" height={100} width={100} />
      <p>{props.name}</p>
    </div>
  );
}
