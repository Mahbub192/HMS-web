"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function IPDAdmissionPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/modules/hospital"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Hospital
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                IPD Admission
              </span>
            </div>
            <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-4">
              IPD Admission
            </h1>
            <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal mb-8">
              Admit patients to the Inpatient Department.
            </p>
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-8 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                person_add
              </span>
              <p className="text-[#61897c] dark:text-gray-400">IPD Admission page coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

