import { useState } from "react";
import { patchArticleVotes } from "../api/api";

export default function VoteButton({ article_id, initialVotes }) {
  const [voteChange, setVoteChange] = useState(0);

  function handleVote(inc_votes) {
    setVoteChange((voteChange) => voteChange + inc_votes);
    patchArticleVotes(article_id, inc_votes)
  }

  return (
    <div className="vote-button-container">
      <button
        onClick={() => handleVote(1)}
        disabled={voteChange > 0}
        className="vote-button"
      >
        ⬆️
      </button>
      <div className="vote-info">
        <p>💜</p>
        <p>{initialVotes + voteChange}</p>
      </div>

      <button
        onClick={() => handleVote(-1)}
        disabled={voteChange < 0}
        className="vote-button"
      >
        ⬇️
      </button>
    </div>
  );
}
