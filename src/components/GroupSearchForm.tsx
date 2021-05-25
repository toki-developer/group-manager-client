import { useState } from "react";
import { useForm } from "react-hook-form";
import { GroupConfirmationForm } from "src/components/GroupConfirmationForm";

export const GroupSearchForm = (props: { onHandleClose: () => void }) => {
  const [isShowForm, setIsShowForm] = useState(false);
  const [searchId, setSearchId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ searchId: string }>();
  const handleOpen = () => {
    setIsShowForm(true);
  };
  const handleClose = () => {
    setIsShowForm(false);
  };

  const handleClick = handleSubmit(async (data) => {
    setSearchId(data.searchId);
    handleOpen();
  });
  return (
    <div>
      <div className="text-green-300 text-sm">
        IDを入力して既存グループを検索
      </div>
      <div className="h-1" />
      <div className="flex">
        <label>
          <div className="border-b border-gray-500">
            <span className="text-gray-300 text-sm mr-2">ID:</span>
            <input
              {...register("searchId", {
                required: "※IDを入力してください。",
                minLength: { value: 10, message: "10桁で入力してください" },
                maxLength: { value: 10, message: "10桁で入力してください" },
              })}
              placeholder="10桁のIDを入力"
              className="bg-transparent outline-none p-2"
            />
          </div>
          {errors.searchId && (
            <p className="text-red-500 text-xs mt-2">
              {errors.searchId.message}
            </p>
          )}
        </label>
        <div className="w-5" />
        <label className="text-center text-white-500 font-semibold py-2 px-5 h-10 bg-green-500 rounded-2xl">
          <input
            type="submit"
            onClick={handleClick}
            value="検索"
            className="bg-transparent"
          />
        </label>
      </div>
      {isShowForm && (
        <GroupConfirmationForm
          onHandleCloseRoot={props.onHandleClose}
          onHandleClose={handleClose}
          searchId={searchId}
        />
      )}
    </div>
  );
};
