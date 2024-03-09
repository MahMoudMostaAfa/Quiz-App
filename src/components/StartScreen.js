function StartScreen({ questionsNumbers, dispatch }) {
  return (
    <div className="start">
      <h2>welcome to the react quiz !</h2>
      <h3>{questionsNumbers} questions to test your react mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        let's start{" "}
      </button>
    </div>
  );
}

export default StartScreen;
