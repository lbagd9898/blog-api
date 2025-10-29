import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";
import Button from "./components/Button/Button.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext.jsx";

function App() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
      const newErrors = validate(inputVals);
      setErrors(newErrors);
    }
  }, [inputVals]);

  // other message if invalid login details
  const [loginMsg, setloginMsg] = useState("");

  //location flash message
  const location = useLocation();
  const message = location.state?.flashMessage;

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

  async function onSubmit(e) {
    console.log("login process iniitiated");
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputVals),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        console.log(data);
        console.log(data.token);
        navigate("/dashboard");
      } else {
        setloginMsg(data.message);
      }
    } catch (err) {
      console.log(err);
    }
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
        <div>{message && <div className="flash-message">{message}</div>}</div>
        {loginMsg && <div className="flash-message">{loginMsg}</div>}
      </main>
    </>
  );
}

export default App;
