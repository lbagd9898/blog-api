import styles from "./sign-up.module.css";
import Header from "../components/Header/Header.jsx";
import Form from "../components/Form/Form.jsx";
import Button from "../components/Button/Button.jsx";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { flushSync } from "react-dom";

function SignUp() {
  const title = "Please create your login credentials below.";
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
    { name: "confirmPassword", type: "password", label: "Confirm Password: " },
  ];
  const buttonText = "Sign Up";

  const [errors, setErrors] = useState([]);

  //sets boolean for if user has started typing or not
  const [touched, setTouched] = useState(false);

  //message to let user know if login failed
  const [flashMessage, setFlashMessage] = useState("");

  //initialize redirects
  const navigate = useNavigate();

  const [inputVals, setInputVals] = useState(() =>
    fields.reduce((acc, field) => {
      return { ...acc, [field.name]: "" };
    }, {})
  );

  useEffect(() => {
    if (touched) {
      const errors = validate(inputVals);
      setErrors(errors);
    }
  }, [inputVals]);

  function handleChange(e) {
    const { name, value } = e.target;
    setInputVals((prev) => ({ ...prev, [name]: value }));
    if (!touched) {
      setTouched(true);
    }
  }

  //validates form inputs before sending to server
  function validate(values) {
    const errors = [];
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!values.username) {
      errors.push("Username required.");
    } else if (values.username.length < 4 || values.username.length > 15) {
      errors.push("Username must be between 5 and 15 characters.");
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

  async function onSubmit(e) {
    e.preventDefault();
    console.log("submitted");
    try {
      const response = await fetch("http://localhost:3000/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputVals),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("signup successful", data);
        navigate("/", {
          state: {
            flashMessage: "Sign up successful, please enter login credentials.",
          },
        });
      } else if (response.status === 409) {
        setFlashMessage("Username already exists. Please choose another.");
      } else {
        setFlashMessage("Signup failed. Please try again.");
      }
    } catch (err) {
      setFlashMessage("Failed to connect to server.");
      console.log(err, "failed to connect");
    }
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
        {flashMessage && <div className="flash-message">{flashMessage}</div>}
      </main>
    </>
  );
}

export default SignUp;
