import gql from "graphql-tag";
import { useContext } from "react";
import { useWithdrawalGroupMutation } from "src/apollo/graphql";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  id: number;
  onHandleClose: () => void;
};
export const GroupWithdrawalButton = (props: Props) => {
  const { user } = useContext(UserContext);
  const [withdrawalGroup] = useWithdrawalGroupMutation();
  const handleClick = () => {
    withdrawalGroup({ variables: { userId: user.id, groupId: props.id } });
    props.onHandleClose();
  };
  return (
    <button className="text-green-500" onClick={handleClick}>
      退会する
    </button>
  );
};

gql`
  mutation withdrawalGroup($userId: String!, $groupId: Int!) {
    withdrawalGroup(userId: $userId, groupId: $groupId) {
      id
      name
    }
  }
`;
