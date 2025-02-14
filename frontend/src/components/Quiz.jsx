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

function Quiz() {
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
    <div
      id="quiz"
      className="bg-dark flex-colh-dvh flex min-h-screen flex-col items-center justify-center gap-7 lg:gap-0 p-6 text-center"
    >
      <h2 className="font-pressStart text-4xl text-primary">Dino Quiz</h2>
      <p className="text-light max-w-2xl my-3">
        Enter your mind palace and see if you still remember all those dino
        facts you learned!
      </p>
        <p>* enter full screen for a treat!</p>

      <img src="/gameboy/top.png" className=" w-[796px] ml-1 hidden lg:block" />

      <div className="flex">
        <img src="/gameboy/left.png" className=" w-[225px] hidden lg:block" />

        <div className="border-secondary h-fit w-full max-w-2xl lg:w-[405px] lg:h-[390px] rounded-xl border-[5px] p-8 lg:p-2 shadow-lg">
          {status === "active" && (
            <section>
              {/* progress bar */}
              <div className="mb-6 lg:mb-2">
                <progress
                  className="[&::-webkit-progress-value]:bg-highlight [&::-webkit-progress-bar]:bg-dark [&::-webkit-progress-bar]:outline-secondary w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-bar]:outline [&::-webkit-progress-value]:rounded-lg"
                  max={numQuestions}
                  value={index + Number(answer !== null)}
                />
                <div className="text-secondary mt-2 flex justify-between text-lg font-medium lg:text-sm">
                  <p>
                    Question <span>{index + 1}</span> / {numQuestions}
                  </p>
                  <p>
                    Points: <span>{points}</span> / {maxPossiblePoints}
                  </p>
                </div>
              </div>
              {/* current question */}
              <div className="mb-6 lg:mb-1">
                <h4 className="text-highlight text-2xl font-semibold lg:text-sm">
                  {currentQuestion.question}
                </h4>
              </div>
              {/* answer options */}
              <div className="space-y-4 lg:space-y-4">
                {currentQuestion.options.map((option, optionIndex) => (
                  <button
                    key={option}
                    onClick={() =>
                      dispatch({ type: "newAnswer", payload: optionIndex })
                    }
                    className={`text-light w-full rounded-lg border-2 px-4 py-3 lg:p-2 text-left font-medium lg:text-sm ${
                      // highlight selected answer
                      optionIndex === answer
                        ? optionIndex === currentQuestion.correctOption
                          ? "bg-highlight border-highlight" // correct selected answer
                          : "bg-secondary border-secondary" // incorrect selected answer
                        : "bg-dark border-secondary text-light hover:border-light"
                    } ${
                      // highlight correct answer when an incorrect answer is selected
                      answer !== null &&
                      optionIndex === currentQuestion.correctOption &&
                      optionIndex !== answer
                        ? "bg-highlight border-highlight"
                        : ""
                    } ${
                      // dim non-selected options after answering
                      answer !== null && optionIndex !== answer
                        ? "opacity-100"
                        : ""
                    }`}
                    disabled={answer !== null} // disable buttons after answering
                  >
                    {option}
                  </button>
                ))}
              </div>
              {/* next/finish button */}
       
                <button
                  onClick={() =>
                    dispatch({
                      type:
                        index < numQuestions - 1 ? "nextQuestion" : "finish",
                    })
                  }
                  className={`text-light hover:bg-highlight mt-6 lg:mt-3 w-full rounded-lg bg-primary py-2 ${answer === null && "disable bg-secondary/50" }`}
                >
                  {index < numQuestions - 1 ? "Next" : "Finish"}
                </button>
           
            </section>
          )}
          {/* finished State */}
          {status === "finished" && (
            <div className="text-center">
              <p className="text-highlight mb-4 text-3xl font-bold">
                <span>{emoji}</span> You scored <span>{points}</span> out of{" "}
                {maxPossiblePoints} ({Math.ceil(percentage)}%)
              </p>
              <p className="text-secondary mb-6 text-lg">
                Highscore: {highscore} points
              </p>
              <button
                onClick={() => dispatch({ type: "restart" })}
                className="text-light hover:bg-highlight rounded-lg bg-primary px-6 py-3 transition-all"
              >
                Restart Quiz
              </button>
            </div>
          )}
        </div>
        <img src="/gameboy/right.png" className="w-[220px] hidden lg:block" />
      </div>
      <img
        src="/gameboy/bottom.png"
        className=" w-[801px] ml-[9px] hidden lg:block"
      />
    </div>
  );
}

export default Quiz;
