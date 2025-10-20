import styles from "./Errors.module.css";

function Errors({ errors }) {
  return (
    <ul className={styles["errors"]}>
      {errors.map((err) => (
        <li className={styles["li"]}>{err}</li>
      ))}
    </ul>
  );
}

export default Errors;
