import { act } from "react-dom/test-utils";
import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import Preview from "./Preview";
const SECS_PER_QUESTION = 10;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          currentQuestion.correctOption === action.payload // recently send anw ser
            ? state.points + currentQuestion.points
            : state.points,
        answersSelected: [...state.answersSelected, action.payload],
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "previousQuestion":
      return { ...state, index: state.index - 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",

        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "preview":
      return {
        ...state,
        status: "preview",
        index: 0,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "finished" : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    default:
      throw new Error("unknown action");
  }
}
const initialState = {
  questions: [],
  // states of out application
  // loading -- error --ready --active -- finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null,
  answersSelected: [],
};
export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highScore,
      remainingSeconds,
      answersSelected,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionsNumbers = questions.length;
  const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);

  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Enter" && status === "ready") {
          dispatch({ type: "start" });
        }
      }
      document.addEventListener("keydown", callBack);
      return () => document.removeEventListener("keydown", callBack);
    },
    [status]
  );

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}

        {status === "ready" && (
          <StartScreen
            questionsNumbers={questionsNumbers}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              questionsNumbers={questionsNumbers}
              index={index}
              totalPoints={totalPoints}
              currentPoints={points}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                questions={questions}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === "preview" && (
          <Preview
            question={questions[index]}
            answersSelected={answersSelected}
            curIndex={index}
            dispatch={dispatch}
            questionsNumbers={questionsNumbers}
          />
        )}
      </Main>
    </div>
  );
}
