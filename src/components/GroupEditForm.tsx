import gql from "graphql-tag";
import type { UpdateGroupDto } from "src/apollo/graphql";
import { useUpdateGroupMutation } from "src/apollo/graphql";
import { GroupWithdrawalButton } from "src/components/GroupWithdrawalButton";
import { Form } from "src/components/shared/Form";

type Props = {
  onHandleClose: () => void;
  groupItem: UpdateGroupDto;
};

export const GroupEditForm = (props: Props) => {
  const [updateGroup] = useUpdateGroupMutation();

  const funcSaveGroup = (iconUrl: string, name: string) => {
    updateGroup({
      variables: { group: { id: props.groupItem.id, name, iconUrl } },
    });
  };

  return (
    <div className="fixed top-0 md:top-28 p-6 bg-black border border-gray-600 h-full md:h-96 md:rounded-xl z-20 w-full md:max-w-3xl lg:max-w-screen-sm">
      <Form
        onHandleClose={props.onHandleClose}
        func={funcSaveGroup}
        groupItem={props.groupItem}
        title={"更新"}
      />
      <div className="border-b border-gray-800 mt-8 mb-5" />
      <GroupWithdrawalButton
        id={props.groupItem.id}
        onHandleClose={props.onHandleClose}
      />
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
