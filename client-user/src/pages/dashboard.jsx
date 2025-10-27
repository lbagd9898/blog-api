import styles from "./dashboard.module.css";
import Header from "../components/Header/Header.jsx";
import Post from "../components/Post/Post.jsx";

function Dashboard() {
  return (
    <>
      <Header></Header>
      <main>
        <h2>Welcome, user.</h2>
        <Post></Post>
      </main>
    </>
  );
}

export default Dashboard;
