import gql from "graphql-tag";
import { useContext } from "react";
import toast from "react-hot-toast";
import type { MembershipGroupFragment } from "src/apollo/graphql";
import { useWithdrawalGroupMutation } from "src/apollo/graphql";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  title: string;
  id: number;
  onHandleClose?: () => void;
};
export const GroupWithdrawalButton = (props: Props) => {
  const { user } = useContext(UserContext);
  const [withdrawalGroup] = useWithdrawalGroupMutation({
    update(cache, data) {
      cache.modify({
        fields: {
          groupsByUser(existing = [], { readField }) {
            const newGroupList = existing.filter(
              (item: MembershipGroupFragment) => {
                return (
                  readField("id", item.group) !== data.data?.withdrawalGroup?.id
                );
              }
            );
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
      toast.success(`グループを${props.title}しました`);
    } catch (error) {
      toast.error(`${props.title}に失敗しました`);
    }
    if (props.onHandleClose) props.onHandleClose();
  };
  return (
    <button className="focus:outline-none" onClick={handleClick}>
      {props.title}
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
