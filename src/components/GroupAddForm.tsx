import gql from "graphql-tag";
import { useContext } from "react";
import { useSaveGroupMutation } from "src/apollo/graphql";
import { GroupSearchForm } from "src/components/GroupSearchForm";
import { Form } from "src/components/shared/Form";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  onHandleClose: () => void;
  refetch: () => void;
};

export const GroupAddForm = (props: Props) => {
  const { user } = useContext(UserContext);
  const [saveGroup] = useSaveGroupMutation({
    onCompleted() {
      props.refetch();
    },
  });

  const funcSaveGroup = (iconUrl: string, name: string) => {
    saveGroup({ variables: { userId: user.id, group: { name, iconUrl } } });
  };

  return (
    <div className="fixed top-0 md:top-28 p-6 bg-black border border-gray-600 h-full md:h-96 md:rounded-xl z-20 w-full md:max-w-3xl lg:max-w-screen-sm">
      <Form
        onHandleClose={props.onHandleClose}
        func={funcSaveGroup}
        title={"グループ作成"}
      />
      <div className="border-b border-gray-800 mt-8 mb-5" />
      <GroupSearchForm onHandleClose={props.onHandleClose} />
    </div>
  );
};

gql`
  mutation saveGroup($userId: String!, $group: AddGroupDto!) {
    saveGroup(userId: $userId, group: $group) {
      name
      iconUrl
    }
  }
`;
