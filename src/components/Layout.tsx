import { useRouter } from "next/dist/client/router";
import type { ReactNode } from "react";
import { useContext } from "react";
import { FixedMenu } from "src/components/FixedMenu";
import { Login } from "src/components/Login";
import { SideMenu } from "src/components/SideMenu";
import { UserContext } from "src/contexts/UserContext";

export const Layout = (props: { children: ReactNode }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  if (
    user.name == "" &&
    router.pathname !== "/mypage" &&
    !loading &&
    user.id !== ""
  ) {
    router.push("/mypage");
  }
  return (
    <div className="min-h-screen bg-black">
      <div className="lg:grid lg:grid-cols-12 mx-auto max-w-3xl lg:max-w-6xl">
        <div className="hidden lg:block col-span-3 text-gray-300">
          <SideMenu />
        </div>
        <div className="lg:col-span-9 min-h-screen text-white border-r border-l border-gray-600">
          {loading && (
            <div className="flex fixed justify-center items-center w-full h-screen">
              <div className="w-8 h-8 rounded-full border-t-4 border-green-500 animate-spin" />
            </div>
          )}
          {user.id == "" && !loading && <Login />}
          {!loading && props.children}
        </div>
        <div className="lg:hidden fixed bottom-0 w-full max-w-3xl h-14 md:h-16 text-gray-300 bg-black border-t border-r border-l border-gray-600">
          <FixedMenu />
        </div>
        <div className="lg:hidden h-14 md:h-16"></div>
      </div>
    </div>
  );
};
