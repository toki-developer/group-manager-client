import { gql, useQuery } from "@apollo/client";
import { GroupItem } from "src/components/GroupItem";
import { Icon } from "src/components/shared/Icon";

const GET_GROUPS_QUERY = gql`
  query {
    groupsByUser(id: 2) {
      id
      name
      iconUrl
      updatedAt
    }
  }
`;

export const GroupList = () => {
  const { data, loading, error } = useQuery(GET_GROUPS_QUERY);

  return (
    <ul>
      <li className={"border-b border-gray-600"}>
        <div className={"flex items-center justify-between"}>
          <div className={"flex items-center"}>
            <Icon iconUrl={"/group.png"} />
            <div className={"ml-2"}>グループを追加</div>
          </div>
        </div>
      </li>
      {data?.groupsByUser?.map((item: any) => {
        return (
          <li key={item.id} className={"border-b border-gray-600"}>
            <GroupItem item={item} />
          </li>
        );
      })}
    </ul>
  );
};
