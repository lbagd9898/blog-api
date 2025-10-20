import styles from "./Form.module.css";
import Button from "../Button/Button";
import Errors from "../Errors/Errors";

function Form({
  fields,
  title,
  buttonText,
  inputVals,
  handleChange,
  onSubmit,
  errors,
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
      {errors.length > 0 && <Errors errors={errors} />}
    </div>
  );
}

export default Form;
