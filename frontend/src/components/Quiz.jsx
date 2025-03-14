import { useReducer } from "react";
import { quizQuestions } from "../utils/data";
import "../index.css"; // Import the stylesheet
import Button from "../utils/Button";
import Title from "./Title";
import { motion } from "framer-motion";
import { defaultAnimation } from "../utils/animations.js";

const shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5);

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
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }

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

function Quiz() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const currentQuestion = questions[index];
  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0,
  );

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🥈";
  if (percentage >= 50 && percentage < 80) emoji = "🥉";
  if (percentage >= 0 && percentage < 50) emoji = "🎉";
  if (percentage === 0) emoji = "😭";

  return (
    <motion.div
      variants={defaultAnimation}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      id="quiz"
      className="flex flex-col items-center justify-center bg-bgcolor px-6 py-16 text-textsize"
    >
      <Title title="Smart Quiz" />

      <div className="h-fit w-full max-w-2xl rounded-custom bg-white p-5 text-dark shadow-custom transition hover:shadow-xl sm:p-8">
        {status === "active" && (
          <section>
            {/* progress bar */}
            <div className="mb-6">
              <progress
                className="progress-bar h-3 w-full rounded-custom bg-grayOne/50"
                max={numQuestions}
                value={index + Number(answer !== null)}
              />
              <div className="mt-1 flex justify-between text-sm text-dark/70">
                <p>
                  Question <span>{index + 1}</span> / {numQuestions}
                </p>
                <p>
                  Points: <span>{points}</span> / {maxPossiblePoints}
                </p>
              </div>
            </div>

            {/* current question */}
            <div className="mb-6">
              <h4 className="font-titles text-2xl font-thin tracking-wide">
                {currentQuestion.question}
              </h4>
            </div>

            {/* answer options */}
            <div className="space-y-4">
              {currentQuestion.options.map((option, optionIndex) => (
                <button
                  key={option}
                  onClick={() =>
                    dispatch({ type: "newAnswer", payload: optionIndex })
                  }
                  className={`w-full rounded-custom border-2 px-4 py-3 text-left ${
                    // highlight selected answer
                    optionIndex === answer
                      ? optionIndex === currentQuestion.correctOption
                        ? "border-primary/50 bg-primary/10" // correct selected answer
                        : "border-alert/30 bg-alert/10" // incorrect selected answer
                      : "border-grayOne bg-gray-50"
                  } ${
                    // highlight correct answer when an incorrect answer is selected
                    answer !== null &&
                    optionIndex === currentQuestion.correctOption &&
                    optionIndex !== answer
                      ? "border-primary/80 bg-primary/15"
                      : ""
                  } ${
                    // dim non-selected options after answering
                    answer !== null && optionIndex !== answer
                      ? "opacity-60"
                      : ""
                  }`}
                  disabled={answer !== null} // disable buttons after answering
                >
                  {option}
                </button>
              ))}
            </div>

            {/* next/finish button */}
            <Button
              className="mt-6 w-full py-2.5 disabled:cursor-not-allowed disabled:!bg-gray-300 disabled:hover:bg-gray-300"
              disabled={answer === null}
              onClick={() =>
                dispatch({
                  type: index < numQuestions - 1 ? "nextQuestion" : "finish",
                })
              }
            >
              {index < numQuestions - 1 ? "Next" : "Finish"}
            </Button>
          </section>
        )}

        {/* finished State */}
        {status === "finished" && (
          <div className="py-20 text-center">
            <p className="mb-4 text-xl">
              <span>{emoji}</span> You scored <span>{points} points</span> out
              of {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>

            <p className="mb-6 text-xl">Highscore: {highscore} points</p>

            <Button
              onClick={() => dispatch({ type: "restart" })}
              className="w-48"
            >
              Restart Quiz
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Quiz;
