import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type { GroupModel } from "src/apollo/graphql";

type Form = { name: string };

export const GroupAddForm = () => {
  const { register, handleSubmit } = useForm<Form>({
    defaultValues: {
      name: "aa",
    },
  });
  const [file, setFile] = useState<File>();
  // const [updateGroup] = useまるまるMutation();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="fixed top-28  bg-black border border-gray-600 h-96 rounded-xl z-20 w-full lg:max-w-screen-sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        名前
        <input {...register("name", { required: true })} className="bg-black" />
        <input type="submit" className="bg-black" />
      </form>
    </div>
  );
};
