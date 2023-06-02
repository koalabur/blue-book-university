// React
import PropTypes from "prop-types";

// Styles
import styles from "@/styles/components/ui/toggle.module.scss";

interface Props {
  toggleState: boolean;
  toggleAction: () => void;
}

/*******************************/
// toggleState = boolean state
// toggleAction = function
/*******************************/

export default function Toggle({ toggleState, toggleAction }: Props) {
  //********************************/
  //***** USER FACING BELOW ******//
  //******************************/
  return (
    <label className={styles.toggle}>
      <input
        className={styles["toggle-input"]}
        type="checkbox"
        checked={toggleState}
        onChange={toggleAction}
      />
      <span className={styles["toggle-slider"]}></span>
    </label>
  );
}

Toggle.propTypes = {
  toggleState: PropTypes.bool.isRequired,
  toggleAction: PropTypes.func.isRequired,
};
