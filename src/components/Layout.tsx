import { useRouter } from "next/dist/client/router";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import toast from "react-hot-toast";
import { FixedMenu } from "src/components/FixedMenu";
import { Login } from "src/components/Login";
import { SideMenu } from "src/components/SideMenu";
import { UserContext } from "src/contexts/UserContext";

export const Layout = (props: { children: ReactNode }) => {
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (
      user.name == "" &&
      router.pathname !== "/mypage" &&
      !loading &&
      user.id !== ""
    ) {
      toast("プロフィールを入力してください");
      router.push("/mypage");
    }
  }, [router, loading, user]);

  return (
    <div className="min-h-screen bg-black">
      <div className="lg:grid lg:grid-cols-12 mx-auto max-w-3xl lg:max-w-6xl">
        <div className="hidden lg:block col-span-3 text-gray-300">
          <SideMenu />
        </div>
        <div className="lg:col-span-9 min-h-screen text-white border-r border-l border-gray-600">
          {loading && (
            <div className="flex fixed justify-center items-center w-full h-screen">
              <svg
                className="mr-3 -ml-1 w-5 h-5 text-green-500 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}
          {user.id == "" && !loading && <Login />}
          {!loading && props.children}
          <div className="lg:hidden h-14 md:h-16" />
        </div>
        <div className="lg:hidden fixed bottom-0 w-full max-w-3xl h-14 md:h-16 text-gray-300 bg-black border-t border-r border-l border-gray-600">
          <FixedMenu />
        </div>
      </div>
    </div>
  );
};
