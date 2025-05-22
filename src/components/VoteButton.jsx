import { useState } from "react";

export default function VoteButton({
  item_id,
  initialVotes,
  voteFunction,
  className,
}) {
  const [voteChange, setVoteChange] = useState(0);

  function handleVote(inc_votes) {
    setVoteChange((voteChange) => voteChange + inc_votes);
    voteFunction(item_id, inc_votes);
  }

  return (
    <>
      <div className={`vote-button-container ${className}`}>
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
    </>
  );
}
