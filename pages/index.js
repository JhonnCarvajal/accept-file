import Head from "next/head";
import FileSelector from "../components/FileSelector";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      ></link>
      <Head>
        <title>Accept File App</title>
        <meta name="description" content="App for collecting PE files" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FileSelector />
      </main>
    </div>
  );
}
