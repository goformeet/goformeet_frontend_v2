"use client";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { adminSidebarLinks } from "@/constants";

const Sidebar = () => {
  // Get admin details from cookies
  const admin = Cookies.get("admin") ? JSON.parse(Cookies.get("admin")!) : null;
  const pathname = usePathname();

  // Define links that should be enabled only for BDE
  const enabledLinksForBDE = ["/admin/hosts", "/admin/guests"];

  return (
    <aside className="py-8 px-10 min-w-[300px] sticky left-0 top-0 max-h-screen">
      <div>
        <Image
          src="/assets/images/goformeetNavLogo.svg"
          alt="logo"
          width={190}
          height={40}
        />
      </div>
      <ul className="mt-8">
        {adminSidebarLinks.map((link, index) => {
          const isActive = pathname === link.pathName;
          const isEnabled =
            admin?.type === "BDE"
              ? enabledLinksForBDE.includes(link.pathName)
              : true;

          return (
            <li
              key={index}
              className={`my-5 ${isActive ? "text-[#E03320] font-bold" : ""} ${
                !isEnabled ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              {isEnabled ? (
                <Link href={link.pathName}>{link.displayName}</Link>
              ) : (
                <span>{link.displayName}</span>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
