"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";

const pageNames: Record<string, { title: string; icon: string; desc: string }> = {
  "advance-collection": { title: "Advance Collection", icon: "payments", desc: "Collect advance payments from patients." },
  "refund": { title: "Refund Amount", icon: "money_off", desc: "Process refunds for patients." },
  "bed-change": { title: "Bed Change", icon: "bed", desc: "Change patient bed assignments." },
  "discharge": { title: "Discharge", icon: "logout", desc: "Discharge patients from IPD." },
  "due-collection": { title: "IPD Due Collection", icon: "account_balance_wallet", desc: "Collect pending dues from patients." },
  "blocked-patient": { title: "Blocked Patient", icon: "block", desc: "Manage blocked patients." },
  "patient-transfer": { title: "Patient Transfer", icon: "transfer_within_a_station", desc: "Transfer patients between wards." },
  "bed-settlement": { title: "Bed Settlement", icon: "hotel", desc: "Settle bed charges and payments." },
  "approve-block": { title: "Approve Block Patient", icon: "check_circle", desc: "Approve blocked patient requests." },
};

export default function IPDPage() {
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const pageKey = pathname.split('/').pop() || '';
  const pageInfo = pageNames[pageKey] || { title: "IPD", icon: "info", desc: "IPD management page." };
  
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link href="/modules/hospital" className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400">Hospital</Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">{pageInfo.title}</span>
            </div>
            <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] mb-4">{pageInfo.title}</h1>
            <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal mb-8">{pageInfo.desc}</p>
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-8 text-center">
              <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">{pageInfo.icon}</span>
              <p className="text-[#61897c] dark:text-gray-400">{pageInfo.title} page coming soon...</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
