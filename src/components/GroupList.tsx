import { gql } from "@apollo/client";
import { useContext, useState } from "react";
import type { GroupModel } from "src/apollo/graphql";
import { useGroupsByUserQuery } from "src/apollo/graphql";
import { GroupAddForm } from "src/components/GroupAddForm";
import { GroupItem } from "src/components/GroupItem";
import { Icon } from "src/components/shared/Icon";
import { UserContext } from "src/contexts/UserContext";

export const GroupList = () => {
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(UserContext);
  const { data, loading, refetch } = useGroupsByUserQuery({
    variables: { id: user.id },
    skip: user.id == "",
  });
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
          <GroupAddForm onHandleClose={handleClose} refetch={refetch} />
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
        {!loading &&
          data?.groupsByUser?.map((value: GroupModel) => {
            return (
              <li
                key={value?.id}
                className={"border-b border-gray-900 hover:bg-gray-900"}
              >
                <GroupItem group={value} />
              </li>
            );
          })}
      </ul>
    </div>
  );
};

gql`
  query groupsByUser($id: String!) {
    groupsByUser(id: $id) {
      id
      name
      iconUrl
      createdAt
      updatedAt
    }
  }
`;
