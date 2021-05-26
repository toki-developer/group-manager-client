import cc from "classcat";
// import Image from "next/image";

type Props = {
  iconUrl: string | undefined;
  size?: "large";
};

export const Icon = (props: Props) => {
  return (
    <div className="m-2 inline-block">
      <img
        src={props.iconUrl}
        alt="icon"
        className={cc([
          "rounded-full object-cover w-12 h-12",
          { ["w-28 h-28"]: props.size === "large" },
        ])}
      />
    </div>
  );
};
