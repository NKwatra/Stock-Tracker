import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import "../src/styles/global.css";

function MyApp({ pageProps, Component }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
