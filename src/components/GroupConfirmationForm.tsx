import gql from "graphql-tag";
import { useContext } from "react";
import { useFindGroupQuery } from "src/apollo/graphql";
import { useJoinGroupMutation } from "src/apollo/graphql";
import { GroupForm } from "src/components/shared/GroupForm";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  onHandleCloseRoot: () => void;
  onHandleClose: () => void;
  searchId: string;
};

export const GroupConfirmationForm = (props: Props) => {
  const { user } = useContext(UserContext);
  const { data, error } = useFindGroupQuery({
    variables: { searchId: props.searchId },
  });
  const [joinGroup] = useJoinGroupMutation();
  if (error) {
    props.onHandleClose();
  }
  const funcJoinGroup = () => {
    joinGroup({ variables: { userId: user.id, searchId: props.searchId } });
    props.onHandleCloseRoot();
  };
  return (
    <div className="fixed top-0 md:top-28 p-6 bg-black border border-gray-600 h-full md:h-96 md:rounded-xl z-20 w-full md:max-w-3xl lg:max-w-screen-sm">
      {data && (
        <GroupForm
          onHandleClose={props.onHandleClose}
          func={funcJoinGroup}
          groupItem={data?.findGroup}
          title={"参加"}
          noChange
        />
      )}
    </div>
  );
};

gql`
  query findGroup($searchId: String!) {
    findGroup(searchId: $searchId) {
      id
      name
      iconUrl
    }
  }

  mutation joinGroup($userId: String!, $searchId: String!) {
    joinGroup(userId: $userId, searchId: $searchId) {
      searchId
    }
  }
`;
