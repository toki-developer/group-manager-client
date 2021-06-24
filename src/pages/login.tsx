import Link from "next/link";

//後で作る 今は使ってない
const LoginPage = () => {
  return (
    <>
      <div className="flex fixed left-0 z-20 justify-center items-center w-full h-screen text-black bg-white">
        <div>
          <p>GroupManager</p>
          <div className="h-7"></div>
          <div className="py-2 px-14 mx-auto w-64 h-10 font-semibold text-center text-white bg-green-500 rounded-full ">
            <Link href="/api/auth/login">ログインまたは登録</Link>
          </div>
          <div className="h-7"></div>
          <p className="text-sm">ログインするとご利用できます。</p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
