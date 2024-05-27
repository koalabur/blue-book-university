// Next
import Image from "next/image";

// Auth
import { signOut } from "next-auth/react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, toggleTheme } from "@/store/features/themeSlice";
import { selectUser, clearUser } from "@/store/features/userSlice";

// Components
import Logo from "../ui/logo";
import Toggle from "../ui/toggle";

// Styles
import styles from "@/styles/components/layout/default.module.scss";
import { useEffect } from "react";

export default function LayoutDefault({
  children,
}: React.PropsWithChildren<{}>) {
  const dispatch = useDispatch();

  // Redux - Theme
  const theme = useSelector(selectTheme);

  // Redux - User
  const user = useSelector(selectUser);

  // Logout
  function logOut() {
    dispatch(clearUser());
    signOut();
  }

  useEffect(() => {
    switch (theme) {
      case true:
        document.body.classList.remove("dark");
        break;
      case false:
        document.body.classList.add("dark");
        break;
    }
  }, [theme]);

  //********************************/
  //***** USER FACING BELOW ******//
  //******************************/
  return (
    <>
      <nav className={styles.nav}>
        <div
          className={`${styles["nav__upper"]} ${
            theme ? "" : styles["nav__upper--dark"]
          }`}
        >
          <div
            onClick={() => logOut()}
            className={`${styles["nav__upper-item"]} ${
              styles["nav__upper-item--btn"]
            } ${theme ? "" : styles["nav__upper-item--btn--dark"]}`}
          >
            <p
              className={`${styles["nav__upper-item-text"]} ${
                theme ? "" : styles["nav__upper-item-text--dark"]
              }`}
            >
              Logout
            </p>
            <Image
              className={`${styles["nav__upper-item-icon"]} ${
                theme ? "" : styles["nav__upper-item-icon--dark"]
              }`}
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNy41LjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAzMiAzMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzIgMzI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+DQoJLnN0MHtmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnIGlkPSJVcCI+DQoJPHBhdGggY2xhc3M9InN0MCIgZD0iTTI1LjgsMEg2LjJDMi44LDAsMCwyLjgsMCw2LjJ2OC42aDEzTDEwLjIsMTJjLTAuNS0wLjUtMC41LTEuMywwLTEuN2MwLjUtMC41LDEuMy0wLjUsMS43LDBsNC45LDQuOQ0KCQljMC4xLDAuMSwwLjIsMC4zLDAuMywwLjRjMC4xLDAuMywwLjEsMC42LDAsMC45Yy0wLjEsMC4yLTAuMSwwLjMtMC4zLDAuNEwxMiwyMS44Yy0wLjUsMC41LTEuMywwLjUtMS43LDBjMCwwLDAsMCwwLDANCgkJYy0wLjUtMC41LTAuNS0xLjMsMC0xLjdjMCwwLDAsMCwwLDBsMi44LTIuOEgwdjguNkMwLDI5LjIsMi44LDMyLDYuMiwzMmgxOS43YzMuNCwwLDYuMi0yLjgsNi4yLTYuMlY2LjJDMzIsMi44LDI5LjIsMCwyNS44LDB6Ii8+DQo8L2c+DQo8L3N2Zz4NCg=="
              alt="Signout"
              width={20}
              height={20}
              loading="eager"
            />
          </div>
          <div className={styles["nav__upper-item"]}>
            <p
              className={`${styles["nav__upper-item-text"]} ${
                theme ? "" : styles["nav__upper-item-text--dark"]
              }`}
            >
              {theme ? "Light" : "Dark"} Mode
            </p>
            <Toggle
              toggleState={theme}
              toggleAction={() => dispatch(toggleTheme())}
            />
          </div>
        </div>
        <div
          className={`${styles["nav__lower"]} ${
            theme ? "" : styles["nav__lower--dark"]
          }`}
        >
          <div className={styles["nav__lower-left"]}>
            <Logo
              className={styles["nav__lower-left-logo"]}
              width={149}
              height={54}
            />
            <div
              className={`${styles["nav__lower-left-divider"]} ${
                theme ? "" : styles["nav__lower-left-divider--dark"]
              }`}
            ></div>
            <p
              className={`${styles["nav__lower-left-title"]} ${
                theme ? "" : styles["nav__lower-left-title--dark"]
              }`}
            >
              {user.type} Portal
            </p>
          </div>
          <div className={styles["nav__lower-right"]}>
            <p
              className={`${styles["nav__lower-right-title"]} ${
                theme ? "" : styles["nav__lower-right-title--dark"]
              }`}
            >
              Hello, {user.firstName} {user.lastName}
              <span
                className={`${styles["nav__lower-right-title--initials"]} ${
                  theme ? "" : styles["nav__lower-right-title--initials--dark"]
                }`}
              >
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
            </p>
          </div>
        </div>
      </nav>
      {/* <Main> / Content Here */}
      {children}
      <footer className={styles.footer}></footer>
    </>
  );
}
