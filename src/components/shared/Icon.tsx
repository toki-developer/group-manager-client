// import Image from "next/image";

type Props = {
    iconUrl: string;
}

export const Icon = (props: Props) => {
    return (
      <div className={"m-2 inline-block"}>
        <img
          src={props.iconUrl}
          alt="icon"
          className="rounded-full w-12 h-12 object-cover"
        />
      </div>
    );
}