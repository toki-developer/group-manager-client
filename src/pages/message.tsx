import { useContext } from "react";
import { Layout } from "src/components/Layout";
import { Top } from "src/components/Top";
import { GroupContext } from "src/contexts/GroupContext";

const message = () => {
  const group = useContext(GroupContext);
  return (
    <Layout>
      <Top title="メッセージ" />
      {group.group?.name == "" ? (
        <div>グループを選択してください</div>
      ) : (
        <div>{group.group?.name}のmessageです</div>
      )}
    </Layout>
  );
};

export default message;
