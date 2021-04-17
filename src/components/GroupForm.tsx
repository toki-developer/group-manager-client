import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type { GroupModel } from "src/apollo/graphql";

type Form = { name: string };
type Props = {
  groupItem: GroupModel | null;
};
export const GroupForm = ({ groupItem }: Props) => {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      name: groupItem?.name ?? "",
    },
  });
  const [file, setFile] = useState<File>();
  // const [updateGroup] = useまるまるMutation();
  const [loading, setLoading] = useState(false);
  console.log(groupItem?.name);
  const onSubmit = (data: any) => {
    if (groupItem?.id) {
      console.log("更新処理");
      console.log(groupItem?.id);
      console.log(data);
    } else {
      console.log("追加処理");
      console.log(data);
    }
  };

  return (
    <div className="fixed top-28  bg-black border border-gray-600 h-96 rounded-xl z-20 w-full lg:max-w-screen-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        名前
        <input
          defaultValue={groupItem?.name}
          {...register("name", { required: true })}
          className="bg-black"
        />
        <input type="submit" />
      </form>
    </div>
  );
};
