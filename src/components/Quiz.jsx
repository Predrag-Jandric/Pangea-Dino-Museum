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
      <div >
        {status === "active" && (
          <section>
            {/* progress bar */}
            <div className="mb-6">
              <progress
                
                max={numQuestions}
                value={index + Number(answer !== null)}
              />
              <div >
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
              <h4 >
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
                
              >
                {index < numQuestions - 1 ? "Next" : "Finish"}
              </button>
            )}
          </section>
        )}

        {/* finished State */}
        {status === "finished" && (
          <div >
            <p >
              <span>{emoji}</span> You scored <span>{points}</span> out of{" "}
              {maxPossiblePoints} ({Math.ceil(percentage)}%)
            </p>

            <p >Highscore: {highscore} points</p>

            <button
              onClick={() => dispatch({ type: "restart" })}
              
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
