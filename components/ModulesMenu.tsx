"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Module {
  id: string;
  name: string;
  icon: string;
  href: string;
}

export default function ModulesMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const modules: Module[] = [
    {
      id: "registration",
      name: "Registration",
      icon: "description",
      href: "/modules/registration",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: "dashboard",
      href: "/admin/dashboard",
    },
    {
      id: "hospital",
      name: "Hospital",
      icon: "local_hospital",
      href: "/modules/hospital",
    },
    {
      id: "diagnosis",
      name: "Diagnosis",
      icon: "medical_services",
      href: "/modules/diagnosis",
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: "emergency",
      href: "/modules/emergency",
    },
    {
      id: "opd-service",
      name: "OPDService",
      icon: "medical_information",
      href: "/modules/opd-service",
    },
    {
      id: "dialysis",
      name: "Dialysis",
      icon: "healing",
      href: "/modules/dialysis",
    },
    {
      id: "hr-management",
      name: "HR Management",
      icon: "groups",
      href: "/modules/hr-management",
    },
    {
      id: "settings",
      name: "Settings",
      icon: "settings",
      href: "/modules/settings",
    },
    {
      id: "doctor-management",
      name: "Doctor Management",
      icon: "person",
      href: "/admin/doctors",
    },
    {
      id: "asset-management",
      name: "Asset Management",
      icon: "inventory_2",
      href: "/modules/asset-management",
    },
    {
      id: "security-option",
      name: "Security Option",
      icon: "security",
      href: "/modules/security",
    },
  ];

  return (
    <div className="relative">
      {/* Modules Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
      >
        <span className="material-symbols-outlined text-[#111816] dark:text-gray-300">
          apps
        </span>
        <span className="text-sm font-medium text-[#111816] dark:text-gray-300 hidden md:inline">
          Modules
        </span>
      </button>

      {/* Modules Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu - Positioned more to the left */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 max-h-[600px] overflow-y-auto" style={{ transform: 'translateX(calc(-100% + 120px))' }}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">
                    apps
                  </span>
                  <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                    Modules
                  </h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-xl">
                    close
                  </span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {modules.map((module) => {
                  const isActive = pathname === module.href;
                  return (
                    <Link
                      key={module.id}
                      href={module.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                        isActive
                          ? "border-primary bg-primary/10 shadow-md"
                          : "border-gray-200 dark:border-gray-700 hover:border-primary/50 bg-white dark:bg-gray-700/30"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg mb-2 ${
                          isActive
                            ? "bg-primary/20"
                            : "bg-gray-100 dark:bg-gray-600"
                        }`}
                      >
                        <span
                          className={`material-symbols-outlined text-2xl ${
                            isActive
                              ? "text-primary fill"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                          style={
                            isActive
                              ? {
                                  fontVariationSettings:
                                    '"FILL" 1, "wght" 400, "GRAD" 0, "opsz" 24',
                                }
                              : {
                                  fontVariationSettings:
                                    '"FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24',
                                }
                          }
                        >
                          {module.icon}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-medium text-center leading-tight ${
                          isActive
                            ? "text-primary font-bold"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {module.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

