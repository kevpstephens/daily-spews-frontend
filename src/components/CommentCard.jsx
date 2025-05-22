import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import { dummyUser } from "../data/dummyUser";
import { deleteCommentById, patchCommentVotes } from "../api/api";
import VoteButton from "./VoteButton";

export default function CommentCard({ comment }) {
  const loggedInUser = dummyUser;
  const isLoggedInUsersComment = comment.author === loggedInUser.username;

  function handleDelete() {
    deleteCommentById(comment.comment_id);
  }

  return (
    <article className="comment-card">
      <p>
        <Link to={`/users/${comment.author}`}>
          <span className="comment-card-author">{comment.author}</span>
        </Link>{" "}
        | {formatDate(comment.created_at)}
      </p>
      <p>{comment.body}</p>
      <div className="comment-actions-container">
        <VoteButton
          item_id={comment.comment_id}
          initialVotes={comment.votes}
          voteFunction={patchCommentVotes}
          className="comment-vote"
        />

        {isLoggedInUsersComment && (
          <button onClick={handleDelete} className="delete-comment-button">
            Delete
          </button>
        )}
      </div>
    </article>
  );
}
