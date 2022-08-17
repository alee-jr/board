import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { SessionProvider } from "next-auth/react";
import { Header } from "../components/Header";
import "../styles/global.scss";

const initialOptions = {
  "client-id":
    "AU6BAqgqP9wXnFiCS3kxh4Yp7Bk754LRDGm7FEg0_743qQnopvisDRv2dQ-WqjFq62ZMeCh2K6PDqdMD",
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
