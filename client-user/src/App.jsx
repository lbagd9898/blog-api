import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";
import Button from "./components/Button/Button.jsx";

function App() {
  const title = "Please enter your login credentials below.";

  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
  ];

  const buttonText = "Log in";

  const [errors, setErrors] = useState([]);

  //sets boolean for if user has started typing or not
  const [touched, setTouched] = useState(false);

  const [inputVals, setInputVals] = useState(() =>
    fields.reduce((acc, field) => {
      return { ...acc, [field.name]: "" };
    }, {})
  );

  useEffect(() => {
    if (touched) {
      console.log(errors);
      const newErrors = validate(inputVals);
      setErrors(newErrors);
    }
  }, [inputVals]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
    if (!touched) {
      setTouched(true);
    }
  }

  function validate(values) {
    const errors = [];
    if (!values.username) {
      errors.push("Please enter a valid username.");
    }
    if (!values.password) {
      errors.push("Please enter a valid password.");
    }
    return errors;
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }

  return (
    <>
      <Header></Header>
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
        <Button text="Sign up" variant="secondary" link="/sign-up" />
      </main>
    </>
  );
}

export default App;
