import styles from "./Post.module.css";
import Comment from "../Comment/Comment";

function Post({ post }) {
  return (
    <div className={styles["card"]}>
      <h3 className={styles["header"]}>{post.title}</h3>
      <em>{post.user.username}</em>
      <p>{post.content}</p>
      <em> {post.postedAt}</em>
      {post.comments.map((comment) => (
        <Comment comment={comment}></Comment>
      ))}
    </div>
  );
}

export default Post;
