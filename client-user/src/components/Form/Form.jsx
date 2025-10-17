import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useState, useEffect } from "react";

function Form({ fields, title, buttonText }) {
  const [inputVal, setInputVal] = useState(() =>
    fields.reduce((acc, field) => {
      return { ...acc, [field.name]: "" };
    }, {})
  );

  function handleChange(e) {
    const { name, value } = e.target;
    setInputVal((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    console.log("input values", inputVal);
  }, [inputVal]);

  return (
    <div className={styles["form-div"]}>
      <form>
        <h1 className={styles["header"]}>{title} </h1>
        {fields.map((field) => (
          <div className={styles["form-field"]}>
            <label for={field.name}>{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={inputVal[field.name]}
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
