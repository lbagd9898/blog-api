import styles from "./sign-up.module.css";
import Header from "../components/Header/Header.jsx";
import Form from "../components/Form/Form.jsx";
import Button from "../components/Button/Button.jsx";

function SignUp() {
  const title = "Please create your login credentials below.";
  const fields = [
    { name: "username", type: "text", label: "Username:" },
    { name: "password", type: "password", label: "Password: " },
    { name: "confirmPassword", type: "password", label: "Confirm Password: " },
  ];
  const buttonText = "Sign Up";
  return (
    <>
      <Header />
      <main>
        <Form title={title} fields={fields} buttonText={buttonText}></Form>
        <Button text="Login" variant="secondary" link="/"></Button>
      </main>
    </>
  );
}

export default SignUp;
