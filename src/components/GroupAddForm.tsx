import gql from "graphql-tag";
import { useContext, useState } from "react";
import { useSaveGroupMutation } from "src/apollo/graphql";
import { GroupConfirmationForm } from "src/components/GroupConfirmationForm";
import { GroupSearchForm } from "src/components/GroupSearchForm";
import { GroupForm } from "src/components/shared/GroupForm";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  onHandleClose: () => void;
};

export const GroupAddForm = (props: Props) => {
  const { user } = useContext(UserContext);
  const [isShowForm, setIsShowForm] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [saveGroup] = useSaveGroupMutation({
    update(cache, data) {
      const newData = data.data?.saveGroup;
      cache.modify({
        fields: {
          groupsByUser(existing = []) {
            return [...existing, newData];
          },
        },
      });
    },
  });
  const handleClose = () => {
    setIsShowForm(false);
  };

  const funcSaveGroup = (iconUrl: string, name: string) => {
    saveGroup({
      variables: { userId: user.id, group: { name, iconUrl } },
    });
  };

  return (
    <>
      <div className="fixed top-0 md:top-28 z-20 p-6 w-full md:max-w-3xl lg:max-w-screen-sm h-full md:h-96 bg-black md:rounded-xl border border-gray-600">
        <GroupForm
          onHandleClose={props.onHandleClose}
          func={funcSaveGroup}
          title={"グループ作成"}
        />
        <div className="mt-8 mb-5 border-b border-gray-800" />
        <GroupSearchForm
          onHandleClose={props.onHandleClose}
          setIsShowForm={setIsShowForm}
          setSearchId={setSearchId}
        />
      </div>
      {isShowForm && (
        <GroupConfirmationForm
          onHandleCloseRoot={props.onHandleClose}
          onHandleClose={handleClose}
          searchId={searchId}
        />
      )}
    </>
  );
};

gql`
  mutation saveGroup($userId: String!, $group: AddGroupDto!) {
    saveGroup(userId: $userId, group: $group) {
      id
      searchId
      name
      iconUrl
    }
  }
`;
