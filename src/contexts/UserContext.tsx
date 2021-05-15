import { UserProvider, useUser } from "@auth0/nextjs-auth0";
import gql from "graphql-tag";
import type { ReactNode, VFC } from "react";
import { createContext, useEffect, useState } from "react";
import type { UserModel } from "src/apollo/graphql";
import { useUserQuery } from "src/apollo/graphql";

type Context = {
  user: UserModel;
  loading: boolean;
};
export const UserContext = createContext<Context>({
  user: {
    id: "",
    name: "",
    iconUrl: "",
  },
  loading: false,
});

export const UserContextProvider: VFC<{ children: ReactNode }> = (props) => {
  const [userValue, setUserValue] = useState<UserModel>({
    id: "",
    name: "",
    iconUrl: "",
  });
  const { user } = useUser();
  const { data, loading } = useUserQuery({
    variables: {
      id: user?.sub ? user?.sub : "",
    },
    skip: user?.sub == undefined,
  });
  useEffect(() => {
    setUserValue({
      id: data?.user ? data.user.id : "",
      name: data?.user ? data.user.name : "",
      iconUrl: data?.user ? data.user.iconUrl : "",
    });
  }, [data]);
  return (
    <UserContext.Provider value={{ user: userValue, loading }} {...props} />
  );
};

export const UserContextProviders: VFC<{ children: ReactNode }> = (props) => {
  return (
    <UserProvider>
      <UserContextProvider {...props} />
    </UserProvider>
  );
};

gql`
  query user($id: String!) {
    user(id: $id) {
      id
      name
      iconUrl
    }
  }
`;
