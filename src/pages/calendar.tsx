import { useContext } from "react";
import { Layout } from "src/components/Layout";
import { Top } from "src/components/Top";
import { GroupContext } from "src/contexts/GroupContext";

const calendar = () => {
  const group = useContext(GroupContext);
  return (
    <Layout>
      <Top title="カレンダー" />
      {group.group?.name == "" ? (
        <div>グループを選択してください</div>
      ) : (
        <div>{group.group?.name}のcalendarです</div>
      )}
    </Layout>
  );
};

export default calendar;
