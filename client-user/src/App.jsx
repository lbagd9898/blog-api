import { useState } from "react";
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
  const buttonText = "Submit";

  return (
    <>
      <Header></Header>
      <main>
        <Form fields={fields} title={title} buttonText={buttonText} />
        <Button text="Sign up" variant="secondary" link="/sign-up" />
      </main>
    </>
  );
}

export default App;
