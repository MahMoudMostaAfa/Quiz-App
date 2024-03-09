function Progress({
  index,
  questionsNumbers,
  currentPoints,
  totalPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={questionsNumbers} value={index + (answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/ {questionsNumbers}{" "}
      </p>
      <p>
        {" "}
        <strong>{currentPoints}</strong> / {totalPoints}
      </p>
    </header>
  );
}

export default Progress;
