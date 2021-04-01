import type { ReactNode } from "react";
import { FixedMenu } from "src/components/FixedMenu";
import { SideMenu } from "src/components/SideMenu";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <div className={"min-h-screen bg-black text-white"}>
      <div className={"max-w-3xl mx-auto lg:grid lg:max-w-5xl lg:grid-cols-12"}>
        <div className={"hidden lg:block col-span-3 "}>
          <SideMenu />
        </div>
        <div
          className={
            "lg:col-span-9 min-h-screen border-l border-r border-gray-600"
          }
        >
          {props.children}
        </div>
        <div className={"lg:hidden fixed bottom-0 w-full max-w-3xl bg-red-500"}>
          <FixedMenu />
        </div>
      </div>
    </div>
  );
};
