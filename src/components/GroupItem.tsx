import { useContext } from "react";
import type { GroupModel } from "src/apollo/graphql";
import { Icon } from "src/components/shared/Icon";
import { GroupContext } from "src/contexts/GroupContext";

type Props = {
  group: GroupModel;
  onClick: (groupItem: GroupModel) => void;
};

export const GroupItem = ({ group, onClick }: Props) => {
  const { setGroup } = useContext(GroupContext);
  const handleGroup = () => {
    setGroup(group);
  };

  return (
    <div className={"flex items-center justify-between"} onClick={handleGroup}>
      <div className={"flex items-center"}>
        <Icon iconUrl={group.iconUrl} />
        <div className={"ml-2"}>{group.name}</div>
      </div>
      <div onClick={() => onClick(group)}>
        <svg
          className="text-gray-300 flex-shrink-0 ml-7 mr-4 h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </div>
    </div>
  );
};
