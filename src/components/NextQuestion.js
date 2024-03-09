function NextQuestion({ dispatch, answer, index, questions }) {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({
          type: index + 1 === questions.length ? "finished" : "nextQuestion",
        })
      }
    >
      {index + 1 === questions.length ? "finish" : "next"}
    </button>
  );
}

export default NextQuestion;
