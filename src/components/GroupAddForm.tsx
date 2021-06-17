import gql from "graphql-tag";
import { useContext, useState } from "react";
import { GroupFragmentDoc, useSaveGroupMutation } from "src/apollo/graphql";
import { GroupConfirmationForm } from "src/components/GroupConfirmationForm";
import { GroupSearchForm } from "src/components/GroupSearchForm";
import { GroupForm } from "src/components/shared/GroupForm";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  onHandleClose: () => void;
};

export const GroupAddForm = (props: Props) => {
  const { user } = useContext(UserContext);
  const [isShowConfirmForm, setIsShowConfirmForm] = useState(false);
  const [searchId, setSearchId] = useState("");
  const [saveGroup] = useSaveGroupMutation({
    update(cache, { data }) {
      const newData = data?.saveGroup;
      cache.modify({
        fields: {
          groupsByUser(existing = []) {
            const newGroupRef = cache.writeFragment({
              data: newData,
              fragment: GroupFragmentDoc,
            });
            const newGroupData = {
              __typename: "MembershipModel",
              stateFlg: 1,
              group: newGroupRef,
            };
            const groupList = [...existing, newGroupData];
            groupList.sort((i, j) => {
              if (i.stateFlg > j.stateFlg) return -1;
              return 0;
            });
            return groupList;
          },
        },
      });
    },
  });
  const handleClose = () => {
    setIsShowConfirmForm(false);
  };

  const funcSaveGroup = async (iconUrl: string, name: string) => {
    await saveGroup({
      variables: { userId: user.id, group: { name, iconUrl } },
    });
  };

  return (
    <>
      {!isShowConfirmForm ? (
        <div className="fixed top-0 md:top-28 z-20 p-6 w-full md:max-w-3xl lg:max-w-screen-sm h-full md:h-96 bg-black md:rounded-xl border border-gray-600">
          <GroupForm
            onHandleClose={props.onHandleClose}
            func={funcSaveGroup}
            title={"グループ作成"}
            toastValue={"グループを作成しました"}
          />
          <div className="mt-8 mb-5 border-b border-gray-800" />
          <GroupSearchForm
            onHandleClose={props.onHandleClose}
            setIsShowForm={setIsShowConfirmForm}
            setSearchId={setSearchId}
          />
        </div>
      ) : (
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
      ...Group
    }
  }
`;
