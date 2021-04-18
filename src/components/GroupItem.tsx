import { useContext, useState } from "react";
import type { GroupModel } from "src/apollo/graphql";
import { GroupEditForm } from "src/components/GroupEditForm";
import { Icon } from "src/components/shared/Icon";
import { GroupContext } from "src/contexts/GroupContext";

type Props = {
  group: GroupModel;
};

export const GroupItem = (props: Props) => {
  const { setGroup } = useContext(GroupContext);
  const [showForm, setShowForm] = useState(false);
  const handleGroup = () => {
    setGroup(props.group);
  };
  const handleClose = () => {
    setShowForm(false);
  };
  const handleEditGroup = () => {
    setShowForm(true);
  };
  return (
    <>
      {showForm ? (
        <>
          <GroupEditForm groupItem={props.group} />
          <div
            className="opacity-20 top-0 left-0 fixed w-full h-full  bg-white z-10"
            onClick={handleClose}
            onKeyDown={handleClose}
            role="presentation"
          />
        </>
      ) : null}
      <div
        className={"flex items-center justify-between"}
        onClick={handleGroup}
        onKeyDown={handleGroup}
        role="presentation"
      >
        <div className={"flex items-center"}>
          <Icon iconUrl={props.group.iconUrl} />
          <div className={"ml-2"}>{props.group.name}</div>
        </div>
        <div
          onClick={handleEditGroup}
          onKeyDown={handleEditGroup}
          role="presentation"
        >
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
    </>
  );
};
