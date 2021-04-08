import { Icon } from "src/components/shared/Icon";
import { EXAMPLE_GROUP_1 } from "src/sampleModels/group";

const group = EXAMPLE_GROUP_1;

type Props = {
  title: string;
};

export const Top = (props: Props) => {
  return (
    <div
      className={
        " sticky top-0 bg-black border-gray-600 border-b border-l border-r"
      }
    >
      <div className={"flex items-center"}>
        <Icon iconUrl={group.iconUrl} />
        <div
          className={
            "inline-block align-middle ml-3 text-2xl font-font-bold text-gray-300"
          }
        >
          {props.title}
        </div>
      </div>
    </div>
  );
};
