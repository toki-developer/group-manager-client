import { useForm } from "react-hook-form";

type Props = {
  onHandleClose: () => void;
  setIsShowForm: (args: boolean) => void;
  setSearchId: (args: string) => void;
};

export const GroupSearchForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ searchId: string }>();
  const handleOpen = () => {
    props.setIsShowForm(true);
  };

  const handleClick = handleSubmit(async (data) => {
    props.setSearchId(data.searchId);
    handleOpen();
  });
  return (
    <div>
      <div className="text-sm text-green-300">
        IDを入力して既存グループを検索
      </div>
      <div className="h-1" />
      <div className="flex">
        <label>
          <div className="border-b border-gray-500">
            <span className="mr-2 text-sm text-gray-300">ID:</span>
            <input
              {...register("searchId", {
                required: "※IDを入力してください。",
                minLength: { value: 10, message: "10桁で入力してください" },
                maxLength: { value: 10, message: "10桁で入力してください" },
              })}
              placeholder="10桁のIDを入力"
              className="p-2 bg-transparent outline-none"
            />
          </div>
          {errors.searchId && (
            <p className="mt-2 text-xs text-red-500">
              {errors.searchId.message}
            </p>
          )}
        </label>
        <div className="w-5" />
        <label className="py-2 px-5 h-10 font-semibold text-center bg-green-500 rounded-2xl ">
          <input
            type="submit"
            onClick={handleClick}
            value="検索"
            className="bg-transparent"
          />
        </label>
      </div>
    </div>
  );
};
