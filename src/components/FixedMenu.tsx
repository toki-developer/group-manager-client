import cc from "classcat";
import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { MENU } from "src/utils/constants/menu";

export const FixedMenu = () => {
  const router = useRouter();
  return (
    <nav className={" flex justify-around"}>
      {MENU.map((item) => {
        const isActive = item.href == router.pathname;
        return (
          <Link key={item.label} href={item.href}>
            <a>
              <svg
                className={cc([
                  "flex-shrink-0 my-3 h-7 w-7 md:my-4 md:h-8 md:w-8",
                  {
                    ["text-green-500"]: isActive,
                  },
                ])}
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
            </a>
          </Link>
        );
      })}
    </nav>
  );
};
