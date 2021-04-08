import { Layout } from "src/components/layout";
import { Top } from "src/components/Top";

const message = () => {
  return (
    <Layout>
      <Top title="メッセージ" />
      <div>messageです</div>
    </Layout>
  );
};

export default message;
