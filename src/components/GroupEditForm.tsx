import gql from "graphql-tag";
import type { UpdateGroupDto } from "src/apollo/graphql";
import { useUpdateGroupMutation } from "src/apollo/graphql";
import { GroupWithdrawalButton } from "src/components/GroupWithdrawalButton";
import { GroupForm } from "src/components/shared/GroupForm";

type Props = {
  onHandleClose: () => void;
  groupItem: UpdateGroupDto;
};

export const GroupEditForm = (props: Props) => {
  const [updateGroup] = useUpdateGroupMutation();

  const funcUpdateGroup = async (iconUrl: string, name: string) => {
    await updateGroup({
      variables: { group: { id: props.groupItem.id, name, iconUrl } },
    });
  };

  return (
    <div className="fixed top-0 md:top-28 z-20 p-6 w-full md:max-w-3xl lg:max-w-screen-sm h-full md:h-96 bg-black md:rounded-xl border border-gray-600">
      <GroupForm
        onHandleClose={props.onHandleClose}
        func={funcUpdateGroup}
        groupItem={props.groupItem}
        title={"更新"}
        toastValue={"グループを更新しました"}
      />
      <div className="mt-8 mb-5 border-b border-gray-800" />
      <div className="text-right">
        <GroupWithdrawalButton
          id={props.groupItem.id}
          onHandleClose={props.onHandleClose}
        />
      </div>
    </div>
  );
};

gql`
  mutation updateGroup($group: UpdateGroupDto!) {
    updateGroup(group: $group) {
      id
      name
      iconUrl
    }
  }
`;
