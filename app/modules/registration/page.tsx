"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function RegistrationPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex flex-col gap-1 mb-6">
            <h1 className="text-[#111816] dark:text-white text-3xl font-bold leading-tight tracking-tight">
              Registration
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              Patient registration and management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-2">New Registration</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Register a new patient
              </p>
            </div>
            <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-2">Registered Patients</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                View all registered patients
              </p>
            </div>
            <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
              <h3 className="text-lg font-semibold mb-2">Registration History</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                View registration history
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

