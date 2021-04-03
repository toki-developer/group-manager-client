import { Layout } from "src/components/Layout";
import { Top } from "src/components/Top";


const message = () => {
  return (
    <Layout>
      <Top title="メッセージ"/>
      <div>messageです</div>
    </Layout>
  );
};

export default message;
