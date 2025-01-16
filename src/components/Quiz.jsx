import { useReducer } from "react";
import data from "./quizQuestions.json";

const shuffledQuestions = data.sort(() => Math.random() - 0.5);

const initialState = {
  questions: shuffledQuestions,
  status: "active",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return {
        ...state,
        status: "active",
        index: 0,
        answer: null,
        points: 0,
      };

    default:
      throw new Error("action unknow");
  }
}

function App() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const currentQuestion = questions[index];
  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 0 && percentage < 50) emoji = "🎉";
  if (percentage === 0) emoji = "😭";

  return (
    <div >
      test
    </div>
  );
}

export default App;
