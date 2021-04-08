import { GroupList } from "src/components/GroupList";
import { Layout } from "src/components/Layout";
import { Top } from "src/components/Top";

const IndexPage = () => {
  return (
    <Layout>
      <Top title="グループ" />
      <GroupList></GroupList>
    </Layout>
  );
};

export default IndexPage;
