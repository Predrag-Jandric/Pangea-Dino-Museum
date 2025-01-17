import { useReducer } from "react";
import { quizQuestions } from "../utils/data";

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl h-fit bg-white p-8 rounded-xl shadow-lg">
        {status === "active" && (
          <section>
            {/* progress bar */}
            <div className="mb-6">
              <progress
                className="progress-bar w-full h-3 rounded-lg bg-grayOne"
                max={numQuestions}
                value={index + Number(answer !== null)}
              />
              <div className="mt-2 flex justify-between text-lg font-medium">
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
              <h4 className="text-2xl font-semibold text-gray-800">
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
                  className={`w-full py-3 px-4 rounded-lg text-left border-2 font-medium ${
                    // Highlight selected answer
                    optionIndex === answer
                      ? optionIndex === currentQuestion.correctOption
                        ? "bg-green-200 border-greenOne" // Correct selected answer
                        : "bg-red-200 border-red-500" // Incorrect selected answer
                      : "bg-gray-50 border-grayOne"
                  } ${
                    // Highlight correct answer when an incorrect answer is selected
                    answer !== null &&
                    optionIndex === currentQuestion.correctOption &&
                    optionIndex !== answer
                      ? "bg-green-200 border-greenOne"
                      : ""
                  } ${
                    // Dim non-selected options after answering
                    answer !== null && optionIndex !== answer
                      ? "opacity-60"
                      : ""
                  }`}
                  disabled={answer !== null} // Disable buttons after answering
                >
                  {option}
                </button>
              ))}
            </div>

            {/* next/finish button */}
            {answer !== null && (
              <button
                onClick={() =>
                  dispatch({
                    type: index < numQuestions - 1 ? "nextQuestion" : "finish",
                  })
                }
                className="mt-6 w-full py-3 bg-greenOne text-white rounded-lg hover:bg-greenOneHover"
              >
                {index < numQuestions - 1 ? "Next" : "Finish"}
              </button>
            )}
          </section>
        )}

        {/* finished State */}
        {status === "finished" && (
          <div className="text-center">
            <p className="text-3xl font-bold mb-4">
              <span>{emoji}</span> You scored <span>{points}</span> out of{" "}
              {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>

            <p className="text-lg mb-6">Highscore: {highscore} points</p>

            <button
              onClick={() => dispatch({ type: "restart" })}
              className="py-3 px-6 transition-all bg-greenOne text-white rounded-lg hover:bg-greenOneHover"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
