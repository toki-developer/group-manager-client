import type { Dispatch, ReactNode, SetStateAction, VFC } from "react";
import { createContext, useState } from "react";
import type { GroupModel } from "src/apollo/graphql";

type Context = {
  group: GroupModel | null;
  setGroup: Dispatch<SetStateAction<GroupModel | null>>;
};

export const GroupContext = createContext<Context>({
  group: {
    id: "",
    searchId: "",
    name: "",
    iconUrl: "",
    createdAt: "",
    updatedAt: "",
  },
  setGroup: () => {
    return undefined;
  },
});

export const GroupContextProvider: VFC<{ children: ReactNode }> = (props) => {
  const [group, setGroup] = useState<GroupModel | null>(null);
  const value = {
    group,
    setGroup,
  };
  return <GroupContext.Provider value={value} {...props} />;
};
