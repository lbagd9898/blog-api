import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";

function App() {
  const title = "Please enter your login credentials below.";
  const fields = [{ name: "username", type: "text", label: "Username:" }];
  const buttonText = "Submit";

  return (
    <>
      <Header></Header>
      <Form fields={fields} title={title} buttonText={buttonText} />
    </>
  );
}

export default App;
