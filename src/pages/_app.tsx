import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { apollpClient } from "src/apollo/apolloClient";

const App = (props: AppProps) => {
  return (
    <ApolloProvider client={apollpClient}>
      <props.Component {...props.pageProps} />
    </ApolloProvider>
  );
};

export default App;
