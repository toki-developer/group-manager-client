import "../styles/globals.css";

import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
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
          <Toaster
            toastOptions={{
              className: "font-bold",
              duration: 2000,
              style: {
                background: "#064e3b",
                color: "#fff",
              },
            }}
          />
        </GroupContextProvider>
      </UserContextProviders>
    </ApolloProvider>
  );
};

export default App;
