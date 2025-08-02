"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface MobileNavbarProps {
  className?: string;
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Home",
    path: "/pages/dashboard",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "activity-sharing",
    label: "Share",
    path: "/pages/activity-sharing",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    id: "trash-scanner",
    label: "Scan",
    path: "/pages/trash-scanner",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5 3C8.7 3 8 3.7 8 4.5v15c0 .8.7 1.5 1.5 1.5h5c.8 0 1.5-.7 1.5-1.5v-15c0-.8-.7-1.5-1.5-1.5h-5zM11 5h2v1h-2V5zm-1 3h4v9h-4V8z"
          fill="currentColor"
        />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "chatbot",
    label: "Chat",
    path: "/pages/chatbot",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 11.5C21.0034 12.8199 20.6951 14.1219 20.1 15.3C19.3944 16.7118 18.3098 17.8992 16.9674 18.7293C15.6251 19.5594 14.0782 19.9994 12.5 20C11.1801 20.0035 9.87812 19.6951 8.7 19.1L3 21L4.9 15.3C4.30493 14.1219 3.99656 12.8199 4 11.5C4.00061 9.92179 4.44061 8.37488 5.27072 7.03258C6.10083 5.69028 7.28825 4.6056 8.7 3.90003C9.87812 3.30496 11.1801 2.99659 12.5 3.00003H13C15.0843 3.11502 17.053 3.99479 18.5291 5.47089C20.0052 6.94699 20.885 8.91568 21 11V11.5Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    path: "/pages/profile",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export default function MobileNavbar({ className }: MobileNavbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 safe-area-bottom",
        className
      )}
    >
      <nav
        className="mx-auto max-w-sm bg-white/95 backdrop-blur-xl rounded-full shadow-2xl border border-gray-200/30"
        style={{
          boxShadow:
            "0 20px 60px rgba(0, 0, 0, 0.12), 0 8px 24px rgba(0, 0, 0, 0.08)",
        }}
      >
        <div className="flex items-center justify-between px-3 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.path)}
                className={cn(
                  "relative flex flex-col items-center justify-center transition-all duration-500 ease-out group",
                  "min-w-[56px] h-[56px] rounded-full overflow-hidden",
                  isActive
                    ? "text-white transform scale-110 shadow-xl"
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100/80 hover:scale-105"
                )}
                style={{
                  transformOrigin: "center center",
                  backgroundColor: isActive ? "#213813" : "transparent",
                }}
              >
                {/* Icon container */}
                <div
                  className={cn(
                    "relative z-10 flex flex-col items-center transition-all duration-300",
                    isActive ? "transform scale-105" : "transform scale-100"
                  )}
                >
                  <div className="mb-1">{item.icon}</div>

                  <span
                    className={cn(
                      "text-[10px] font-medium leading-none transition-all duration-300",
                      isActive
                        ? "text-white opacity-100 transform translate-y-0"
                        : "text-gray-400 opacity-80 transform translate-y-0"
                    )}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Hover effect */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gray-100 rounded-full transition-all duration-300 ease-out",
                    !isActive
                      ? "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                      : "opacity-0"
                  )}
                />

                {/* Active glow effect with green color */}
                {isActive && (
                  <div
                    className="absolute inset-0 rounded-full blur-xl opacity-25 scale-125 animate-pulse"
                    style={{
                      backgroundColor: "#213813",
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
