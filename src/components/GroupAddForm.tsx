import gql from "graphql-tag";
import { nanoid } from "nanoid";
import { useCallback, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import type { AddGroupDto } from "src/apollo/graphql";
import { useSaveGroupMutation } from "src/apollo/graphql";
import { Icon } from "src/components/shared/Icon";
import { UserContext } from "src/contexts/UserContext";

type Props = {
  onHandleClose: () => void;
  refetch: () => void;
};

export const GroupAddForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddGroupDto>({
    defaultValues: {
      name: "",
    },
  });
  const { user } = useContext(UserContext);
  const [file, setFile] = useState<File>();
  const [saveGroup] = useSaveGroupMutation({
    onCompleted() {
      props.refetch();
    },
  });
  const [loading, setLoading] = useState(false);
  const uploadImg = useCallback(async (file: File) => {
    const fileName = nanoid();
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
  }, []);
  const handleClick = handleSubmit(async (data) => {
    setLoading(true);
    const iconUrl = file ? await uploadImg(file) : undefined;
    const groupData = {
      name: data.name,
      iconUrl: iconUrl ?? "",
    };
    saveGroup({ variables: { userId: user.id, group: groupData } });
    props.onHandleClose();
    setLoading(false);
  });
  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  return (
    <div className="fixed top-0 md:top-28 p-6 bg-black border border-gray-600 h-full md:h-96 md:rounded-xl z-20 w-full md:max-w-3xl lg:max-w-screen-sm">
      <div
        className="text-green-500"
        onClick={props.onHandleClose}
        onKeyDown={props.onHandleClose}
        role="presentation"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>
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
          <div className="border-b border-gray-500">
            <span className="text-gray-300 text-sm mr-2">グループ名</span>
            <input
              {...register("name", { required: true })}
              className="bg-black outline-none p-2"
              placeholder="グループ名を入力"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">※入力必須です</p>
          )}
        </label>
        <label
          htmlFor="add"
          className="text-center text-white-500 font-semibold h-10 mx-auto md:mx-0 mt-10 md:mt-0 py-2 px-14  bg-green-500 rounded-full w-64"
        >
          {loading ? (
            <span className="text-green-100">グループ作成中..</span>
          ) : (
            <input
              type="submit"
              className="bg-transparent"
              onClick={handleClick}
              value="新規グループ作成"
              id="add"
            />
          )}
        </label>
      </div>
    </div>
  );
};

gql`
  mutation saveGroup($userId: String!, $group: AddGroupDto!) {
    saveGroup(userId: $userId, group: $group) {
      name
      iconUrl
    }
  }
`;
