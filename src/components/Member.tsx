import { gql } from "@apollo/client";
import cc from "classcat";
import toast from "react-hot-toast";
import type { MembershipUserFragment } from "src/apollo/graphql";
import { useAllowParticipationMutation } from "src/apollo/graphql";
import { Icon } from "src/components/shared/Icon";

type Props = {
  groupId: number;
  member: MembershipUserFragment;
};

export const Member = (props: Props) => {
  const [withdrawalGroup] = useAllowParticipationMutation({
    update(cache, data) {
      cache.modify({
        fields: {
          usersByGroup(existing = [], { readField }) {
            const newExisting = existing.map((item: MembershipUserFragment) => {
              if (
                readField("id", item.user) == data.data?.allowParticipation?.id
              ) {
                return { ...item, stateFlg: 1 };
              }
              return item;
            });
            return [...newExisting];
          },
        },
      });
    },
  });
  const handleClick = async () => {
    try {
      await withdrawalGroup({
        variables: { userId: props.member.user.id, groupId: props.groupId },
      });
      toast.success("承認しました");
    } catch (error) {
      toast.error("承認に失敗しました");
    }
  };
  return (
    <div className="flex justify-between items-center ">
      <Icon iconUrl={props.member.user.iconUrl} />
      <div className="flex flex-auto justify-between ml-2">
        <span className={cc([{ "text-gray-500": props.member.stateFlg == 0 }])}>
          {props.member.user.name}
        </span>
        {props.member.stateFlg == 0 && (
          <button
            onClick={handleClick}
            className="w-10 text-sm focus:outline-none"
          >
            承認
          </button>
        )}
      </div>
    </div>
  );
};

gql`
  mutation allowParticipation($userId: String!, $groupId: Int!) {
    allowParticipation(userId: $userId, groupId: $groupId) {
      id
    }
  }
`;
