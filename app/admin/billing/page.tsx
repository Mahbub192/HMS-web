"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

// Sample billing data
const sampleBills = [
  {
    patientId: "P-10254",
    patientName: "Liam Johnson",
    billNumber: "B-78901",
    totalAmount: 550.0,
    dueAmount: 0.0,
    status: "Paid",
    statusColor: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    date: "2023-10-25",
  },
  {
    patientId: "P-10255",
    patientName: "Olivia Smith",
    billNumber: "B-78902",
    totalAmount: 1230.75,
    dueAmount: 1230.75,
    status: "Pending",
    statusColor: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
    date: "2023-10-25",
  },
  {
    patientId: "P-10256",
    patientName: "Noah Williams",
    billNumber: "B-78903",
    totalAmount: 85.0,
    dueAmount: 85.0,
    status: "Overdue",
    statusColor: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
    date: "2023-09-15",
  },
  {
    patientId: "P-10257",
    patientName: "Emma Brown",
    billNumber: "B-78904",
    totalAmount: 2100.0,
    dueAmount: 500.0,
    status: "Pending",
    statusColor: "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
    date: "2023-10-24",
  },
  {
    patientId: "P-10258",
    patientName: "James Jones",
    billNumber: "B-78905",
    totalAmount: 320.5,
    dueAmount: 0.0,
    status: "Paid",
    statusColor: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    date: "2023-10-23",
  },
];

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState<"OPD" | "IPD">("OPD");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [dateFilter, setDateFilter] = useState("");

  const filteredBills = sampleBills.filter((bill) => {
    const matchesSearch =
      bill.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.billNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Statuses" || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Heading */}
            <header className="flex flex-wrap justify-between items-start gap-4 mb-6">
              <div className="flex flex-col gap-2">
                <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  OPD / IPD Billing Management
                </h1>
                <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                  Manage all patient invoices and payments in one place.
                </p>
              </div>
              <Link
                href="/admin/billing/create"
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90"
              >
                <span className="truncate">Create New Bill</span>
              </Link>
            </header>

            {/* Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c25] border border-[#dbe6e2] dark:border-[#2a3f38]">
                <p className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                  Total Outstanding
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  $125,430.50
                </p>
                <p className="text-[#07882e] dark:text-green-400 text-base font-medium leading-normal">
                  +2.5%
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c25] border border-[#dbe6e2] dark:border-[#2a3f38]">
                <p className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                  Bills Generated Today
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  82
                </p>
                <p className="text-[#e72e08] dark:text-red-400 text-base font-medium leading-normal">
                  -5.2%
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-[#182c25] border border-[#dbe6e2] dark:border-[#2a3f38]">
                <p className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                  Payments Received Today
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  $15,210.00
                </p>
                <p className="text-[#07882e] dark:text-green-400 text-base font-medium leading-normal">
                  +15.8%
                </p>
              </div>
            </section>

            {/* Main Content Card */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                <div className="flex px-6 gap-8">
                  <button
                    onClick={() => setActiveTab("OPD")}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === "OPD"
                        ? "border-primary text-[#111816] dark:text-white"
                        : "border-b-transparent text-[#61897c] dark:text-gray-400 hover:text-[#111816] dark:hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                      OPD Billing
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("IPD")}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === "IPD"
                        ? "border-primary text-[#111816] dark:text-white"
                        : "border-b-transparent text-[#61897c] dark:text-gray-400 hover:text-[#111816] dark:hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                      IPD Billing
                    </p>
                  </button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2">
                    <label className="flex flex-col w-full">
                      <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
                        <div className="text-[#61897c] dark:text-gray-400 flex bg-[#f0f4f3] dark:bg-[#2a3f38] items-center justify-center pl-4 rounded-l-lg">
                          <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset border-none bg-[#f0f4f3] dark:bg-[#2a3f38] h-full placeholder:text-[#61897c] dark:placeholder:text-gray-500 px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
                          placeholder="Search by Patient Name, ID, Bill #"
                        />
                      </div>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="form-select w-full h-12 rounded-lg text-[#111816] dark:text-white bg-[#f0f4f3] dark:bg-[#2a3f38] border-none focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset text-base font-normal"
                    >
                      <option>All Statuses</option>
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Overdue</option>
                    </select>
                    <input
                      type="date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="form-input w-full h-12 rounded-lg text-[#111816] dark:text-white bg-[#f0f4f3] dark:bg-[#2a3f38] border-none focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset text-base font-normal"
                    />
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                    <tr className="text-sm font-semibold text-[#61897c] dark:text-gray-400">
                      <th className="px-6 py-4">Patient ID</th>
                      <th className="px-6 py-4">Patient Name</th>
                      <th className="px-6 py-4">Bill #</th>
                      <th className="px-6 py-4 text-right">Total Amount</th>
                      <th className="px-6 py-4 text-right">Due Amount</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                    {filteredBills.map((bill, index) => (
                      <tr
                        key={index}
                        className="text-[#111816] dark:text-white text-sm hover:bg-black/5 dark:hover:bg-white/5"
                      >
                        <td className="px-6 py-4 font-mono">{bill.patientId}</td>
                        <td className="px-6 py-4 font-medium">{bill.patientName}</td>
                        <td className="px-6 py-4 font-mono">{bill.billNumber}</td>
                        <td className="px-6 py-4 text-right font-medium">
                          ${bill.totalAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-right font-medium">
                          ${bill.dueAmount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bill.statusColor}`}
                          >
                            {bill.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{bill.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/billing/${bill.billNumber}`}
                              className="text-[#61897c] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                            >
                              <span className="material-symbols-outlined">visibility</span>
                            </Link>
                            <button className="text-[#61897c] dark:text-gray-400 hover:text-primary dark:hover:text-primary">
                              <span className="material-symbols-outlined">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between p-6 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                <p className="text-sm text-[#61897c] dark:text-gray-400">
                  Showing 1 to {filteredBills.length} of {filteredBills.length} results
                </p>
                <div className="flex items-center gap-2">
                  <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined text-xl">chevron_left</span>
                  </button>
                  <button className="flex items-center justify-center size-9 rounded-lg border border-primary text-primary bg-primary/20 dark:bg-primary/30 font-bold">
                    1
                  </button>
                  <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                    2
                  </button>
                  <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                    3
                  </button>
                  <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                    <span className="material-symbols-outlined text-xl">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
