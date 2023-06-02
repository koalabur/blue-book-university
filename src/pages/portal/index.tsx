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
import Tests from "@/components/tests/default";
import Preloader from "@/components/preloader/circularDot";

// Types
import { IsStudent } from "@/shared/interface";

// Styles
import styles from "@/styles/pages/portal/index.module.scss";

export default function PortalIndex() {
  const { status } = useSession();

  // Redux - Theme
  const theme = useSelector(selectTheme);

  // Redux - User
  const user = useSelector(selectUser);

  const studentQuery = gql`
    query StudentHome($ID: ID!) {
      student(id: $ID) {
        tests {
          _id
          classInfo {
            _id
            class
          }
          createdBy {
            _id
            firstName
            lastName
          }
          testName
          desc
        }
      }
    }
  `;

  interface queryData {
    loading: boolean;
    error?: ApolloError | undefined;
    data?: IsStudent | undefined;
  }

  const { loading, error, data }: queryData = useQuery(studentQuery, {
    variables: { ID: user.id },
  });

  function renderTests() {
    if (loading) return <Preloader />;
    if (error) return <p>Error :(</p>;
    const testData = data?.student.tests;
    return <Tests data={testData} />;
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      Router.replace("/");
    }
  }, [status]);

  return (
    <div className={`${styles.body} ${theme ? "" : styles["body--dark"]}`}>
      <Sidebar />
      <main className={`${styles.home} ${theme ? "" : styles["home--dark"]}`}>
        {renderTests()}
      </main>
    </div>
  );
}
