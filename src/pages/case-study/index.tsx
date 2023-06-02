import Head from "next/head";
import styles from "@/styles/pages/case-study/index.module.scss";
import Link from "next/link";

export default function CaseStudy() {
  return (
    <>
      <Head>
        <title>Case Study</title>
        <meta name="description" content="Case Study by Cameron" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.caseStudy}>
        <h1 className={styles.caseStudy__title}>CASE STUDY COMING SOON</h1>
        <Link className={styles.caseStudy__link} href="/">BACK TO LOGIN</Link>
      </main>
    </>
  );
}
