"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface BillingRecord {
  id: string;
  billNo: string;
  patientId: string;
  patientName: string;
  date: string;
  amount: number;
  status: "Paid" | "Pending" | "Partial" | "Overdue";
  type: "IPD" | "OPD" | "Medicine" | "Investigation" | "Other";
}

export default function BillingInformationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");
  const [selectedRecord, setSelectedRecord] = useState<BillingRecord | null>(null);

  const billingRecords: BillingRecord[] = [
    {
      id: "1",
      billNo: "BIL-2024-001",
      patientId: "P-10254",
      patientName: "Liam Johnson",
      date: "2024-01-20",
      amount: 15000,
      status: "Paid",
      type: "IPD",
    },
    {
      id: "2",
      billNo: "BIL-2024-002",
      patientId: "P-10255",
      patientName: "Olivia Smith",
      date: "2024-01-19",
      amount: 8500,
      status: "Pending",
      type: "OPD",
    },
    {
      id: "3",
      billNo: "BIL-2024-003",
      patientId: "P-10260",
      patientName: "Robert Taylor",
      date: "2024-01-18",
      amount: 3200,
      status: "Partial",
      type: "Medicine",
    },
    {
      id: "4",
      billNo: "BIL-2024-004",
      patientId: "P-10261",
      patientName: "Emily Davis",
      date: "2024-01-17",
      amount: 5500,
      status: "Paid",
      type: "Investigation",
    },
    {
      id: "5",
      billNo: "BIL-2024-005",
      patientId: "P-10270",
      patientName: "Michael Brown",
      date: "2024-01-16",
      amount: 12000,
      status: "Overdue",
      type: "IPD",
    },
  ];

  const filteredRecords = billingRecords.filter((record) => {
    const matchesSearch =
      record.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || record.status === filterStatus;
    const matchesType = filterType === "All" || record.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const stats = {
    total: billingRecords.length,
    paid: billingRecords.filter((r) => r.status === "Paid").length,
    pending: billingRecords.filter((r) => r.status === "Pending").length,
    totalAmount: billingRecords.reduce((sum, r) => sum + r.amount, 0),
    paidAmount: billingRecords
      .filter((r) => r.status === "Paid")
      .reduce((sum, r) => sum + r.amount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      case "Partial":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      case "Overdue":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "IPD":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300";
      case "OPD":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      case "Medicine":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "Investigation":
        return "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

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
                href="/modules/hospital"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Hospital
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <Link
                href="/modules/hospital/nurse"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Nurse Section
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
                View and manage patient billing information.
              </p>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Total Bills</p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Paid</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.paid}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Pending</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">
                  ৳{stats.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        search
                      </span>
                      <input
                        type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Bill No, Patient Name or ID..."
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 pl-10 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="All">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                      </div>
                          <div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="All">All Types</option>
                    <option value="IPD">IPD</option>
                    <option value="OPD">OPD</option>
                    <option value="Medicine">Medicine</option>
                    <option value="Investigation">Investigation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
                </div>

            {/* Billing Records Table */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                  <thead className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#111816] dark:text-white uppercase tracking-wider">
                        Bill No
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#111816] dark:text-white uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#111816] dark:text-white uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#111816] dark:text-white uppercase tracking-wider">
                        Type
                            </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#111816] dark:text-white uppercase tracking-wider">
                        Amount
                            </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#111816] dark:text-white uppercase tracking-wider">
                        Status
                            </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#111816] dark:text-white uppercase tracking-wider">
                        Actions
                            </th>
                          </tr>
                        </thead>
                  <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-[#61897c] dark:text-gray-400">
                          No billing records found
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors cursor-pointer"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111816] dark:text-white">
                            {record.billNo}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#111816] dark:text-white">
                              {record.patientName}
                            </div>
                            <div className="text-sm text-[#61897c] dark:text-gray-400">
                              {record.patientId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[#111816] dark:text-white">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getTypeColor(record.type)}`}>
                              {record.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#111816] dark:text-white">
                            ৳{record.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(record.status)}`}>
                              {record.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Link
                              href={`/admin/billing/${record.id}`}
                              className="text-primary hover:text-primary/80 font-medium"
                            >
                              View
                            </Link>
                              </td>
                            </tr>
                      ))
                    )}
                        </tbody>
                      </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
