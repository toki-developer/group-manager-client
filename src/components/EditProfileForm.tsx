import gql from "graphql-tag";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { AddUserDto } from "src/apollo/graphql";
import { useSaveUserMutation } from "src/apollo/graphql";
import { Icon } from "src/components/shared/Icon";
import { UserContext } from "src/contexts/UserContext";

export const EditProfileForm = () => {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddUserDto>();
  const [file, setFile] = useState<File>();
  const [saveUser] = useSaveUserMutation();
  const [loading, setLoading] = useState(false);
  const uploadImg = useCallback(async (file: File) => {
    const fileName =
      user.iconUrl !== ""
        ? user.iconUrl.substr(user.iconUrl.indexOf("IconImage/") + 10)
          : nanoid();
      const res = await fetch(`/api/upload?file=${fileName}`);
  }, []);
  const handleClick = handleSubmit(async (data) => {
    setLoading(true);
    const iconUrl = file ? await uploadImg(file) : undefined;
    const addUserData = {
      id: user.id,
      name: data.name,
      iconUrl: iconUrl ?? user.iconUrl,
    };
    saveUser({ variables: { user: addUserData } });
    setLoading(false);
  });
  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    setValue("name", user.name);
  }, [user]);
  return (
    <div className="m-5 md:m-10">
      <div className="flex items-center mb-4">
        {file ? (
          <Icon iconUrl={window.URL.createObjectURL(file)} size="large" />
        ) : (
          <Icon
            iconUrl={user.iconUrl !== "" ? user.iconUrl : "/none_icon.png"}
            size="large"
          />
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
          <div className="border-b border-gray-500">
            <span className="text-gray-300 text-sm mr-2">名前</span>
            <input
              {...register("name", { required: true })}
              className="bg-black outline-none p-2"
              placeholder="名前を入力"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">※入力必須です</p>
          )}
        </label>
        <label
          htmlFor="update"
          className="text-center text-white-500 font-semibold h-10 mx-auto md:mx-0 mt-10 md:mt-0 py-2 px-14  bg-green-500 rounded-full w-48"
        >
          {loading ? (
            <span className="text-green-100">更新中..</span>
          ) : (
            <input
              type="submit"
              className="bg-transparent"
              onClick={handleClick}
              value="更新"
              id="update"
            />
          )}
        </label>
      </div>
    </div>
  );
};

gql`
  mutation saveUser($user: AddUserDto!) {
    saveUser(user: $user) {
      id
      name
      iconUrl
    }
  }
`;
