import { Html, Head, Main, NextScript } from "next/document";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

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
