import gql from "graphql-tag";
import { useContext } from "react";
import { useFindGroupQuery } from "src/apollo/graphql";
import { useJoinGroupMutation } from "src/apollo/graphql";
import { Icon } from "src/components/shared/Icon";
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
  const handleClick = () => {
    joinGroup({ variables: { userId: user.id, searchId: props.searchId } });
    props.onHandleCloseRoot();
  };
  if (error) {
    props.onHandleClose();
  }
  return (
    <div className="fixed top-0 left-0 md:top-28 p-6 bg-black border border-gray-600 h-full md:h-96 md:rounded-xl z-20 w-full md:max-w-3xl lg:max-w-screen-sm">
      <div
        className="text-green-500"
        onClick={props.onHandleClose}
        onKeyDown={props.onHandleClose}
        role="presentation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>
      <div className="flex items-center mb-4">
        <Icon
          iconUrl={
            data?.findGroup.iconUrl !== ""
              ? data?.findGroup.iconUrl
              : "/none_icon.png"
          }
          size="large"
        />
      </div>
      <div className="flex justify-between flex-col md:flex-row ">
        <label>
          <div className="border-b border-gray-500">
            <input
              value={data?.findGroup.name}
              className="bg-black outline-none p-2"
              readOnly
            />
          </div>
        </label>
        <label
          htmlFor="join"
          className="text-center text-white-500 font-semibold h-10 mx-auto md:mx-0 mt-10 md:mt-0 py-2 px-14  bg-green-500 rounded-full w-64"
        >
          <input
            type="submit"
            className="bg-transparent"
            onClick={handleClick}
            value="グループに参加"
            id="join"
          />
        </label>
      </div>
    </div>
  );
};

gql`
  query findGroup($searchId: String!) {
    findGroup(searchId: $searchId) {
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
