import cc from "classcat";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { MENU } from "src/utils/constants/menu";

export const SideMenu = () => {
  const router = useRouter();
  return (
    <div className={"fixed top-0"}>
      <div className={" ml-7 my-10 text-xl"}>GroupManager</div>
      <nav>
        {MENU.map((item) => {
          const isActive = item.href === router.pathname;
          return (
            <Link key={item.label} href={item.href}>
              <a
                aria-current={isActive ? "page" : "false"}
                className={cc([
                  "group flex w-auto items-center my-4 py-2 text-xl font-bold rounded-full hover:bg-green-600 hover:bg-opacity-25 hover:text-green-500",
                  {
                    ["text-green-500"]: isActive,
                  },
                ])}
              >
                <svg
                  className="text-current flex-shrink-0 ml-7 mr-4 h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
