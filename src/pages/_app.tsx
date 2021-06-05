import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { useApollo } from "src/apollo/apolloClient";
import { GroupContextProvider } from "src/contexts/GroupContext";
import { UserContextProviders } from "src/contexts/UserContext";

const App = (props: AppProps) => {
  const apolloClient = useApollo(props.pageProps);
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
