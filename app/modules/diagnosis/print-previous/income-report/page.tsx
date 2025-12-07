"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface IncomeRecord {
  id: string;
  date: string;
  invoiceNo: string;
  patientName: string;
  patientId: string;
  type: "Invoice" | "HC-Invoice" | "Refund" | "Due Collection";
  amount: number;
  paymentMethod: string;
}

export default function IncomeReportPage() {
  const [dateFrom, setDateFrom] = useState(new Date().toISOString().split("T")[0]);
  const [dateTo, setDateTo] = useState(new Date().toISOString().split("T")[0]);
  const [filterType, setFilterType] = useState<string>("All");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>("All");

  const incomeRecords: IncomeRecord[] = [
    {
      id: "1",
      date: "2024-01-20",
      invoiceNo: "INV-2024-001",
      patientName: "Liam Johnson",
      patientId: "P-10254",
      type: "Invoice",
      amount: 15000,
      paymentMethod: "Cash",
    },
    {
      id: "2",
      date: "2024-01-20",
      invoiceNo: "INV-2024-002",
      patientName: "Olivia Smith",
      patientId: "P-10255",
      type: "Invoice",
      amount: 5000,
      paymentMethod: "Card",
    },
    {
      id: "3",
      date: "2024-01-19",
      invoiceNo: "HC-INV-2024-001",
      patientName: "Robert Taylor",
      patientId: "P-10260",
      type: "HC-Invoice",
      amount: 12000,
      paymentMethod: "Bank Transfer",
    },
    {
      id: "4",
      date: "2024-01-19",
      invoiceNo: "DUE-2024-001",
      patientName: "Michael Brown",
      patientId: "P-10270",
      type: "Due Collection",
      amount: 5000,
      paymentMethod: "Cash",
    },
    {
      id: "5",
      date: "2024-01-18",
      invoiceNo: "INV-2024-003",
      patientName: "Emily Davis",
      patientId: "P-10261",
      type: "Invoice",
      amount: 5500,
      paymentMethod: "Mobile Banking",
    },
    {
      id: "6",
      date: "2024-01-18",
      invoiceNo: "HC-INV-2024-002",
      patientName: "Sarah Wilson",
      patientId: "P-10271",
      type: "HC-Invoice",
      amount: 15000,
      paymentMethod: "Card",
    },
    {
      id: "7",
      date: "2024-01-17",
      invoiceNo: "REF-2024-001",
      patientName: "David Lee",
      patientId: "P-10272",
      type: "Refund",
      amount: -2000,
      paymentMethod: "Bank Transfer",
    },
    {
      id: "8",
      date: "2024-01-17",
      invoiceNo: "DUE-2024-002",
      patientName: "Jennifer Martinez",
      patientId: "P-10273",
      type: "Due Collection",
      amount: 3000,
      paymentMethod: "Cash",
    },
  ];

  const filteredRecords = incomeRecords.filter((record) => {
    const matchesDateFrom = !dateFrom || record.date >= dateFrom;
    const matchesDateTo = !dateTo || record.date <= dateTo;
    const matchesType = filterType === "All" || record.type === filterType;
    const matchesPaymentMethod =
      filterPaymentMethod === "All" || record.paymentMethod === filterPaymentMethod;
    return matchesDateFrom && matchesDateTo && matchesType && matchesPaymentMethod;
  });

  const stats = {
    totalIncome: filteredRecords
      .filter((r) => r.amount > 0)
      .reduce((sum, r) => sum + r.amount, 0),
    totalRefund: Math.abs(
      filteredRecords.filter((r) => r.amount < 0).reduce((sum, r) => sum + r.amount, 0)
    ),
    netIncome: filteredRecords.reduce((sum, r) => sum + r.amount, 0),
    totalTransactions: filteredRecords.length,
    byType: {
      Invoice: filteredRecords.filter((r) => r.type === "Invoice").reduce((sum, r) => sum + r.amount, 0),
      "HC-Invoice": filteredRecords
        .filter((r) => r.type === "HC-Invoice")
        .reduce((sum, r) => sum + r.amount, 0),
      "Due Collection": filteredRecords
        .filter((r) => r.type === "Due Collection")
        .reduce((sum, r) => sum + r.amount, 0),
      Refund: Math.abs(
        filteredRecords.filter((r) => r.type === "Refund").reduce((sum, r) => sum + r.amount, 0)
      ),
    },
    byPaymentMethod: {
      Cash: filteredRecords.filter((r) => r.paymentMethod === "Cash").reduce((sum, r) => sum + r.amount, 0),
      Card: filteredRecords.filter((r) => r.paymentMethod === "Card").reduce((sum, r) => sum + r.amount, 0),
      "Bank Transfer": filteredRecords
        .filter((r) => r.paymentMethod === "Bank Transfer")
        .reduce((sum, r) => sum + r.amount, 0),
      "Mobile Banking": filteredRecords
        .filter((r) => r.paymentMethod === "Mobile Banking")
        .reduce((sum, r) => sum + r.amount, 0),
    },
  };

  const handlePrint = () => {
    window.print();
    alert("Printing income report...");
  };

  const handleExport = () => {
    alert("Exporting income report to PDF/Excel...");
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="w-full max-w-[1920px] mx-auto">
            {/* Breadcrumbs and Heading */}
            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/modules/diagnosis"
                    className="font-medium text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Diagnosis
                  </Link>
                  <span className="font-medium text-gray-500 dark:text-gray-400">/</span>
                  <Link
                    href="/modules/diagnosis/print-previous"
                    className="font-medium text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Print Previous
                  </Link>
                  <span className="font-medium text-gray-500 dark:text-gray-400">/</span>
                  <span className="font-medium text-[#111816] dark:text-white">Income Report</span>
                </div>
                <h1 className="text-xl font-bold text-[#111816] dark:text-white">INCOME REPORT</h1>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleExport}
                  className="px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-[#111816] dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  Export
                </button>
                <button
                  onClick={handlePrint}
                  className="px-3 py-1 text-xs bg-primary text-background-dark rounded hover:opacity-90 transition-opacity"
                >
                  Print
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2 mb-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div>
                  <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                    Type
                  </label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="All">All Types</option>
                    <option value="Invoice">Invoice</option>
                    <option value="HC-Invoice">HC-Invoice</option>
                    <option value="Due Collection">Due Collection</option>
                    <option value="Refund">Refund</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                    Payment Method
                  </label>
                  <select
                    value={filterPaymentMethod}
                    onChange={(e) => setFilterPaymentMethod(e.target.value)}
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="All">All Methods</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Mobile Banking">Mobile Banking</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Total Income</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  ৳{stats.totalIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Total Refund</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  ৳{stats.totalRefund.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Net Income</p>
                <p className="text-lg font-bold text-[#111816] dark:text-white">
                  ৳{stats.netIncome.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Total Transactions</p>
                <p className="text-lg font-bold text-[#111816] dark:text-white">
                  {stats.totalTransactions}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {/* Income Breakdown by Type */}
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                  Income by Type
                </h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Invoice</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳{stats.byType.Invoice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">HC-Invoice</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳{stats.byType["HC-Invoice"].toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Due Collection</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳{stats.byType["Due Collection"].toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Refund</span>
                    <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                      -৳{stats.byType.Refund.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Income Breakdown by Payment Method */}
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                  Income by Payment Method
                </h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Cash</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳{stats.byPaymentMethod.Cash.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Card</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳{stats.byPaymentMethod.Card.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Bank Transfer</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳{stats.byPaymentMethod["Bank Transfer"].toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Mobile Banking</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳{stats.byPaymentMethod["Mobile Banking"].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                  Quick Stats
                </h3>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Avg. Transaction</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      ৳
                      {stats.totalTransactions > 0
                        ? (stats.totalIncome / stats.totalTransactions).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#61897c] dark:text-gray-400">Date Range</span>
                    <span className="text-xs font-semibold text-[#111816] dark:text-white">
                      {new Date(dateFrom).toLocaleDateString()} - {new Date(dateTo).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Income Records Table */}
            <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm overflow-hidden mt-2">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                    <tr>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Date
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Invoice No
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Patient
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Type
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Payment Method
                      </th>
                      <th className="px-2 py-1 text-right text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                    {filteredRecords.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-2 py-4 text-center text-[#61897c] dark:text-gray-400 text-xs">
                          No income records found
                        </td>
                      </tr>
                    ) : (
                      filteredRecords.map((record) => (
                        <tr
                          key={record.id}
                          className="hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors"
                        >
                          <td className="px-2 py-1 text-xs text-[#111816] dark:text-white">
                            {new Date(record.date).toLocaleDateString()}
                          </td>
                          <td className="px-2 py-1 text-xs font-medium text-[#111816] dark:text-white">
                            {record.invoiceNo}
                          </td>
                          <td className="px-2 py-1">
                            <div className="text-xs font-medium text-[#111816] dark:text-white">
                              {record.patientName}
                            </div>
                            <div className="text-xs text-[#61897c] dark:text-gray-400">
                              {record.patientId}
                            </div>
                          </td>
                          <td className="px-2 py-1">
                            <span
                              className={`px-1.5 py-0.5 text-xs rounded ${
                                record.type === "Refund"
                                  ? "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300"
                                  : record.type === "HC-Invoice"
                                  ? "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300"
                                  : record.type === "Due Collection"
                                  ? "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300"
                                  : "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                              }`}
                            >
                              {record.type}
                            </span>
                          </td>
                          <td className="px-2 py-1 text-xs text-[#111816] dark:text-white">
                            {record.paymentMethod}
                          </td>
                          <td
                            className={`px-2 py-1 text-xs font-semibold text-right ${
                              record.amount < 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            {record.amount < 0 ? "-" : "+"}৳{Math.abs(record.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                    <tr>
                      <td colSpan={5} className="px-2 py-1 text-xs font-bold text-[#111816] dark:text-white text-right">
                        Net Total:
                      </td>
                      <td
                        className={`px-2 py-1 text-xs font-bold text-right ${
                          stats.netIncome < 0
                            ? "text-red-600 dark:text-red-400"
                            : "text-green-600 dark:text-green-400"
                        }`}
                      >
                        ৳{stats.netIncome.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

