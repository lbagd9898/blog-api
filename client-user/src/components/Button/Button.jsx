import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button({ text, variant = "primary", link }) {
  if (link) {
    return (
      <Link to={link} className={`${styles.button} ${styles[variant]}`}>
        {text}
      </Link>
    );
  }
  return (
    <button className={`${styles.button} ${styles[variant]}`}>{text}</button>
  );
}

export default Button;
