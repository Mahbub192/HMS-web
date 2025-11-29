"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function PatientsPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-1 mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                Patients
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Manage patient records and information.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href="/admin/patients/profile"
                className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      person
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                      Patient Profile
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      View and manage patient profiles
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/patients/queue"
                className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      queue
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                      Patient Queue
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Manage patient waiting queue
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/patients/history"
                className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      history
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                      Patient History
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      View patient medical history
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
