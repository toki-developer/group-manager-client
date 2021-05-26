import { useContext } from "react";
import { Icon } from "src/components/shared/Icon";
import { GroupContext } from "src/contexts/GroupContext";

type Props = {
  title: string;
};

export const Top = (props: Props) => {
  const group = useContext(GroupContext);
  return (
    <div className=" sticky top-0 bg-black border-gray-600 border-b border-l border-r">
      <div className="flex items-center h-16">
        {props.title !== "マイページ" && (
          <Icon iconUrl={group.group?.iconUrl} />
        )}
        <div className="inline-block align-middle ml-3 text-2xl font-font-bold text-gray-300">
          {props.title}
        </div>
      </div>
    </div>
  );
};
