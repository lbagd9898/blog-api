import styles from "./Comment.module.css";

function Comment() {
  return (
    <div className={styles["comment-card"]}>
      <p>User</p>
      <p>Comment comment comment</p>
      <em>Date time</em>
    </div>
  );
}

export default Comment;
