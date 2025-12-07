"use client";

import { getActiveModule, moduleMenus } from "@/utils/moduleMenus";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  userType?: "admin" | "doctor" | "receptionist";
  userName?: string;
  userRole?: string;
  userAvatar?: string;
}

interface MenuItem {
  icon: string;
  label: string;
  href: string;
  subItems?: { icon: string; label: string; href: string; subItems?: { icon: string; label: string; href: string }[] }[];
}

export default function Sidebar({
  userType = "admin",
  userName,
  userRole,
  userAvatar,
}: SidebarProps) {
  const pathname = usePathname();
  const activeModule = getActiveModule(pathname);

  const adminMenuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/admin/dashboard" },
    {
      icon: "group",
      label: "Patients",
      href: "/admin/patients",
      subItems: [
        // { icon: "person", label: "Profile", href: "/admin/patients/profile" },
        { icon: "queue", label: "Queue", href: "/admin/patients/queue" },
        // { icon: "history", label: "History", href: "/admin/patients/history" },
      ],
    },
    { icon: "stethoscope", label: "Doctors", href: "/admin/doctors" },
    {
      icon: "calendar_month",
      label: "Appointments",
      href: "/admin/appointments",
      subItems: [
        { icon: "add", label: "Create", href: "/admin/appointments/create" },
        {
          icon: "event_available",
          label: "Status",
          href: "/admin/appointments/status",
        },
      ],
    },
    {
      icon: "receipt_long",
      label: "Billing & Invoices",
      href: "/admin/billing",
    },
    {
      icon: "local_pharmacy",
      label: "Pharmacy",
      href: "/pharmacy/billing",
    },
    {
      icon: "science",
      label: "Lab",
      href: "/lab/dashboard",
    },
    {
      icon: "bed",
      label: "Bed Management",
      href: "/admin/beds/availability",
    },
  ];

  const doctorMenuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/doctor/dashboard" },
    { icon: "group", label: "Patients", href: "/doctor/patients" },
    { icon: "calendar_month", label: "Calendar", href: "/doctor/calendar" },
    { icon: "mail", label: "Messages", href: "/doctor/messages" },
    { icon: "settings", label: "Settings", href: "/doctor/settings" },
  ];

  const receptionistMenuItems = [
    { icon: "dashboard", label: "Dashboard", href: "/receptionist/dashboard" },
    { icon: "group", label: "Patients", href: "/receptionist/patients" },
    {
      icon: "calendar_month",
      label: "Appointments",
      href: "/receptionist/appointments",
    },
    { icon: "credit_card", label: "Billing", href: "/receptionist/billing" },
    { icon: "bar_chart", label: "Reports", href: "/receptionist/reports" },
  ];

  // Use module-specific menu if in a module route, otherwise use role-based menu
  const menuItems = activeModule
    ? moduleMenus[activeModule] || adminMenuItems
    : userType === "admin"
    ? adminMenuItems
    : userType === "doctor"
    ? doctorMenuItems
    : receptionistMenuItems;

  const isActive = (href: string) => {
    if (pathname === href) return true;
    // Check if pathname starts with href (for parent routes)
    if (pathname.startsWith(href + "/")) return true;
    return false;
  };

  const isParentActive = (item: MenuItem) => {
    if (item.href === pathname) return true;
    if (pathname.startsWith(item.href + "/")) return true;
    // Check if any sub-item is active
    if (item.subItems) {
      return item.subItems.some((sub) => {
        const subActive = pathname === sub.href || pathname.startsWith(sub.href + "/");
        // Check if any nested sub-item is active
        if (sub.subItems) {
          const nestedActive = sub.subItems.some((nested) => pathname === nested.href || pathname.startsWith(nested.href + "/"));
          return subActive || nestedActive;
        }
        return subActive;
      });
    }
    return false;
  };

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
              {activeModule
                ? activeModule
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                : userType === "admin"
                ? "HMS"
                : "HMS Portal"}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
              {activeModule
                ? "Module Navigation"
                : userType === "admin"
                ? "Hospital Management"
                : ""}
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
          {menuItems.map((item) => {
            const menuItem = item as MenuItem;
            const hasSubItems =
              menuItem.subItems && menuItem.subItems.length > 0;
            const isItemActive = isParentActive(menuItem);

            return (
              <div key={menuItem.href} className="flex flex-col">
                <Link
                  href={menuItem.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
                    isItemActive
                      ? "bg-primary/20 text-[#111816] dark:text-white"
                      : "hover:bg-primary/10"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[#111816] dark:text-gray-300 ${
                      isItemActive ? "fill" : ""
                    }`}
                    style={
                      isItemActive
                        ? { fontVariationSettings: "'FILL' 1, 'wght' 400" }
                        : { fontVariationSettings: "'FILL' 0, 'wght' 400" }
                    }
                  >
                    {menuItem.icon}
                  </span>
                  <p
                    className={`text-sm leading-normal flex-1 ${
                      isItemActive
                        ? "font-bold text-[#111816] dark:text-white"
                        : "font-medium text-[#111816] dark:text-gray-300"
                    }`}
                  >
                    {menuItem.label}
                  </p>
                </Link>
                {hasSubItems && isItemActive && (
                  <div className="ml-4 mt-1 flex flex-col gap-1 border-l-2 border-primary/30 pl-3">
                    {menuItem.subItems!.map((subItem) => {
                      const hasNestedSubItems = subItem.subItems && subItem.subItems.length > 0;
                      const isSubItemActive = pathname === subItem.href || pathname.startsWith(subItem.href + "/");
                      const isSubItemParentActive = hasNestedSubItems && (isSubItemActive || subItem.subItems!.some((nested) => pathname === nested.href || pathname.startsWith(nested.href + "/")));

                      return (
                        <div key={subItem.href} className="flex flex-col">
                          <Link
                            href={subItem.href}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-xs ${
                              pathname === subItem.href
                                ? "bg-primary/10 text-primary font-semibold"
                                : isSubItemParentActive
                                ? "text-primary font-medium"
                                : "text-gray-600 dark:text-gray-400 hover:bg-primary/5"
                            }`}
                          >
                            <span className="material-symbols-outlined text-sm">
                              {subItem.icon}
                            </span>
                            <span className="flex-1">{subItem.label}</span>
                            {hasNestedSubItems && (
                              <span className="material-symbols-outlined text-xs">
                                {isSubItemParentActive ? "expand_more" : "chevron_right"}
                              </span>
                            )}
                          </Link>
                          {hasNestedSubItems && isSubItemParentActive && (
                            <div className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-primary/20 pl-2">
                              {subItem.subItems!.map((nestedItem) => (
                                <Link
                                  key={nestedItem.href}
                                  href={nestedItem.href}
                                  className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs ${
                                    pathname === nestedItem.href
                                      ? "bg-primary/10 text-primary font-semibold"
                                      : "text-gray-500 dark:text-gray-500 hover:bg-primary/5"
                                  }`}
                                >
                                  <span className="material-symbols-outlined text-xs">
                                    {nestedItem.icon}
                                  </span>
                                  <span>{nestedItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
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
