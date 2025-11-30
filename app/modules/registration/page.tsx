"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function RegistrationPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Registration Module
                </h1>
                <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                  Patient registration and management.
                </p>
              </div>
              <Link
                href="/modules/registration/new"
                className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-6 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90"
              >
                <span className="material-symbols-outlined">person_add</span>
                <span className="truncate">New Registration</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/modules/registration/new"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-primary/20 dark:bg-primary/30 rounded-lg p-3">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      person_add
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                    New Registration
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-4">
                  Register a new patient with complete information including basic details, contact
                  information, insurance, and emergency contacts.
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>Start Registration</span>
                  <span className="material-symbols-outlined ml-1">arrow_forward</span>
                </div>
              </Link>

              <Link
                href="/admin/patients"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">
                      groups
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                    Registered Patients
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-4">
                  View and manage all registered patients in the system.
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>View Patients</span>
                  <span className="material-symbols-outlined ml-1">arrow_forward</span>
                </div>
              </Link>

              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
                      history
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                    Registration History
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-4">
                  View complete registration history and audit logs.
                </p>
                <div className="flex items-center text-gray-400 text-sm font-medium">
                  <span>Coming Soon</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Total Registered
                </p>
                <p className="text-3xl font-bold text-[#111816] dark:text-white">1,234</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">This Month</p>
                <p className="text-3xl font-bold text-[#111816] dark:text-white">87</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Today</p>
                <p className="text-3xl font-bold text-[#111816] dark:text-white">12</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Pending</p>
                <p className="text-3xl font-bold text-[#111816] dark:text-white">5</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

