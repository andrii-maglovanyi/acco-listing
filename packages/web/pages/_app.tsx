import Head from "next/head";

import "../public/styles.css";

export default function App({ Component, pageProps }): JSX.Element {
  return (
    <>
      <Head>
        <title>acco-listing</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
