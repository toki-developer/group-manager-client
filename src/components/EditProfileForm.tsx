import gql from "graphql-tag";
import { nanoid } from "nanoid";
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
  const uploadImg = useCallback(
    async (file: File) => {
      const fileName =
        user.iconUrl !== ""
          ? user.iconUrl.substr(user.iconUrl.indexOf("IconImage/") + 10)
          : nanoid();
      const res = await fetch(`/api/upload?file=${fileName}`);
      const { url, fields } = await res.json();
      const body = new FormData();
      Object.entries({ ...fields, file }).forEach(([key, value]) => {
        body.append(key, value as string | Blob);
      });
      const upload = await fetch(url, { method: "POST", body });
      if (!upload.ok) {
        alert("エラー");
      }
      return url + "IconImage/" + fileName;
    },
    [user.iconUrl]
  );
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
  }, [user.name, setValue]);
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
          <span className="py-2 px-4 font-semibold text-green-500 hover:text-green-400 bg-transparent rounded-full border border-green-500 hover:border-green-400 ">
            アイコンを編集
          </span>
        </label>
      </div>
      <div className="flex flex-col md:flex-row justify-between ">
        <label>
          <div className="border-b border-gray-500">
            <span className="mr-2 text-sm text-gray-300">名前</span>
            <input
              {...register("name", { required: true })}
              className="p-2 bg-black outline-none"
              placeholder="名前を入力"
            />
          </div>
          {errors.name && (
            <p className="mt-2 text-xs text-red-500">※入力必須です</p>
          )}
        </label>
        <label
          htmlFor="update"
          className="py-2 px-14 mx-auto md:mx-0 mt-10 md:mt-0 w-48 h-10 font-semibold text-center bg-green-500 rounded-full"
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
