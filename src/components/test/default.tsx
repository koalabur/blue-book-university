// React
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

// Redux
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/features/themeSlice";

// Components
import ProgressBar from "../ui/progressBar";
import TestResult from "../testResult/default";
import Button from "../ui/button";

// Types
import { StudentTest } from "@/shared/interface";

// Styles
import styles from "@/styles/components/test/default.module.scss";

interface Props {
  data?: StudentTest;
}

interface UserAnswers {
  question: string;
  answer: string;
  options: Array<string>;
}

interface ComparableAnswers {
  question: string;
  answer: string;
}

/*******************************/
// data = graphql query
/*******************************/

export default function TestDefault({ data }: Props) {
  // Create state for storing answers and user answers
  const [storedAnswers, setStoredAnswers] = useState(
    data?.studentTest.test.configuration.map(
      ({ __typename, type, ...keepAttrs }) => keepAttrs
    )
  );
  const [userAnswers, setUserAnswers] = useState(
    storedAnswers?.map((obj) => ({ ...obj, answer: "" }))
  );

  // Create flag (state) for ending the test
  const [endTest, setEndTest] = useState(false);

  // Create Result/ Score state
  const [score, setScore] = useState<number>();

  // Create state for current question and updating based on index
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const indexOfLastQuestion = currentQuestion * 1;
  const indexOfFirstQuestion = indexOfLastQuestion - 1;
  const currentQuestions = storedAnswers?.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  // Redux - Theme
  const theme = useSelector(selectTheme);

  // Form
  /// Arrow func with callback arrow func
  const updateFieldChanged =
    (index: number) => (e: { target: { value: string } }) => {
      /// new array object so we don't mutate the state
      let clonedAnswers = [...(userAnswers as UserAnswers[])];
      /// a deep copy is not needed as we are overriding the whole object below
      clonedAnswers[index].answer = e.target.value;
      setUserAnswers(clonedAnswers);
    };
  /// Func to handle form submission
  function nextQuestion(e: { preventDefault: () => void }) {
    e.preventDefault();
    /// Check if we are at the end of the test
    if (currentQuestion === storedAnswers?.length) {
      /// Compare userAnswers with storedAnswers
      const result = userAnswers?.filter((obj1: ComparableAnswers) => {
        const matchingObj = storedAnswers.find((obj2: ComparableAnswers) => {
          return obj1.question === obj2.question && obj1.answer === obj2.answer;
        });
        return matchingObj !== undefined;
      });
      /// Update score
      setScore((result!.length / storedAnswers.length) * 100);
      /// End test
      setEndTest(true);
    } else {
      /// Go to next question
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  // Make sure we are at the beginning of the test on mount
  useEffect(() => {
    setEndTest(false);
  }, []);

  //********************************/
  //***** USER FACING BELOW ******//
  //******************************/
  if (!storedAnswers && !userAnswers) return <p>Loading test...</p>;
  return (
    <div
      className={`${styles["TestDefault"]} ${
        theme ? "" : styles["TestDefault--dark"]
      }`}
    >
      {!endTest ? (
        // TEST IS IN PROGRESS
        <>
          <p
            className={`${styles["TestDefault__subtitle"]} ${
              theme ? "" : styles["TestDefault__subtitle--dark"]
            }`}
          >
            {data?.studentTest.test.testName}
          </p>
          <h2
            className={`${styles["TestDefault__title"]} ${
              theme ? "" : styles["TestDefault__title--dark"]
            }`}
          >
            Question {currentQuestion}/{storedAnswers?.length}
          </h2>
          <div className={styles["TestDefault__progress"]}>
            <ProgressBar
              currentIndex={currentQuestion - 1}
              maxIndex={storedAnswers!.length}
            />
          </div>
          <form className={styles["TestDefault__form"]} onSubmit={nextQuestion}>
            {/* QUESTIONS BELOW */}
            {currentQuestions?.map((item, index) => {
              return (
                <div className={styles["TestDefault__form-config"]} key={index}>
                  <p
                    className={`${
                      styles["TestDefault__form-config-question"]
                    } ${
                      theme
                        ? ""
                        : styles["TestDefault__form-config-question--dark"]
                    }`}
                  >
                    {item.question}
                  </p>

                  <div className={styles["TestDefault__form-config-row"]}>
                    {item.options.map((option, index) => {
                      return (
                        <div
                          className={`${
                            styles["TestDefault__form-config-row-option"]
                          } ${
                            theme
                              ? ""
                              : styles[
                                  "TestDefault__form-config-row-option--dark"
                                ]
                          }`}
                          key={index}
                        >
                          <input
                            className={
                              styles[
                                "TestDefault__form-config-row-option-input"
                              ]
                            }
                            type="radio"
                            name={`q-${currentQuestion - 1}`}
                            value={option}
                            id={`${option}-${currentQuestion - 1}`}
                            checked={
                              userAnswers![currentQuestion - 1].answer ===
                              option
                            }
                            onChange={updateFieldChanged(currentQuestion - 1)}
                            required
                          />
                          <label
                            className={`${
                              styles[
                                "TestDefault__form-config-row-option-label"
                              ]
                            } ${
                              theme
                                ? ""
                                : styles[
                                    "TestDefault__form-config-row-option-label--dark"
                                  ]
                            }`}
                            htmlFor={`${option}-${currentQuestion - 1}`}
                          >
                            {option}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                  {currentQuestion !== storedAnswers?.length ? (
                    <Button type="next" />
                  ) : (
                    <Button type="complete" />
                  )}
                </div>
              );
            })}
          </form>
        </>
      ) : (
        // TEST RESULTS
        <TestResult testName={data!.studentTest.test.testName} score={score!} />
      )}
    </div>
  );
}

TestDefault.propTypes = {
  data: PropTypes.object.isRequired,
};
