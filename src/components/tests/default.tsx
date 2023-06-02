// React
import PropTypes from "prop-types";

// Redux
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/features/themeSlice";

// Components
import Anchor from "../ui/anchor";

// Types
import { TestsDetails } from "@/shared/interface";

// Styles
import styles from "@/styles/components/tests/default.module.scss";

interface Data {
  data?: Array<TestsDetails> | undefined;
}

export default function TestsDefault({ data }: Data) {
  // Redux - Theme
  const theme = useSelector(selectTheme);

  //********************************/
  //***** USER FACING BELOW ******//
  //******************************/
  return (
    <section className={styles.TestsDefault}>
      {data?.map((item) => (
        <div
          key={item._id}
          className={`${styles["TestsDefault__item"]} ${
            theme ? "" : styles["TestsDefault__item--dark"]
          }`}
        >
          <div className={styles["TestsDefault__item-top"]}>
            {item.classInfo.map((classInfo) => (
              <p
                key={classInfo._id}
                className={`${styles["TestsDefault__item-top-class"]} ${
                  theme ? "" : styles["TestsDefault__item-top-class--dark"]
                }`}
              >
                {classInfo.class}
              </p>
            ))}
            {item.createdBy.map((createdBy) => (
              <p
                key={createdBy._id}
                className={`${styles["TestsDefault__item-top-teacher"]} ${
                  theme ? "" : styles["TestsDefault__item-top-teacher--dark"]
                }`}
              >
                {createdBy.firstName} {createdBy.lastName}
              </p>
            ))}
          </div>
          <h2
            className={`${styles["TestsDefault__item-test"]} ${
              theme ? "" : styles["TestsDefault__item-test--dark"]
            }`}
          >
            {item.testName}
          </h2>
          <p
            className={`${styles["TestsDefault__item-desc"]} ${
              theme ? "" : styles["TestsDefault__item-desc--dark"]
            }`}
          >
            {item.desc}
          </p>
          <Anchor type="start" href={`portal/test/${item._id}`} />
        </div>
      ))}
    </section>
  );
}

TestsDefault.propTypes = {
  data: PropTypes.array.isRequired,
};
