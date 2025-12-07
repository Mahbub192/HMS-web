"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

export default function DiagnosisBillingPage() {
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
                Billing Information
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                BILLING INFORMATION
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Manage diagnosis-related billing and invoices.
              </p>
            </header>

            {/* Quick Access Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link
                href="/modules/diagnosis/billing/invoice"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      receipt
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                    Invoice
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  Create and manage invoices
                </p>
              </Link>

              <Link
                href="/modules/diagnosis/billing/hc-invoice"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      description
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                    HC-Invoice
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  Health card invoices
                </p>
              </Link>

              <Link
                href="/modules/diagnosis/billing/refund"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      money_off
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                    Refund
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  Process refunds
                </p>
              </Link>

              <Link
                href="/modules/diagnosis/billing/due-collection"
                className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      account_balance_wallet
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                    Due Collection
                  </h3>
                </div>
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  Collect outstanding dues
                </p>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

