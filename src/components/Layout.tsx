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
      <div className="max-w-3xl mx-auto lg:grid lg:max-w-6xl lg:grid-cols-12">
        <div className="hidden lg:block col-span-3 text-gray-300">
          <SideMenu />
        </div>
        <div className="lg:col-span-9 min-h-screen border-l border-r border-gray-600 text-white">
          {loading && (
            <div className="fixed w-full h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full border-t-4 border-green-500 h-8 w-8" />
            </div>
          )}
          {user.id == "" && !loading && <Login />}
          {!loading && props.children}
        </div>
        <div className="lg:hidden fixed bottom-0 w-full max-w-3xl bg-black border-l border-r border-t border-gray-600 text-gray-300 h-14 md:h-16">
          <FixedMenu />
        </div>
        <div className="lg:hidden h-14 md:h-16"></div>
      </div>
    </div>
  );
};
