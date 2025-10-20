import Form from "../Form/Form.jsx";
import { useState } from "react";

function SignupForm() {
  const title = "Please enter your login credentials below.";
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
  ];
  const buttonText = "Submit";
  const [formErrors, setFormErrors] = useState({});

  const inputVals = useState({ username: "", password: "", confirm });

  function validate(values) {
    const errors = [];
    if (!values.username) {
      errors.push("Username required.");
    }
    if (values.username.length < 4 || values.username.length > 15) {
      errors.push("Username must bet between 5 and 15 characters.");
    }
    if (!values.password) {
      errors.push("Password required.");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    validate(inputVal);
  }

  return (
    <>
      <Form fields={fields} title={title} buttonText={buttonText} />
    </>
  );
}

export default SignupForm;
