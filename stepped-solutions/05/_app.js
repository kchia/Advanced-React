import Page from "../components/Page";

// show now Page is shared across pages globally.

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
