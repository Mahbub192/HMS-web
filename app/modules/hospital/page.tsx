"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function HospitalPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            {/* Page Heading */}
            <div className="flex flex-col gap-1 mb-8">
              <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Hospital Module
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Hospital information, settings, and IPD management.
              </p>
            </div>

            {/* Hospital Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/modules/hospital/wards"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-3">
                    <span className="material-symbols-outlined text-blue-600 dark:text-blue-400 text-3xl">
                      bed
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111816] dark:text-white">Wards</h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  Manage hospital wards and bed allocation.
                </p>
              </Link>

              <Link
                href="/modules/hospital/lab-reports"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3">
                    <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-3xl">
                      science
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                    Lab Reports
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  View and manage laboratory test reports.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
