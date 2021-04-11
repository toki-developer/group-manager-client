import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { IconEdit } from "src/components/shared/IconEdit";
import { Input } from "src/components/shared/Input";

type Form = { name: string };
export const GroupForm = () => {
  const { register, handleSubmit } = useForm<Form>();
  const onSubmit = (data) => {
    return console.log(data);
  };

  //  const [mergeGroup] = use
  // const [file , setFile] = useState<File>()
  const [loading, setLoading] = useState(false);

  // 参考：写しただけ
  // const handleUploadImage = useCallback(async (file: File) => {
  //   const fileName = anoid();
  //   const res = await fetch(`/api/img/upload?file=${fileName}`);
  //   const { url, fields } = await res.json();
  //   const body = new FormData();
  //   Object.entries({ ...fields, file }).forEach([key, value]) => {
  //     body.append(key, value as string | Blob);
  //   }
  //   const upload = await fetch(url, { method: "POST", body });
  //   if (!upload.ok) {
  //   toastVar({ variant: "error" });
  //   }
  //   return fileName;
  // },[])

  return (
    <div>
      <div>
        <IconEdit />
      </div>
      <div>
        <Input />
      </div>
    </div>
  );
};
