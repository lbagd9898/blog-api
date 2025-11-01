import styles from "./dashboard.module.css";
import Header from "../components/Header/Header.jsx";
import Post from "../components/Post/Post.jsx";
import { useAuth } from "../utils/AuthContext.jsx";
import { useState, useEffect } from "react";

function Dashboard() {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/posts", {
          headers: {
            "Content-Type": "application.json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log(data.message);
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        console.log(data);
        setPosts(data.posts);
        setComments(data.comments);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [token]);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  if (loading) {
    <>
      <Header />
      <main className={styles.dashboard}>
        <h2>Loading posts...</h2>
      </main>
    </>;
  }

  return (
    <>
      <Header></Header>
      <main>
        <h2>Welcome, user.</h2>
        {posts.map((post) => {
          const postComments = comments.filter(
            (comment) => comment.postId === post.id
          );
          return (
            <Post key={post.id} post={post} comments={postComments}></Post>
          );
        })}
      </main>
    </>
  );
}

export default Dashboard;
