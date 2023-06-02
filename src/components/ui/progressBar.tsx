// React
import PropTypes from "prop-types";

// Redux
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/features/themeSlice";

// Styles
import styles from "@/styles/components/ui/progressBar.module.scss";

interface Props {
  currentIndex: number;
  maxIndex: number;
}

/*******************************/
// currentIndex = index
// maxIndex = index.length
/*******************************/

export default function ProgressBar({ currentIndex, maxIndex }: Props) {
  const currentWidth = `${Math.round((currentIndex / maxIndex) * 100)}%`;

  // Redux - Theme
  const theme = useSelector(selectTheme);

  //********************************/
  //***** USER FACING BELOW ******//
  //******************************/
  return (
    <div
      className={`${styles["progressBar"]} ${
        theme ? "" : styles["progressBar--dark"]
      }`}
    >
      <div
        style={{ width: currentWidth }}
        className={`${styles["progressBar__inner"]} ${
          theme ? "" : styles["progressBar__inner--dark"]
        }`}
      >
        <p
          className={`${styles["progressBar__inner-text"]} ${
            theme ? "" : styles["progressBar__inner-text--dark"]
          }`}
        >
          {currentWidth}
        </p>
      </div>
    </div>
  );
}

ProgressBar.propTypes = {
  currentIndex: PropTypes.number.isRequired,
  maxIndex: PropTypes.number.isRequired,
};
