import gql from "graphql-tag";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useWithdrawalGroupMutation } from "src/apollo/graphql";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  id: number;
  onHandleClose: () => void;
};
export const GroupWithdrawalButton = (props: Props) => {
  const { user } = useContext(UserContext);
  const [withdrawalGroup] = useWithdrawalGroupMutation({
    update(cache, data) {
      cache.modify({
        fields: {
          groupsByUser(existing = [], { readField }) {
            const newGroupList = existing.filter((item: any) => {
              return readField("id", item) !== data.data?.withdrawalGroup?.id;
            });
            return [...newGroupList];
          },
        },
      });
    },
  });
  const handleClick = async () => {
    try {
      await withdrawalGroup({
        variables: { userId: user.id, groupId: props.id },
      });
      toast.success("グループを退会しました");
    } catch (error) {
      toast.error("退会に失敗しました");
    }
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
    }
  }
`;
