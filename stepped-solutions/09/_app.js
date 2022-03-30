import NProgress from "nprogress"; // nifty loader at the top
import Router from "next/router"; // hook into n progress events
import Page from "../components/Page";
import "../components/styles/nprogress.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
