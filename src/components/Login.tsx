import Link from "next/link";

//後で作る
export const Login = () => {
  return (
    <>
      <div className="flex fixed left-0 z-10 justify-center items-center w-full h-screen text-black bg-white">
        <div>
          <p>GroupManager</p>
          <div className="h-7"></div>
          <div className="py-2 px-14 mx-auto w-64 h-10 font-semibold text-center text-white bg-green-500 rounded-full text-white-500">
            <Link href="/api/auth/login">ログインまたは登録</Link>
          </div>
          <div className="h-7"></div>
          <p className="text-sm">ログインするとご利用できます。</p>
        </div>
      </div>
    </>
  );
};
