import Head from "next/head";
import { PaymentForm } from "../components/PaymentForm";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Credit card validator</title>
      </Head>

      <main className={styles.main}>
        <h1>
          Submit <em>(not really)</em>
        </h1>
        <PaymentForm />
      </main>
    </div>
  );
}
