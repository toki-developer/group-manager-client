import type { Dispatch, ReactNode, SetStateAction, VFC } from "react";
import { createContext, useEffect, useState } from "react";
import type { GroupModel } from "src/apollo/graphql";

type Context = {
  group: GroupModel | null;
  setGroup: Dispatch<SetStateAction<GroupModel | null>>;
};

export const GroupContext = createContext<Context>({
  group: {
    id: 0,
    searchId: "",
    name: "",
    iconUrl: "/none_icon.png",
    createdAt: "",
    updatedAt: "",
  },
  setGroup: () => {
    return undefined;
  },
});

export const GroupContextProvider: VFC<{ children: ReactNode }> = (props) => {
  const [group, setGroup] = useState<GroupModel | null>(null);
  useEffect(() => {
    setGroup({
      id: 0,
      searchId: "",
      name: "",
      iconUrl: "/none_icon.png",
      createdAt: "",
      updatedAt: "",
    });
  }, []);

  const value = {
    group,
    setGroup,
  };
  return <GroupContext.Provider value={value} {...props} />;
};
