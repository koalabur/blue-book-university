// Next
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import Link from "next/link";

// Next Auth
import { signIn, useSession } from "next-auth/react";

// React
import { useEffect, useState } from "react";

// Redux
import { useDispatch } from "react-redux";
import {
  userIsStudent,
  userIsTeacher,
  setUserFirstName,
  setUserLastName,
  setUserId,
} from "@/store/features/userSlice";

// Components
import Logo from "@/components/ui/logo";

// Styles
import styles from "@/styles/pages/home/index.module.scss";

export default function Home() {
  const dispatch = useDispatch();
  // Form
  const [user, setUser] = useState({ email: "", password: "" });

  // getStudent for global user type
  async function getStudent() {
    const url = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/students`);
    const data = await url.json();
    const student = data.find(
      (student: { email: string }) => student.email === user.email
    );

    return student;
  }

  // getTeacher for global user type
  async function getTeacher() {
    const url = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/teachers`);
    const data = await url.json();
    const teacher = data.find(
      (teacher: { email: string }) => teacher.email === user.email
    );

    return teacher;
  }

  // Login with NextAuth
  async function login(e: { preventDefault: () => void }) {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: user.email,
      password: user.password,
      redirect: false,
    });

    /// Validate Login
    if (res?.status === 200) {
      // Begin Create Global User Type
      // useDispatch will break when used inside of a custom hook
      const student = await getStudent();

      if (student) {
        dispatch(userIsStudent());
        dispatch(setUserFirstName(student.firstName));
        dispatch(setUserLastName(student.lastName));
        dispatch(setUserId(student._id));
      } else {
        const teacher = await getTeacher();
        dispatch(userIsTeacher());
        dispatch(setUserFirstName(teacher.firstName));
        dispatch(setUserLastName(teacher.lastName));
        dispatch(setUserId(teacher._id));
      }
      // End Create Global User Type

      Router.push("/portal");
    } else if (res?.status === 401) {
      console.log("Unauthorized");
    }
  }

  // Check NextAuth Session
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      Router.push("/portal");
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Blue Book University Portal</title>
        <meta
          name="description"
          content="Login for blue book university. This is a demo."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.login}>
        <div className={styles.login__col}>
          <div className={styles["login__col-bg"]}>
            <Image
              className={styles["login__col-bg-img"]}
              src="/img/home/login-bg.jpg"
              alt="Login Background"
              width={960}
              height={1080}
              loading="eager"
              priority
            />
          </div>
        </div>
        <div
          className={`${styles.login__col} ${styles["login__col--content"]}`}
        >
          <Logo className={styles["login__col-logo"]} width={253} height={92} />
          <form
            className={styles["login__col-form"]}
            method="post"
            onSubmit={login}
          >
            <label className={styles["login__col-form-label"]} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className={styles["login__col-form-input"]}
              name="email"
              type="email"
              value={user.email}
              onChange={({ target }) =>
                setUser({ ...user, email: target.value })
              }
            />
            <label
              className={styles["login__col-form-label"]}
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              className={styles["login__col-form-input"]}
              name="password"
              type="password"
              value={user.password}
              onChange={({ target }) =>
                setUser({ ...user, password: target.value })
              }
            />
            <button className={styles["login__col-form-submit"]} type="submit">
              LOGIN
            </button>
          </form>
          <div className={styles["login__col-creds"]}>
            <p className={styles["login__col-creds-title"]}>Student Login</p>
            <p className={styles["login__col-creds-info"]}>
              email: becky@stubbu.com
            </p>
            <p className={styles["login__col-creds-info"]}>
              password: password
            </p>
          </div>
          <Link className={styles["login__col-case"]} href="/case-study">Tell me about this app &#9998;</Link>
        </div>
      </main>
    </>
  );
}
