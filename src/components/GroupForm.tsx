// import { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";

import { GroupModel } from "src/apollo/graphql";

// type Form = { name: string };
type Props = {
  groupItem: GroupModel | null;
};
export const GroupForm = ({ groupItem }: Props) => {
  // const { register, handleSubmit } = useForm<Form>();

  // const [loading, setLoading] = useState(false);

  return (
    <div>
      <div
        className="fixed top-12  bg-black border border-gray-600 h-96 rounded-xl z-10"
        style={{ width: "500px" }}
      >
        id:{groupItem?.id}
        <br />
        name:{groupItem?.name}
      </div>
    </div>
  );
};
