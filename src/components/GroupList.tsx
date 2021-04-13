import { gql } from "@apollo/client";
import { useState } from "react";
import type { GroupModel } from "src/apollo/graphql";
import { useGroupsByUserQuery } from "src/apollo/graphql";
import { GroupForm } from "src/components/GroupForm";
import { GroupItem } from "src/components/GroupItem";
import { Icon } from "src/components/shared/Icon";

type groupsByUser = GroupModel;

export const GroupList = () => {
  const [showForm, setShowForm] = useState(false);
  const { data, loading, error } = useGroupsByUserQuery();
  const handleAddGroup = () => {
    setShowForm(true);
  };
  const handleClose = () => {
    setShowForm(false);
  };
  return (
    <div>
      {showForm ? (
        <>
          <GroupForm />
          <div
            className="opacity-20 top-0 left-0 fixed w-full h-full  bg-white z-0"
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
        {data?.groupsByUser?.map((value: groupsByUser) => {
          return (
            <li
              key={value?.id}
              className={"border-b border-gray-900 hover:bg-gray-900"}
            >
              <GroupItem {...value} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

gql`
  query groupsByUser {
    groupsByUser(id: 2) {
      id
      name
      iconUrl
      createdAt
      updatedAt
    }
  }
`;
