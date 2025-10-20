import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";

function Form({
  fields,
  title,
  buttonText,
  inputVals,
  handleChange,
  onSubmit,
}) {
  return (
    <div className={styles["form-div"]}>
      <form onSubmit={onSubmit}>
        <h1 className={styles["header"]}>{title} </h1>
        {fields.map((field) => (
          <div className={styles["form-field"]}>
            <label for={field.name}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={inputVals[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
        <Button text={buttonText}></Button>
      </form>
    </div>
  );
}

export default Form;
