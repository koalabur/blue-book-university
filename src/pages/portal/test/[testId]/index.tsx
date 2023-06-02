// Next
import Router from "next/router";

// Next Auth
import { useSession } from "next-auth/react";

// React
import { useEffect } from "react";

// Redux
import { useSelector } from "react-redux";
import { selectTheme } from "@/store/features/themeSlice";
import { selectUser } from "@/store/features/userSlice";

// GraphQL/ Apollo
import { ApolloError, useQuery } from "@apollo/client";
import gql from "graphql-tag";

// Components
import Sidebar from "@/components/sidebar/default";
import Preloader from "@/components/preloader/circularDot";
import TestDefault from "@/components/test/default";

// Types
import { StudentTest } from "@/shared/interface";

// Styles
import styles from "@/styles/pages/test/index.module.scss";

interface queryData {
  loading: boolean;
  error?: ApolloError | undefined;
  data?: StudentTest | undefined;
}

export default function Test() {
  const { status } = useSession();

  // Redux - Theme
  const theme = useSelector(selectTheme);

  // Redux - User
  const user = useSelector(selectUser);

  const studentTestQuery = gql`
    query StudentTest($ID: ID!, $TEST_ID: ID!) {
      studentTest(id: $ID) {
        test(id: $TEST_ID) {
          _id
          testName
          configuration {
            type
            question
            options
            answer
          }
        }
      }
    }
  `;

  const { loading, error, data }: queryData = useQuery(studentTestQuery, {
    variables: { ID: user.id, TEST_ID: Router.query.testId },
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/");
    }
  }, [status]);

  return (
    <div className={`${styles.body} ${theme ? "" : styles["body--dark"]}`}>
      <Sidebar />
      <main className={`${styles.home} ${theme ? "" : styles["home--dark"]}`}>
        {loading ? <Preloader /> : <TestDefault data={data} />}
      </main>
    </div>
  );
}
