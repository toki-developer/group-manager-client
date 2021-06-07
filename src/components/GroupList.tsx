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
  const { data, loading } = useGroupsByUserQuery({
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
          <GroupAddForm onHandleClose={handleClose} />
          <div
            className="fixed top-0 left-0 z-10 w-full h-full bg-white opacity-20"
            onClick={handleClose}
            onKeyDown={handleClose}
            role="presentation"
          />
        </>
      ) : null}
      <ul>
        <li className="hover:bg-gray-900 border-b border-gray-900">
          <div
            className="flex justify-between items-center"
            onClick={handleAddGroup}
            onKeyDown={handleAddGroup}
            role="presentation"
          >
            <div className="flex items-center">
              <Icon iconUrl="/group.png" />
              <div className="ml-2">グループを追加</div>
            </div>
          </div>
        </li>
        {!loading &&
          data?.groupsByUser?.map((value: GroupModel) => {
            return (
              <li
                key={value?.id}
                className="hover:bg-gray-900 border-b border-gray-900"
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
      searchId
      name
      iconUrl
    }
  }
`;
