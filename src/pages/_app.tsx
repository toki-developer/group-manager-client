import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { apolloClient } from "src/apollo/apolloClient";
import { GroupContextProvider } from "src/contexts/GroupContext";
import { UserContextProvider } from "src/contexts/UserContext";

const App = (props: AppProps) => {
  return (
    <ApolloProvider client={apolloClient}>
      <UserContextProvider>
        <GroupContextProvider>
          <props.Component {...props.pageProps} />
        </GroupContextProvider>
      </UserContextProvider>
    </ApolloProvider>
  );
};

export default App;
