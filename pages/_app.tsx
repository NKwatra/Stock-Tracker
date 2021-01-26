import "antd/dist/antd.css";
import type { AppProps } from "next/app";

function MyApp({ pageProps, Component }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
