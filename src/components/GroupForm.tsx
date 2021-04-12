import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IconEdit } from "src/components/shared/IconEdit";
import { Input } from "src/components/shared/Input";

type Form = { name: string };
export const GroupForm = () => {
  const { register, handleSubmit } = useForm<Form>();

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <div className="fixed top-8  bg-black border border-gray-600 h-80 w-96 rounded-xl z-10"></div>
    </div>
  );
};
