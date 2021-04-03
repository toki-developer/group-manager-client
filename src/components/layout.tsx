import type { ReactNode } from "react";
import { FixedMenu } from "src/components/FixedMenu";
import { SideMenu } from "src/components/SideMenu";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <div className={"min-h-screen bg-black"}>
      <div className={"max-w-3xl mx-auto lg:grid lg:max-w-6xl lg:grid-cols-12"}>
        <div className={"hidden lg:block col-span-3 text-gray-300"}>
          <SideMenu />
        </div>
        <div
          className={
            "lg:col-span-9 min-h-screen border-l border-r border-gray-600 text-white"
          }
        >
          {props.children}
        </div>
        <div
          className={
            "lg:hidden fixed bottom-0 w-full max-w-3xl bg-black border-l border-r border-t border-gray-600 text-gray-300"
          }
        >
          <FixedMenu />
        </div>
      </div>
    </div>
  );
};
