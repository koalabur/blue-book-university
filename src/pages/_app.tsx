// Next
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

// Next Auth
import { SessionProvider } from "next-auth/react";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";

// Apollo
import { ApolloProvider } from "@apollo/client";
import client from "@/apollo-client";

// Google Fonts
import { Open_Sans } from "next/font/google";

// Layouts
import Layout from "@/components/layout/default";

// Global Styles
import "@/styles/globals.scss";
const gfont = Open_Sans({
  weight: ["400", "700"],
  preload: true,
  style: ["normal", "italic"],
  subsets: ["latin"],
  fallback: ["arial"],
  variable: "--main-font",
});

export default function App({ Component, pageProps }: AppProps) {
  const Router = useRouter();
  if (Router.pathname.startsWith("/portal")) {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SessionProvider session={pageProps.session}>
              <div className={gfont.variable}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </div>
            </SessionProvider>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SessionProvider session={pageProps.session}>
            <div className={gfont.variable}>
              <Component {...pageProps} />
            </div>
          </SessionProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
}
