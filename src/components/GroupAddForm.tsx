import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type { GroupModel } from "src/apollo/graphql";
import { Icon } from "src/components/shared/Icon";

type Form = { name: string };

type Props = {
  onHandleClose: () => void;
};

export const GroupAddForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: "",
    },
  });
  const [file, setFile] = useState<File>();
  // const [updateGroup] = useまるまるMutation();
  const [loading, setLoading] = useState(false);
  const handleClick = handleSubmit((data) => {
    setLoading(true);
    console.log(data);
    console.log(file);
    props.onHandleClose();
    setLoading(false);
  });
  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="fixed top-0 md:top-28 p-6 bg-black border border-gray-600 h-full md:h-96 md:rounded-xl z-20 w-full md:max-w-3xl lg:max-w-screen-sm">
      <div className="flex items-center mb-4">
        {file ? (
          <Icon iconUrl={window.URL.createObjectURL(file)} size="large" />
        ) : (
          <Icon iconUrl="/none_icon.png" size="large" />
        )}
        <label htmlFor="icon" className="ml-7">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChangeFile}
            id="icon"
          />
          <span className="bg-transparent  text-green-500 hover:text-green-400 font-semibold  py-2 px-4 border border-green-500 hover:border-green-400 rounded-full ">
            アイコンを編集
          </span>
        </label>
      </div>
      <div className="flex justify-between flex-col md:flex-row ">
        <label>
          <input
            {...register("name", { required: true })}
            className="bg-black outline-none border-b border-gray-500 p-2"
            placeholder="グループ名を入力"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">※入力必須です</p>
          )}
        </label>
        <button className="text-white-500 font-semibold h-10 mx-auto md:mx-0 mt-10 md:mt-0 py-2 px-14 border border-none bg-green-500 rounded-full max-w-sm">
          <input
            type="submit"
            className="bg-transparent outline-none "
            onClick={handleClick}
            value="新規グループ作成"
          />
        </button>
      </div>
    </div>
  );
};
