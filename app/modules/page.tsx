"use client";

import Link from "next/link";
import { useState } from "react";

interface Module {
  id: string;
  name: string;
  icon: string;
  href: string;
  color?: string;
}

export default function ModulesPage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const modules: Module[] = [
    {
      id: "registration",
      name: "Registration",
      icon: "description",
      href: "/modules/registration",
      color: "bg-blue-50 hover:bg-blue-100",
    },
    {
      id: "dashboard",
      name: "Dashboard",
      icon: "dashboard",
      href: "/admin/dashboard",
      color: "bg-green-50 hover:bg-green-100",
    },
    {
      id: "hospital",
      name: "Hospital",
      icon: "local_hospital",
      href: "/modules/hospital",
      color: "bg-red-50 hover:bg-red-100",
    },
    {
      id: "diagnosis",
      name: "Diagnosis",
      icon: "medical_services",
      href: "/modules/diagnosis",
      color: "bg-purple-50 hover:bg-purple-100",
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: "emergency",
      href: "/modules/emergency",
      color: "bg-red-50 hover:bg-red-100",
    },
    {
      id: "opd-service",
      name: "OPDService",
      icon: "medical_information",
      href: "/modules/opd-service",
      color: "bg-cyan-50 hover:bg-cyan-100",
    },
    {
      id: "dialysis",
      name: "Dialysis",
      icon: "healing",
      href: "/modules/dialysis",
      color: "bg-indigo-50 hover:bg-indigo-100",
    },
    {
      id: "hr-management",
      name: "HR Management",
      icon: "groups",
      href: "/modules/hr-management",
      color: "bg-orange-50 hover:bg-orange-100",
    },
    {
      id: "settings",
      name: "Settings",
      icon: "settings",
      href: "/modules/settings",
      color: "bg-gray-50 hover:bg-gray-100",
    },
    {
      id: "doctor-management",
      name: "Doctor Management",
      icon: "person",
      href: "/admin/doctors",
      color: "bg-teal-50 hover:bg-teal-100",
    },
    {
      id: "asset-management",
      name: "Asset Management",
      icon: "inventory_2",
      href: "/modules/asset-management",
      color: "bg-yellow-50 hover:bg-yellow-100",
    },
    {
      id: "security-option",
      name: "Security Option",
      icon: "security",
      href: "/modules/security",
      color: "bg-blue-50 hover:bg-blue-100",
    },
  ];

  return (
    <div className="min-h-screen bg-very-light-grey p-8">
      {/* Header */}
      <header className="flex items-center justify-between mb-8 bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-primary text-2xl">
            health_and_safety
          </span>
          <h1 className="text-2xl font-bold text-dark-grey">Hospital Management System</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">notifications</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">apps</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">fullscreen</span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">dark_mode</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100">
            <span className="material-symbols-outlined text-gray-600">account_circle</span>
            <span className="text-sm font-medium text-gray-700">mahbub</span>
          </div>
        </div>
      </header>

      {/* Modules Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl border-2 border-primary p-8 shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {modules.map((module) => (
              <Link
                key={module.id}
                href={module.href}
                onClick={() => setSelectedModule(module.id)}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedModule === module.id
                    ? "border-primary border-dashed bg-primary/5"
                    : "border-gray-200 hover:border-primary/50 bg-white"
                } ${module.color || ""}`}
              >
                <div
                  className={`p-4 rounded-full mb-4 ${
                    selectedModule === module.id
                      ? "bg-primary/20"
                      : "bg-gray-100"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-4xl ${
                      selectedModule === module.id
                        ? "text-primary fill"
                        : "text-gray-600"
                    }`}
                    style={
                      selectedModule === module.id
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
                  className={`text-sm font-medium text-center ${
                    selectedModule === module.id
                      ? "text-primary font-bold"
                      : "text-gray-700"
                  }`}
                >
                  {module.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

