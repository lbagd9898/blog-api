import styles from "./Post.module.css";
import Comment from "../Comment/Comment";

function Post({ key, post, comments }) {
  return (
    <div className={styles["card"]}>
      <h3 className={styles["header"]}>{post.title}</h3>
      <p>{post.content}</p>
      <em> {post.postedAt}</em>
      {comments.map((comment) => (
        <Comment comment={comment}></Comment>
      ))}
    </div>
  );
}

export default Post;
