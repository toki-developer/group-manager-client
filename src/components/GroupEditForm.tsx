import cc from "classcat";
import gql from "graphql-tag";
import type { UpdateGroupDto } from "src/apollo/graphql";
import type { MembershipUserFragment } from "src/apollo/graphql";
import { useUsersByGroupQuery } from "src/apollo/graphql";
import { useUpdateGroupMutation } from "src/apollo/graphql";
import { GroupWithdrawalButton } from "src/components/GroupWithdrawalButton";
import { GroupForm } from "src/components/shared/GroupForm";
import { Icon } from "src/components/shared/Icon";

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
    <div className="fixed top-0 md:top-28 z-20 p-6 w-full md:max-w-3xl lg:max-w-screen-sm h-full md:h-2/3 bg-black md:rounded-xl border border-gray-600">
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
      <div>
        {!data?.usersByGroup ? (
          <div></div>
        ) : (
          <div>
            <span>メンバー{data.usersByGroup.length}人</span>
            <ul className="overflow-scroll">
              {data.usersByGroup.map((value: MembershipUserFragment) => {
                return (
                  <li key={value.user.id}>
                    <UserItem user={value.user} stateFlg={value.stateFlg} />
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

const UserItem = (props: MembershipUserFragment) => {
  return (
    <div className="flex justify-between items-center ">
      <Icon iconUrl={props.user.iconUrl} />
      <div className="flex flex-auto justify-between ml-2">
        <span className={cc([{ "text-gray-500": props.stateFlg == 0 }])}>
          {props.user.name}
        </span>
        {props.stateFlg == 0 && <button>承認する</button>}
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
