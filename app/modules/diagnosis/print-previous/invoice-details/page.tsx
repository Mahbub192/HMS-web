"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface Invoice {
  id: string;
  invoiceNo: string;
  patientId: string;
  patientName: string;
  date: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: "Paid" | "Pending" | "Partial";
  type: "Invoice" | "HC-Invoice";
}

export default function InvoiceDetailsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [filterType, setFilterType] = useState<string>("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      id: "1",
      invoiceNo: "INV-2024-001",
      patientId: "P-10254",
      patientName: "Liam Johnson",
      date: "2024-01-20",
      totalAmount: 15000,
      paidAmount: 15000,
      dueAmount: 0,
      status: "Paid",
      type: "Invoice",
    },
    {
      id: "2",
      invoiceNo: "INV-2024-002",
      patientId: "P-10255",
      patientName: "Olivia Smith",
      date: "2024-01-19",
      totalAmount: 8500,
      paidAmount: 5000,
      dueAmount: 3500,
      status: "Partial",
      type: "Invoice",
    },
    {
      id: "3",
      invoiceNo: "HC-INV-2024-001",
      patientId: "P-10260",
      patientName: "Robert Taylor",
      date: "2024-01-18",
      totalAmount: 12000,
      paidAmount: 12000,
      dueAmount: 0,
      status: "Paid",
      type: "HC-Invoice",
    },
    {
      id: "4",
      invoiceNo: "INV-2024-003",
      patientId: "P-10261",
      patientName: "Emily Davis",
      date: "2024-01-17",
      totalAmount: 5500,
      paidAmount: 0,
      dueAmount: 5500,
      status: "Pending",
      type: "Invoice",
    },
    {
      id: "5",
      invoiceNo: "HC-INV-2024-002",
      patientId: "P-10270",
      patientName: "Michael Brown",
      date: "2024-01-16",
      totalAmount: 15000,
      paidAmount: 15000,
      dueAmount: 0,
      status: "Paid",
      type: "HC-Invoice",
    },
  ];

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.patientId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || invoice.status === filterStatus;
    const matchesType = filterType === "All" || invoice.type === filterType;
    const matchesDateFrom = !dateFrom || invoice.date >= dateFrom;
    const matchesDateTo = !dateTo || invoice.date <= dateTo;
    return matchesSearch && matchesStatus && matchesType && matchesDateFrom && matchesDateTo;
  });

  const stats = {
    total: filteredInvoices.length,
    totalAmount: filteredInvoices.reduce((sum, inv) => sum + inv.totalAmount, 0),
    paidAmount: filteredInvoices.reduce((sum, inv) => sum + inv.paidAmount, 0),
    dueAmount: filteredInvoices.reduce((sum, inv) => sum + inv.dueAmount, 0),
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300";
      case "Partial":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
    }
  };

  const handlePrint = (invoice: Invoice) => {
    window.print();
    alert(`Printing invoice: ${invoice.invoiceNo}`);
  };

  const handleView = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
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
                  <span className="font-medium text-[#111816] dark:text-white">Invoice details</span>
                </div>
                <h1 className="text-xl font-bold text-[#111816] dark:text-white">INVOICE DETAILS</h1>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Total Invoices</p>
                <p className="text-lg font-bold text-[#111816] dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Total Amount</p>
                <p className="text-lg font-bold text-[#111816] dark:text-white">
                  ৳{stats.totalAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Paid Amount</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">
                  ৳{stats.paidAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <p className="text-xs text-[#61897c] dark:text-gray-400 mb-0.5">Due Amount</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">
                  ৳{stats.dueAmount.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2 mb-2">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by Invoice No, Patient..."
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 pl-8 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="All">All Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Partial">Partial</option>
                  </select>
                </div>
                <div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="All">All Types</option>
                    <option value="Invoice">Invoice</option>
                    <option value="HC-Invoice">HC-Invoice</option>
                  </select>
                </div>
                <div>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    placeholder="From Date"
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    placeholder="To Date"
                    className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                    <tr>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Invoice No
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Patient
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Date
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Type
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Total Amount
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Paid
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Due
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Status
                      </th>
                      <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                    {filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-2 py-4 text-center text-[#61897c] dark:text-gray-400 text-xs">
                          No invoices found
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors"
                        >
                          <td className="px-2 py-1 text-xs font-medium text-[#111816] dark:text-white">
                            {invoice.invoiceNo}
                          </td>
                          <td className="px-2 py-1">
                            <div className="text-xs font-medium text-[#111816] dark:text-white">
                              {invoice.patientName}
                            </div>
                            <div className="text-xs text-[#61897c] dark:text-gray-400">
                              {invoice.patientId}
                            </div>
                          </td>
                          <td className="px-2 py-1 text-xs text-[#111816] dark:text-white">
                            {new Date(invoice.date).toLocaleDateString()}
                          </td>
                          <td className="px-2 py-1">
                            <span className="px-1.5 py-0.5 text-xs rounded bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300">
                              {invoice.type}
                            </span>
                          </td>
                          <td className="px-2 py-1 text-xs font-semibold text-[#111816] dark:text-white">
                            ৳{invoice.totalAmount.toLocaleString()}
                          </td>
                          <td className="px-2 py-1 text-xs text-green-600 dark:text-green-400">
                            ৳{invoice.paidAmount.toLocaleString()}
                          </td>
                          <td className="px-2 py-1 text-xs text-red-600 dark:text-red-400">
                            ৳{invoice.dueAmount.toLocaleString()}
                          </td>
                          <td className="px-2 py-1">
                            <span className={`px-1.5 py-0.5 text-xs rounded font-medium ${getStatusColor(invoice.status)}`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-2 py-1">
                            <div className="flex gap-1">
                              <button
                                onClick={() => handleView(invoice)}
                                className="px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/30"
                              >
                                View
                              </button>
                              <button
                                onClick={() => handlePrint(invoice)}
                                className="px-2 py-0.5 text-xs bg-primary text-background-dark rounded hover:opacity-90"
                              >
                                Print
                              </button>
                            </div>
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

