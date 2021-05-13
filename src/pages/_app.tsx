import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { apolloClient } from "src/apollo/apolloClient";
import { GroupContextProvider } from "src/contexts/GroupContext";
import { UserContextProviders } from "src/contexts/UserContext";

const App = (props: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <UserContextProviders>
        <GroupContextProvider>
          <props.Component {...props.pageProps} />
        </GroupContextProvider>
      </UserContextProviders>
    </ApolloProvider>
  );
};

export default App;
