function FinishScreen({ points, totalPoints, highScore, dispatch }) {
  const percent = Math.ceil((points / totalPoints) * 100);
  let emoji;
  if (percent === 100) emoji = "👌🏻";
  if (percent < 100 && percent > 80) emoji = "😀";
  if (percent < 80 && percent > 50) emoji = "🙄";
  if (percent < 50 && percent > 0) emoji = "🤔";
  if (percent === 0) emoji = "😭";
  return (
    <>
      <p className="result">
        <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
        {totalPoints} ({percent}%)
      </p>
      <p className="highscore">(highscore: {highScore} points )</p>
      <div className="preview">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "preview" })}
        >
          Preview 🔍
        </button>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restart" })}
        >
          Try again 🔃
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
