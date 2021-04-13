import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { apolloClient } from "src/apollo/apolloClient";
import { GroupContextProvider } from "src/contexts/GroupContext";

const App = (props: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <GroupContextProvider>
        <props.Component {...props.pageProps} />
      </GroupContextProvider>
    </ApolloProvider>
  );
};

export default App;
