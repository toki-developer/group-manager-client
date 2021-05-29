import { nanoid } from "nanoid";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type { AddGroupDto, UpdateGroupDto } from "src/apollo/graphql";
import { Icon } from "src/components/shared/Icon";

type Props = {
  onHandleClose: () => void;
  groupItem?: UpdateGroupDto;
  func: (iconUrl: string, name: string) => void;
  title: string;
  noChange?: boolean;
};

export const GroupForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddGroupDto>({
    defaultValues: {
      name: props.groupItem?.name ?? "",
    },
  });
  const [file, setFile] = useState<File>();

  const [loading, setLoading] = useState(false);
  const uploadImg = useCallback(
    async (file: File) => {
      const fileName =
        props.groupItem?.iconUrl !== "" &&
        props.groupItem?.iconUrl !== undefined
          ? props.groupItem?.iconUrl.substr(
              props.groupItem?.iconUrl.indexOf("IconImage/") + 10
            )
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
    [props.groupItem?.iconUrl]
  );
  const handleClick = handleSubmit(async (data) => {
    setLoading(true);
    const iconUrl = file
      ? await uploadImg(file)
      : props.groupItem?.iconUrl
      ? props.groupItem.iconUrl
      : "";

    props.func(iconUrl, data.name);
    props.onHandleClose();
    setLoading(false);
  });
  const handleChangeFile = (e: any) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
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
          <Icon
            iconUrl={
              props.groupItem?.iconUrl !== "" &&
              props.groupItem?.iconUrl !== undefined
                ? props.groupItem?.iconUrl
                : "/none_icon.png"
            }
            size="large"
          />
        )}
        {!props.noChange && (
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
        )}
      </div>
      <div className="flex justify-between flex-col md:flex-row ">
        <label>
          <div className="border-b border-gray-500">
            <span className="text-gray-300 text-sm mr-2">グループ名</span>
            <input
              {...register("name", { required: true })}
              className="bg-black outline-none p-2"
              placeholder="グループ名を入力"
              readOnly={props.noChange}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-2">※入力必須です</p>
          )}
        </label>
        <label
          htmlFor="update"
          className="text-center text-white-500 font-semibold h-10 mx-auto md:mx-0 mt-10 md:mt-0 py-2 px-14  bg-green-500 rounded-full w-64"
        >
          {loading ? (
            <span className="text-green-100">{props.title}中..</span>
          ) : (
            <input
              type="submit"
              className="bg-transparent"
              onClick={handleClick}
              value={props.title}
              id="update"
            />
          )}
        </label>
      </div>
    </>
  );
};
