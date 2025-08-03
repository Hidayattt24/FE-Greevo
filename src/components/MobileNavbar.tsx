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
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
      >
        <path d="M180-120q-25 0-42.5-17.5T120-180v-76l160-142v278H180Zm140 0v-160h320v160H320Zm360 0v-328L509-600l121-107 190 169q10 9 15 20.5t5 24.5v313q0 25-17.5 42.5T780-120H680ZM120-310v-183q0-13 5-25t15-20l300-266q8-8 18.5-11.5T480-819q11 0 21.5 3.5T520-804l80 71-480 423Z" />
      </svg>
    ),
  },
  {
    id: "activity-sharing",
    label: "Share",
    path: "/pages/activity-sharing",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
      >
        <path d="M280-240v120-720 600Zm200-480q17 0 28.5-11.5T520-760q0-17-11.5-28.5T480-800q-17 0-28.5 11.5T440-760q0 17 11.5 28.5T480-720Zm200 480h80v120q0 33-23.5 56.5T680-40H280q-33 0-56.5-23.5T200-120v-720q0-33 23.5-56.5T280-920h400q33 0 56.5 23.5T760-840v120h-80v-120H280v720h400v-120Zm-100-80q-25 0-42.5-17.5T520-380v-160q0-25 17.5-42.5T580-600h40l40-40h80l40 40h40q25 0 42.5 17.5T880-540v160q0 25-17.5 42.5T820-320H580Zm120-70q29 0 49.5-20.5T770-460q0-29-20.5-49.5T700-530q-29 0-49.5 20.5T630-460q0 29 20.5 49.5T700-390Z" />
      </svg>
    ),
  },
  {
    id: "trash-scanner",
    label: "Scan",
    path: "/pages/trash-scanner",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
      >
        <path d="M80-720v-200h200v80H160v120H80Zm720 0v-120H680v-80h200v200h-80ZM80-40v-200h80v120h120v80H80Zm600 0v-80h120v-120h80v200H680ZM280-240h400v-480H280v480Zm0 80q-33 0-56.5-23.5T200-240v-480q0-33 23.5-56.5T280-800h400q33 0 56.5 23.5T760-720v480q0 33-23.5 56.5T680-160H280Zm80-400h240v-80H360v80Zm0 120h240v-80H360v80Zm0 120h240v-80H360v80Zm-80 80v-480 480Z" />
      </svg>
    ),
  },
  {
    id: "chatbot",
    label: "Chat",
    path: "/pages/chatbot",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
      >
        <path d="M216-176q-45-45-70.5-104T120-402q0-63 24-124.5T222-642q35-35 86.5-60t122-39.5Q501-756 591.5-759t202.5 7q8 106 5 195t-16.5 160.5q-13.5 71.5-38 125T684-182q-53 53-112.5 77.5T450-80q-65 0-127-25.5T216-176Zm112-16q29 17 59.5 24.5T450-160q46 0 91-18.5t86-59.5q18-18 36.5-50.5t32-85Q709-426 716-500.5t2-177.5q-49-2-110.5-1.5T485-670q-61 9-116 29t-90 55q-45 45-62 89t-17 85q0 59 22.5 103.5T262-246q42-80 111-153.5T534-520q-72 63-125.5 142.5T328-192Zm0 0Zm0 0Z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    path: "/pages/profile",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 -960 960 960"
        width="20px"
        fill="currentColor"
      >
        <path d="M460-280q75 0 127.5-52.5T640-460v-180H460q-75 0-127.5 52.5T280-460q0 26 7 50t21 46l-16 16q-11 11-11 28t11 28q11 11 28 11t28-11l16-16q22 14 46 21t50 7Zm0-80q-9 0-18-2t-18-5l84-85q11-11 11-28t-11-28q-11-11-28-11t-28 11l-85 84q-3-9-5-18t-2-18q0-42 29-71t71-29h100v100q0 42-29 71t-71 29Zm20 320L342-148l-173-21-21-173L40-480l108-138 21-173 173-21 138-108 138 108 173 21 21 173 108 138-108 138-21 173-173 21L480-40Zm0-102 106-82 134-17 16-133 82-106-82-106-17-133-133-17-106-82-106 82-134 17-16 133-82 106 82 106 17 134 133 16 106 82Zm0-338Zm0 0Z" />
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
