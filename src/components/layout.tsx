import type { ReactNode } from "react";
import { FixedMenu } from "src/components/FixedMenu";
import { SideMenu } from "src/components/SideMenu";

export const Layout = (props: { children: ReactNode }) => {
  return (
    <div className={"min-h-screen bg-gray-100"}>
      <div
        className={
          "max-w-3xl mx-auto lg:grid lg:max-w-5xl lg:grid-cols-12 lg:gap-8"
        }
      >
        <div className={"lg:col-span-9 lg:order-2 bg-green-500"}>
          {props.children}
        </div>
        <div className={"hidden lg:block col-span-3 order-1 bg-blue-500"}>
          <SideMenu />
        </div>
        <div className={"lg:hidden fixed bottom-0 w-full max-w-3xl bg-red-500"}>
          <FixedMenu />
        </div>
      </div>
    </div>
  );
};
