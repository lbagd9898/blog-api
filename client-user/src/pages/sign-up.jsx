import styles from "./sign-up.module.css";
import Header from "../components/Header/Header.jsx";
import Form from "../components/Form/Form.jsx";
import Button from "../components/Button/Button.jsx";
import { useState, useEffect } from "react";

function SignUp() {
  const title = "Please create your login credentials below.";
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
    { name: "confirmPassword", type: "password", label: "Confirm Password: " },
  ];
  const buttonText = "Sign Up";

  const [errors, setErrors] = useState([]);

  const [inputVals, setInputVals] = useState(() =>
    fields.reduce((acc, field) => {
      return { ...acc, [field.name]: "" };
    }, {})
  );

  useEffect(() => {
    console.log(inputVals);
  }, [inputVals]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
  }

  //validates form inputs before sending to server
  function validate(values) {
    const errors = [];
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!values.username) {
      errors.push("Username required.");
    } else if (values.username.length < 4 || values.username.length > 15) {
      errors.push("Username must bet between 5 and 15 characters.");
    }
    if (!values.password) {
      errors.push("Password required.");
    } else if (values.password.length < 4 || values.password.length > 15) {
      errors.push("Password must be between 4 and 15 characters");
    } else if (!passwordRegex.test(values.password)) {
      errors.push("Password must contain at least one letter and one number");
    }
    if (values.password != values.confirmPassword) {
      errors.push("The two passwords must match.");
    }
    return errors;
  }

  function onSubmit(e) {
    e.preventDefault();
    const errors = validate(inputVals);
    setErrors(errors);
    console.log(errors);
    console.log("submitted");
  }

  return (
    <>
      <Header />
      <main>
        <Form
          title={title}
          fields={fields}
          buttonText={buttonText}
          inputVals={inputVals}
          handleChange={handleChange}
          onSubmit={onSubmit}
          errors={errors}
        ></Form>
        <Button text="Login" variant="secondary" link="/"></Button>
      </main>
    </>
  );
}

export default SignUp;
