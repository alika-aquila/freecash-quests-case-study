import { Html, Head, Main, NextScript } from "next/document";

const basePath = process.env.NODE_ENV === 'production' ? '/freecash-quests-case-study' : '';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href={`${basePath}/favicon.png`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
