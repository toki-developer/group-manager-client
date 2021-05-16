import Link from "next/link";
import { EditProfileForm } from "src/components/EditProfileForm";

export const MyPage = () => {
  return (
    <>
      <EditProfileForm />
      {/* ↓後で消す */}
      <Link href="/api/auth/logout">ログアウト</Link>
    </>
  );
};
