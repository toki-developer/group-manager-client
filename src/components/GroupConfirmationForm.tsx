import gql from "graphql-tag";
import { useContext } from "react";
import { GroupFragmentDoc, useFindGroupQuery } from "src/apollo/graphql";
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
  const [joinGroup] = useJoinGroupMutation({
    update(cache, { data }) {
      const newData = data?.joinGroup;
      cache.modify({
        fields: {
          groupsByUser(existing = []) {
            const newGroupRef = cache.writeFragment({
              data: newData,
              fragment: GroupFragmentDoc,
            });
            return [...existing, newGroupRef];
          },
        },
      });
    },
  });
  if (error) {
    props.onHandleClose();
  }
  const funcJoinGroup = () => {
    joinGroup({ variables: { userId: user.id, searchId: props.searchId } });
    props.onHandleCloseRoot();
  };
  return (
    <div className="fixed top-0 md:top-28 z-20 p-6 w-full md:max-w-3xl lg:max-w-screen-sm h-full md:h-96 bg-black md:rounded-xl border border-gray-600">
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
      id
      searchId
    }
  }
`;
