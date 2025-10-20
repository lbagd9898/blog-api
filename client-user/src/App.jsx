import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Form from "./components/Form/Form.jsx";
import Button from "./components/Button/Button.jsx";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        <Button text="Sign up" variant="secondary" link="/sign-up" />
      </main>
    </>
  );
}

export default App;
