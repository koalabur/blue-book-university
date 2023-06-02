// Next
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// React
import { useState } from "react";

// Redux
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/features/themeSlice";

// Styles
import styles from "@/styles/components/sidebar/default.module.scss";
import useWindowDimensions from "@/hooks/useWindowDimension";

export default function SidebarDefault() {
  // Setup links for loop
  const [links] = useState([
    {
      name: "home",
      path: "/portal",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDEuMjVDMTUgMS4yNSA1LjcyMSA5LjQwODMzIDAuNTM1NSAxMy44MjY3QzAuMjMxIDE0LjEwNzggMCAxNC41MTcyIDAgMTVDMCAxNS44NDQ5IDAuNjcwNSAxNi41Mjc4IDEuNSAxNi41Mjc4SDQuNVYyNy4yMjIyQzQuNSAyOC4wNjcxIDUuMTcwNSAyOC43NSA2IDI4Ljc1SDEwLjVDMTEuMzI5NSAyOC43NSAxMiAyOC4wNjU2IDEyIDI3LjIyMjJWMjEuMTExMUgxOFYyNy4yMjIyQzE4IDI4LjA2NTYgMTguNjcwNSAyOC43NSAxOS41IDI4Ljc1SDI0QzI0LjgyOTUgMjguNzUgMjUuNSAyOC4wNjcxIDI1LjUgMjcuMjIyMlYxNi41Mjc4SDI4LjVDMjkuMzI5NSAxNi41Mjc4IDMwIDE1Ljg0NDkgMzAgMTVDMzAgMTQuNTE3MiAyOS43NjkgMTQuMTA3OCAyOS40MjU1IDEzLjgyNjdDMjQuMjc2IDkuNDA4MzMgMTUgMS4yNSAxNSAxLjI1WiIgZmlsbD0iIzBFNzE4MSIvPgo8L3N2Zz4K",
    },
    // {
    //   name: "tests",
    //   path: "/portal/tests",
    //   icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMjAwKSI+CjxwYXRoIGQ9Ik0yNS44ODg5IDNIMTkuMzc4OUMxOC43NDExIDEuMjYgMTcuMDMgMCAxNSAwQzEyLjk3IDAgMTEuMjU4OSAxLjI2IDEwLjYyMTEgM0g0LjExMTExQzIuMzkyMjIgMyAxIDQuMzQyNSAxIDZWMjdDMSAyOC42NTc1IDIuMzkyMjIgMzAgNC4xMTExMSAzMEgyNS44ODg5QzI3LjYwNzggMzAgMjkgMjguNjU3NSAyOSAyN1Y2QzI5IDQuMzQyNSAyNy42MDc4IDMgMjUuODg4OSAzWk0xNSAzQzE1Ljg1NTYgMyAxNi41NTU2IDMuNjY3NSAxNi41NTU2IDQuNUMxNi41NTU2IDUuMzMyNSAxNS44NTU2IDYgMTUgNkMxNC4xNDQ0IDYgMTMuNDQ0NCA1LjMzMjUgMTMuNDQ0NCA0LjVDMTMuNDQ0NCAzLjY2NzUgMTQuMTQ0NCAzIDE1IDNaTTE4LjExMTEgMjRINy4yMjIyMlYyMUgxOC4xMTExVjI0Wk0yMi43Nzc4IDE4SDcuMjIyMjJWMTVIMjIuNzc3OFYxOFpNMjIuNzc3OCAxMkg3LjIyMjIyVjlIMjIuNzc3OFYxMloiIGZpbGw9IiMwRTcxODEiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xXzIwMCI+CjxyZWN0IHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
    // },
  ]);

  // Redux - Theme
  const theme = useSelector(selectTheme);

  // Active Page
  const router = useRouter();
  const currentRoute = router.pathname;
  /// Handler for active page
  function isActive(route: string) {
    return route === currentRoute ? styles["sidebar__item--active"] : "";
  }

  // Toggle Sidebar
  const { width } = useWindowDimensions();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  /// Handler for toggling sidebar
  function toggleSidebar() {
    setSidebarOpen((prevState) => !prevState);
  }

  //********************************/
  //***** USER FACING BELOW ******//
  //******************************/
  return (
    <aside
      className={`${styles.sidebar} ${theme ? "" : styles["sidebar--dark"]} ${
        !sidebarOpen && width! >= 481 ? styles["sidebar--close"] : ""
      }`}
    >
      {width! >= 481 && (
        <div
          className={`${styles["sidebar__item"]} ${
            theme ? "" : styles["sidebar__item--dark"]
          }`}
          role="button"
          title="Toggle Sidebar"
          onClick={toggleSidebar}
        >
          <Image
            className={styles["sidebar__item-icon"]}
            src={
              theme
                ? "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMjA3KSI+CjxwYXRoIGQ9Ik0yMC45NTIgOC4xNDc5OUwxOS4yMDAxIDkuODUxOTlMMjIuNjA4MSAxMy4ySDcuMzkyMDVMMTAuOCA5Ljg1MTk5TDkuMDQ4MDUgOC4xNDc5OUwzLjYwMDA1IDEzLjU0OEMzLjM3NjU1IDEzLjc3MjggMy4yNTExIDE0LjA3NyAzLjI1MTEgMTQuMzk0QzMuMjUxMSAxNC43MTEgMy4zNzY1NSAxNS4wMTUyIDMuNjAwMDUgMTUuMjRMOS4wMDAwNSAyMC42NEwxMC44IDE4Ljk0OEw3LjM5MjA1IDE1LjZIMjIuNjA4MUwxOS4yMDAxIDE4Ljk0OEwyMC44OTIgMjAuNjRMMjYuMjkyIDE1LjI0QzI2LjUxNTYgMTUuMDE1MiAyNi42NDEgMTQuNzExIDI2LjY0MSAxNC4zOTRDMjYuNjQxIDE0LjA3NyAyNi41MTU2IDEzLjc3MjggMjYuMjkyIDEzLjU0OEwyMC45NTIgOC4xNDc5OVoiIGZpbGw9IiMwRTcxODEiLz4KPHBhdGggZD0iTTIuNCAzLjYwMDAxSDBWMjUuMkgyLjRWMy42MDAwMVoiIGZpbGw9IiMwRTcxODEiLz4KPHBhdGggZD0iTTMwIDMuNjAwMDFIMjcuNlYyNS4ySDMwVjMuNjAwMDFaIiBmaWxsPSIjMEU3MTgxIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMV8yMDciPgo8cmVjdCB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg=="
                : "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHZpZXdCb3g9IjAgMCAzMCAzMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfNDc4KSI+CjxwYXRoIGQ9Ik0yMC45NTIgOC4xNDc5NUwxOS4yMDAxIDkuODUxOTVMMjIuNjA4MSAxMy4xOTk5SDcuMzkyMDVMMTAuOCA5Ljg1MTk1TDkuMDQ4MDUgOC4xNDc5NUwzLjYwMDA1IDEzLjU0NzlDMy4zNzY1NSAxMy43NzI4IDMuMjUxMSAxNC4wNzY5IDMuMjUxMSAxNC4zOTM5QzMuMjUxMSAxNC43MTEgMy4zNzY1NSAxNS4wMTUxIDMuNjAwMDUgMTUuMjM5OUw5LjAwMDA1IDIwLjYzOTlMMTAuOCAxOC45NDc5TDcuMzkyMDUgMTUuNTk5OUgyMi42MDgxTDE5LjIwMDEgMTguOTQ3OUwyMC44OTIgMjAuNjM5OUwyNi4yOTIgMTUuMjM5OUMyNi41MTU2IDE1LjAxNTEgMjYuNjQxIDE0LjcxMSAyNi42NDEgMTQuMzkzOUMyNi42NDEgMTQuMDc2OSAyNi41MTU2IDEzLjc3MjggMjYuMjkyIDEzLjU0NzlMMjAuOTUyIDguMTQ3OTVaIiBmaWxsPSIjMUUxRTFFIi8+CjxwYXRoIGQ9Ik0yLjQgMy41OTk5OEgwVjI1LjJIMi40VjMuNTk5OThaIiBmaWxsPSIjMUUxRTFFIi8+CjxwYXRoIGQ9Ik0zMCAzLjU5OTk4SDI3LjZWMjUuMkgzMFYzLjU5OTk4WiIgZmlsbD0iIzFFMUUxRSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzFfNDc4Ij4KPHJlY3Qgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPgo="
            }
            alt="Toggle Sidebar Width"
            width={30}
            height={30}
            loading="eager"
          />
          <p
            className={`${styles["sidebar__item-text"]} ${
              !sidebarOpen && width! >= 481
                ? styles["sidebar__item-text--close"]
                : ""
            }`}
          >
            Expand/ Shrink
          </p>
        </div>
      )}
      {links.map((link) => (
        <Link
          key={link.name}
          className={`${styles["sidebar__item"]} ${
            theme ? "" : styles["sidebar__item--dark"]
          } ${isActive(link.path)}`}
          href={link.path}
          title={link.name}
        >
          <Image
            className={styles["sidebar__item-icon"]}
            src={link.icon}
            alt="Home"
            width={30}
            height={30}
            loading="eager"
          />
          <p
            className={`${styles["sidebar__item-text"]} ${
              !sidebarOpen && width! >= 481
                ? styles["sidebar__item-text--close"]
                : ""
            }`}
          >
            {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
          </p>
        </Link>
      ))}
    </aside>
  );
}
