import Document, { Html, Head, NextScript, Main } from "next/document";

// Next.js does not have a hooks api for Document yet.
// Add a _document for adding CSS or custom attributes

export default class MyDocument extends Document {
  render() {
    return (
      // add custom attributes here
      <Html lang="en-CA">
        {/* <Head></Head> */}
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
