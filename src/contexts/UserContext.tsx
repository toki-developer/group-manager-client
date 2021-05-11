import type { ReactNode, VFC } from "react";
import { createContext, useEffect, useState } from "react";
import type { UserModel } from "src/apollo/graphql";

type Context = {
  user: UserModel;
};
export const UserContext = createContext<Context>({
  user: {
    id: "",
    name: "",
    email: "",
    iconUrl: "/none_icon.png",
    createdAt: "",
    updatedAt: "",
  },
});

export const UserContextProvider: VFC<{ children: ReactNode }> = (props) => {
  const [user, setUser] = useState<UserModel>({
    id: "",
    name: "",
    email: "",
    iconUrl: "/none_icon.png",
    createdAt: "",
    updatedAt: "",
  });
  useEffect(() => {
    setUser({
      id: "tokitoki",
      name: "toki",
      email: "toki@email",
      iconUrl: "/none_icon.png",
      createdAt: "",
      updatedAt: "",
    });
  }, []);
  const value = {
    user,
  };
  return <UserContext.Provider value={value} {...props} />;
};
