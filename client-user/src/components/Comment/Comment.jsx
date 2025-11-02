import styles from "./Comment.module.css";

function Comment({ comment }) {
  return (
    <div className={styles["comment-card"]}>
      <h3>{comment.user.username}</h3>
      <p>{comment.content}</p>
      <em>{comment.postedAt}</em>
    </div>
  );
}

export default Comment;
