import { Layout } from "src/components/Layout";
import { MyPage } from "src/components/MyPage";
import { Top } from "src/components/Top";

const mypage = () => {
  return (
    <Layout>
      <Top title="マイページ" />
      <MyPage />
    </Layout>
  );
};

export default mypage;
