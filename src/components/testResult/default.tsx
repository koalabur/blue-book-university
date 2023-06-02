// Redux
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/features/themeSlice";
import PropTypes from "prop-types";

// Styles
import styles from "@/styles/components/testResult/default.module.scss";

interface Props {
  testName: string;
  score: number;
}

/*******************************/
// testName = name of test
// score = final result divided by correct answers and user answers
/*******************************/

export default function TestResultDefault({ testName, score }: Props) {
  // Redux - Theme
  const theme = useSelector(selectTheme);
  return (
    <div className={styles["default"]}>
      <div className={styles["default__row"]}>
        <div
          className={`${styles["default__row-col"]} ${
            theme ? "" : styles["default__row-col--dark"]
          }`}
        >
          <p
            className={`${styles["default__row-col-test"]} ${
              theme ? "" : styles["default__row-col-test--dark"]
            }`}
          >
            {testName}
          </p>
          <p
            className={`${styles["default__row-col-text"]} ${
              theme ? "" : styles["default__row-col-text--dark"]
            }`}
          >
            You have completed the test. Your score is...
          </p>
        </div>
        <div
          className={`${styles["default__row-col"]} ${
            styles["default__row-col--score"]
          } ${theme ? "" : styles["default__row-col--score--dark"]}`}
        >
          <p
            className={`${styles["default__row-col-result"]} ${
              theme ? "" : styles["default__row-col-result--dark"]
            }`}
          >
            {Math.round(score as number)}%
          </p>
        </div>
      </div>
    </div>
  );
}

TestResultDefault.propTypes = {
  testName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
