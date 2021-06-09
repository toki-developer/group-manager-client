import { useContext } from "react";
import { Icon } from "src/components/shared/Icon";
import { GroupContext } from "src/contexts/GroupContext";

type Props = {
  title: string;
};

export const Top = (props: Props) => {
  const group = useContext(GroupContext);
  return (
    <div className="sticky top-0 z-10 bg-black border-r border-b border-l border-gray-600 ">
      <div className="flex items-center h-16">
        {props.title !== "マイページ" && (
          <Icon iconUrl={group.group?.iconUrl} />
        )}
        <div className="inline-block ml-3 text-2xl text-gray-300 align-middle ">
          {props.title}
        </div>
      </div>
    </div>
  );
};
