import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import { Header } from "../components/Header";
import "../styles/global.scss";

const initialOptions = {
  "client-id":
    "AZM6GITc0YQ8AX3pWbjcu77HsRpmpUViATFGbOOSOQuQfuiPn65z2gco-8NmNMNOQNmxHUkjjHNK9Y9r",
  currency: "BRL",
  intent: "capture",
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <PayPalScriptProvider options={initialOptions}>
          <Header />
          <Component {...pageProps} />
        </PayPalScriptProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
