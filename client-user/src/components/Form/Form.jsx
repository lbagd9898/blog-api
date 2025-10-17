import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useState } from "react";

function Form({ fields, title, buttonText }) {
  return (
    <div className={styles["form-div"]}>
      <form>
        <h1 className={styles["header"]}>{title} </h1>
        {fields.map((field) => (
          <div className={styles["form-field"]}>
            <label for={field.name}>{field.label}</label>
            <input type={field.type} />
          </div>
        ))}
        <Button text={buttonText}></Button>
      </form>
    </div>
  );
}

export default Form;
