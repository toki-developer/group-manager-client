import Link from "next/link";

export const Login = () => {
  return (
    <>
      <div className="fixed left-0 w-full h-screen flex items-center justify-center bg-white z-10 text-black">
        <div>
          <p>GroupManager</p>
          <div className="h-7"></div>
          <div className="text-center text-white-500 font-semibold h-10 mx-auto py-2 px-14 bg-green-500 rounded-full w-64 text-white">
            <Link href="/api/auth/login">ログインまたは登録</Link>
          </div>
          <div className="h-7"></div>
          <p className="text-sm">ログインするとご利用できます。</p>
        </div>
      </div>
    </>
  );
};
