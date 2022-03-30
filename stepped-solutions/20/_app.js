import { ApolloProvider } from "@apollo/client"; // stick it high up in the tree
import NProgress from "nprogress";
import Router from "next/router";
import Page from "../components/Page";
import "../components/styles/nprogress.css";
import withData from "../lib/withData";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}

// if any of the pages has getInitialProps, then wait for them to complete running it
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp); // withData will inject apollo client
