import "./VoteButton.css";
import { ThumbsUp, ThumbsDown, Heart } from "lucide-react";
import { useState } from "react";
import { useUser } from "../../context";
import { toast } from "react-toastify";

export default function VoteButton({
  item_id,
  initialVotes,
  voteFunction,
  className,
}) {
  const { user } = useUser();
  const [voteChange, setVoteChange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [lastVote, setLastVote] = useState(null); // "up" | "down" | null
  const [animate, setAnimate] = useState(false); // animation for heart

  async function handleVote(inc_votes) {
    if (!user) {
      toast.error("You must be logged in to vote!", {
        className: "toast-message",
      });
      return;
    }

    if (
      user?.username !== "admin" &&
      ((inc_votes === 1 && voteChange > 0) ||
        (inc_votes === -1 && voteChange < 0))
    ) {
      toast.error("You can't vote the same way twice!", {
        className: "toast-message",
      });
      return;
    }

    const newVoteChange = voteChange + inc_votes;
    setVoteChange(newVoteChange);
    setLastVote(inc_votes === 1 ? "up" : "down");
    setAnimate(true); // 💥 trigger animation
    setTimeout(() => setAnimate(false), 400); // match animation duration
    setIsLoading(true);

    try {
      await voteFunction(item_id, inc_votes);
    } catch (error) {
      console.error("Vote error:", error);
      setVoteChange(voteChange); // rollback
      toast.error("Vote failed! Please refresh the page and try again.", {
        className: "toast-message",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className={`vote-button-container ${className}`}>
        <button
          className={`upvote-button ${className} ${
            lastVote === "up" ? "pressed" : ""
          }`}
          onClick={() => handleVote(1)}
          disabled={(user?.username !== "admin" && voteChange > 0) || isLoading}
        >
          <ThumbsUp size={25} color="white" />
        </button>

        <div className="vote-info">
          <Heart
            className={`heart ${className} ${animate ? "animate-pulse" : ""}`}
          />
          <p>{initialVotes + voteChange}</p>
        </div>

        <button
          className={`downvote-button ${className} ${
            lastVote === "down" ? "pressed" : ""
          }`}
          onClick={() => handleVote(-1)}
          disabled={(user?.username !== "admin" && voteChange < 0) || isLoading}
        >
          <ThumbsDown size={25} color="white" />
        </button>
      </div>
    </>
  );
}
