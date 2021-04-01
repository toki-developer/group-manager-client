import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { MENU } from "src/utils/constants/menu";

export const SideMenu = () => {
  const router = useRouter();
  return (
    <nav>
      {MENU.map((item) => {
        const isActive = item.href === router.pathname;
        return (
          <Link key={item.label} href={item.href}>
            <a>
              <svg
                className="text-white flex-shrink-0 -ml-1 mr-3 h-6 w-6"
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
  );
};
