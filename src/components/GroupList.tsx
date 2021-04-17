import { gql } from "@apollo/client";
import { useContext, useState } from "react";
import type { GroupModel } from "src/apollo/graphql";
import { useGroupsByUserQuery } from "src/apollo/graphql";
import { GroupForm } from "src/components/GroupForm";
import { GroupItem } from "src/components/GroupItem";
import { Icon } from "src/components/shared/Icon";
import { UserContext } from "src/contexts/UserContext";

export const GroupList = () => {
  const [showForm, setShowForm] = useState(false);
  const [groupItem, setGroupItem] = useState<GroupModel | null>(null);
  const { user } = useContext(UserContext);
  const { data, loading, error } = useGroupsByUserQuery({
    variables: { id: 2 },
  });
  const handleAddGroup = () => {
    setGroupItem(null);
    setShowForm(true);
  };
  const handleEditGroup = (groupItem: GroupModel) => {
    setGroupItem(groupItem);
    setShowForm(true);
  };
  const handleClose = () => {
    setShowForm(false);
  };
  return (
    <div>
      {showForm ? (
        <>
          <GroupForm groupItem={groupItem} />
          <div
            className="opacity-20 top-0 left-0 fixed w-full h-full  bg-white z-10"
            onClick={handleClose}
            onKeyDown={handleClose}
            role="presentation"
          />
        </>
      ) : null}
      <ul>
        <li className={"border-b border-gray-900 hover:bg-gray-900"}>
          <div
            className={"flex items-center justify-between"}
            onClick={handleAddGroup}
            onKeyDown={handleAddGroup}
            role="presentation"
          >
            <div className={"flex items-center"}>
              <Icon iconUrl={"/group.png"} />
              <div className={"ml-2"}>グループを追加</div>
            </div>
          </div>
        </li>
        {data?.groupsByUser?.map((value: GroupModel) => {
          return (
            <li
              key={value?.id}
              className={"border-b border-gray-900 hover:bg-gray-900"}
            >
              <GroupItem group={value} onClick={handleEditGroup} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

gql`
  query groupsByUser($id: Int!) {
    groupsByUser(id: $id) {
      id
      name
      iconUrl
      createdAt
      updatedAt
    }
  }
`;
