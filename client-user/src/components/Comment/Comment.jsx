import styles from "./Comment.module.css";

function Comment({ comment }) {
  return (
    <div className={styles["comment-card"]}>
      <p>User</p>
      <p>{comment.content}</p>
      <em>{comment.postedAt}</em>
    </div>
  );
}

export default Comment;
