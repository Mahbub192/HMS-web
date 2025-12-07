"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function PrintPreviousPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/modules/diagnosis"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Diagnosis
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Print Previous
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                PRINT PREVIOUS
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Access and print previous invoices and reports.
              </p>
            </header>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/modules/diagnosis/print-previous/invoice-details"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      receipt
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                    Invoice details
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  View and print invoice details
                </p>
              </Link>

              <Link
                href="/modules/diagnosis/print-previous/income-report"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      assessment
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                    Income Report
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  View and print income reports
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

