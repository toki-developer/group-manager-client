import cc from "classcat";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import type { GroupModel } from "src/apollo/graphql";
import { GroupEditForm } from "src/components/GroupEditForm";
import { Icon } from "src/components/shared/Icon";
import { GroupContext } from "src/contexts/GroupContext";

type Props = {
  group: GroupModel;
  stateFlg: number;
};

export const GroupItem = (props: Props) => {
  const { setGroup } = useContext(GroupContext);
  const [showForm, setShowForm] = useState(false);
  const handleGroup = () => {
    if (props.stateFlg == 0) {
      toast("参加承認待ち中です。");
      return;
    }
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
          <GroupEditForm onHandleClose={handleClose} groupItem={props.group} />
          <div
            className="fixed top-0 left-0 z-10 w-full h-full bg-white opacity-20"
            onClick={handleClose}
            onKeyDown={handleClose}
            role="presentation"
          />
        </>
      ) : null}
      <div
        className="flex justify-between items-center "
        onClick={handleGroup}
        onKeyDown={handleGroup}
        role="presentation"
      >
        <div className="flex relative flex-auto items-center">
          <div className={cc([{ "opacity-50": props.stateFlg == 0 }])}>
            <Icon iconUrl={props.group.iconUrl} />
          </div>
          <div
            className={cc([
              "ml-2 flex-auto",
              { "text-gray-500": props.stateFlg == 0 },
            ])}
          >
            {props.group.name}
            <p className="flex content-between w-full text-xs text-gray-500">
              <span className="flex-auto">id:{props.group.searchId}</span>
              {props.stateFlg == 0 && (
                <span className="text-gray-400 ">認証待ち</span>
              )}
            </p>
          </div>
        </div>
        <div
          onClick={handleEditGroup}
          onKeyDown={handleEditGroup}
          role="presentation"
        >
          <svg
            className="flex-shrink-0 mr-4 ml-7 w-7 h-7 text-gray-300"
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
