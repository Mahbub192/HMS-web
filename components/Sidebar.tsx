"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  userType?: "admin" | "doctor" | "receptionist";
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

export default function Sidebar({
  userType = "admin",
  userName,
  userRole,
  userAvatar,
}: SidebarProps) {
  const pathname = usePathname();

  const adminMenuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
    { icon: "group", label: "Patients", href: "/admin/patients" },
    { icon: "stethoscope", label: "Doctors", href: "/admin/doctors" },
    {
      icon: "calendar_month",
      label: "Appointments",
      href: "/admin/appointments",
    },
    {
      icon: "receipt_long",
      label: "Billing & Invoices",
      href: "/admin/billing",
    },
  ];

  const doctorMenuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/doctor/dashboard" },
    { icon: "group", label: "Patients", href: "/doctor/patients" },
    { icon: "calendar_month", label: "Calendar", href: "/doctor/calendar" },
    { icon: "mail", label: "Messages", href: "/doctor/messages" },
    { icon: "settings", label: "Settings", href: "/doctor/settings" },
  ];

  const menuItems = userType === "admin" ? adminMenuItems : doctorMenuItems;

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="flex w-64 flex-col bg-white dark:bg-black/20 p-4 border-r border-gray-200 dark:border-gray-800">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {userType === "admin" ? (
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 relative overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo3_3POklnyAhdSPCiP0fVOT0oK3a6DpXGvwVUYcO50E6BkCrbkp1rnfSKQh_Dwxr8F3V_a1_dsPxKzJaEKQF9pHB0hr45g8bSOql68ajkAnBkXxmtp7W4zaANLD96EIl6vqmN1Pv4ESiRVW1juXmcxJYEXompulNclRAdYbuMKGIWigeaELyhow18aDBbO7Zp7zUTCqjy8Ko4_bPoNe4j4i9iljpzLKE0h4PI1H_QlsWOY8QZm8k7NoI7OBO96dgOyhhbhYfvdEng"
                alt="Hospital Management System Logo"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center size-8 bg-primary rounded-lg text-black">
              <span className="material-symbols-outlined text-lg">
                health_and_safety
              </span>
            </div>
          )}
          <div className="flex flex-col">
            <h1 className="text-[#111816] dark:text-white text-base font-bold leading-normal">
              {userType === "admin" ? "HMS" : "HMS Portal"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
              {userType === "admin" ? "Hospital Management" : ""}
            </p>
          </div>
        </div>

        {userName && userRole && (
          <div className="flex gap-3 mt-4">
            {userAvatar ? (
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 relative overflow-hidden">
                <Image
                  src={userAvatar}
                  alt={userName}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="size-10 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">
                  person
                </span>
              </div>
            )}
            <div className="flex flex-col">
              <h1 className="text-[#111816] text-base font-medium leading-normal dark:text-gray-100">
                {userName}
              </h1>
              <p className="text-[#61897c] text-sm font-normal leading-normal dark:text-gray-400">
                {userRole}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                isActive(item.href)
                  ? "bg-primary/20 text-[#111816] dark:text-white"
                  : "hover:bg-primary/10"
              }`}
            >
              <span
                className={`material-symbols-outlined text-[#111816] dark:text-gray-300 ${
                  isActive(item.href) ? "fill" : ""
                }`}
                style={
                  isActive(item.href)
                    ? { fontVariationSettings: "'FILL' 1, 'wght' 400" }
                    : { fontVariationSettings: "'FILL' 0, 'wght' 400" }
                }
              >
                {item.icon}
              </span>
              <p
                className={`text-sm leading-normal ${
                  isActive(item.href)
                    ? "font-bold text-[#111816] dark:text-white"
                    : "font-medium text-[#111816] dark:text-gray-300"
                }`}
              >
                {item.label}
              </p>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto flex flex-col gap-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10"
        >
          <span className="material-symbols-outlined text-[#111816] dark:text-gray-300">
            settings
          </span>
          <p className="text-sm font-medium leading-normal text-[#111816] dark:text-gray-300">
            Settings
          </p>
        </Link>
        {userType === "admin" && (
          <Link
            href="/admin/reports"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10"
          >
            <span className="material-symbols-outlined text-[#111816] dark:text-gray-300">
              assessment
            </span>
            <p className="text-sm font-medium leading-normal text-[#111816] dark:text-gray-300">
              Reports
            </p>
          </Link>
        )}
        <Link
          href="/login"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10"
        >
          <span className="material-symbols-outlined text-[#111816] dark:text-gray-300">
            logout
          </span>
          <p className="text-sm font-medium leading-normal text-[#111816] dark:text-gray-300">
            Logout
          </p>
        </Link>
      </div>
    </aside>
  );
}
