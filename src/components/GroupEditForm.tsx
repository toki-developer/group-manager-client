import gql from "graphql-tag";
import type { UpdateGroupDto } from "src/apollo/graphql";
import type { MembershipUserFragment } from "src/apollo/graphql";
import { useUsersByGroupQuery } from "src/apollo/graphql";
import { useUpdateGroupMutation } from "src/apollo/graphql";
import { GroupWithdrawalButton } from "src/components/GroupWithdrawalButton";
import { Member } from "src/components/Member";
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
  const { data } = useUsersByGroupQuery({
    variables: { id: props.groupItem.id },
  });

  return (
    <div className="overflow-scroll fixed top-0 md:top-28 z-20 p-6 w-full md:max-w-3xl lg:max-w-screen-sm h-full md:h-2/3 bg-black md:rounded-xl border border-gray-600">
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
          title="退会"
          id={props.groupItem.id}
          onHandleClose={props.onHandleClose}
        />
      </div>
      <div>
        {!data?.usersByGroup ? (
          <div></div>
        ) : (
          <div>
            <span>メンバー{data.usersByGroup.length}人</span>
            <ul className="">
              {data.usersByGroup.map((value: MembershipUserFragment) => {
                return (
                  <li key={value.user.id}>
                    <Member member={value} groupId={props.groupItem.id} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
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

gql`
  query usersByGroup($id: Int!) {
    usersByGroup(id: $id) {
      user {
        ...User
      }
      stateFlg
    }
  }
`;

gql`
  fragment MembershipUser on MembershipModel {
    stateFlg
    user {
      ...User
    }
  }
`;

gql`
  fragment User on UserModel {
    id
    name
    iconUrl
  }
`;
