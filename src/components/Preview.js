function Preview({
  question,
  curIndex,
  answersSelected,
  dispatch,
  questionsNumbers,
}) {
  return (
    <div>
      <div className="progress">
        <p>
          Question <strong>{curIndex + 1}</strong>/ {questionsNumbers}{" "}
        </p>
        <span
          className={`check ${
            answersSelected[curIndex] === question.correctOption
              ? "true"
              : "false"
          }`}
        >
          {0}/{question.points}
        </span>
      </div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, ind) => (
          <button
            className={`btn btn-option ${
              ind === answersSelected[curIndex] ? "answer" : ""
            }
           ${ind === question.correctOption ? "correct" : "wrong"}`}
            key={ind}
            disabled={true}
          >
            {option}{" "}
          </button>
        ))}
      </div>
      <div className="preview">
        {curIndex > 0 && (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "previousQuestion" })}
          >
            previous
          </button>
        )}
        {curIndex < questionsNumbers - 1 ? (
          <button
            className="btn btn-ui left"
            onClick={() => dispatch({ type: "nextQuestion" })}
          >
            next
          </button>
        ) : (
          <button
            className="btn btn-ui left"
            onClick={() => dispatch({ type: "finished" })}
          >
            Finsih Review
          </button>
        )}
      </div>
    </div>
  );
}

export default Preview;
