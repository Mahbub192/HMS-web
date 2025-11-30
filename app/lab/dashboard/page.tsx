"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

export default function LabDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const testRequests = [
    {
      id: "#P78901",
      patientId: "P-10254",
      patientName: "Liam Johnson",
      testName: "Complete Blood Count (CBC)",
      dateReceived: "2023-10-27",
      status: "Urgent",
      statusColor:
        "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300",
    },
    {
      id: "#P78902",
      patientId: "P-10255",
      patientName: "Olivia Smith",
      testName: "Lipid Panel",
      dateReceived: "2023-10-27",
      status: "Completed",
      statusColor:
        "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    },
    {
      id: "#P78903",
      patientId: "P-10256",
      patientName: "Noah Williams",
      testName: "Thyroid Function Test",
      dateReceived: "2023-10-26",
      status: "In Progress",
      statusColor:
        "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: "#P78904",
      patientId: "P-10257",
      patientName: "Emma Brown",
      testName: "Urinalysis",
      dateReceived: "2023-10-26",
      status: "Pending",
      statusColor:
        "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
    },
    {
      id: "#P78905",
      patientId: "P-10258",
      patientName: "James Jones",
      testName: "Blood Glucose Test",
      dateReceived: "2023-10-25",
      status: "Completed",
      statusColor:
        "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    },
    {
      id: "#P78906",
      patientId: "P-10259",
      patientName: "Sophia Davis",
      testName: "Liver Function Test",
      dateReceived: "2023-10-28",
      status: "Pending",
      statusColor:
        "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
    },
    {
      id: "#P78907",
      patientId: "P-10260",
      patientName: "William Miller",
      testName: "Chest X-Ray",
      dateReceived: "2023-10-28",
      status: "In Progress",
      statusColor:
        "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    },
  ];

  const filteredTests = testRequests.filter((test) => {
    const matchesSearch =
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || test.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <p className="text-[#111816] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                Lab Dashboard Overview
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Welcome back, here is an overview of the lab's current status.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800">
              <p className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                Pending Samples
              </p>
              <p className="text-[#111816] dark:text-white tracking-light text-4xl font-bold leading-tight">
                48
              </p>
              <p className="text-green-600 dark:text-green-400 text-base font-medium leading-normal">
                +5%
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800">
              <p className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                Tests in Progress
              </p>
              <p className="text-[#111816] dark:text-white tracking-light text-4xl font-bold leading-tight">
                12
              </p>
              <p className="text-red-600 dark:text-red-400 text-base font-medium leading-normal">
                -2%
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800">
              <p className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                Reports Ready
              </p>
              <p className="text-[#111816] dark:text-white tracking-light text-4xl font-bold leading-tight">
                32
              </p>
              <p className="text-green-600 dark:text-green-400 text-base font-medium leading-normal">
                +10%
              </p>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Test Status Table */}
            <div className="col-span-12 lg:col-span-8 bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800 rounded-xl">
              {/* Section Header */}
              <div className="p-6">
                <h2 className="text-[#111816] dark:text-white text-xl font-bold leading-tight tracking-tight">
                  Recent Test Requests
                </h2>
              </div>

              {/* Search and Filter Bar */}
              <div className="px-6 pb-4 flex flex-wrap gap-4 items-center justify-between">
                <div className="relative w-full sm:w-auto flex-1 max-w-md">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark text-[#111816] dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Search by patient name, ID, or test name..."
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark text-[#111816] dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  >
                    <option>All Status</option>
                    <option>Urgent</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-[#111816] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined text-base">
                      calendar_today
                    </span>
                    <span>Date Range</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-white/5">
                    <tr>
                      <th className="px-6 py-3" scope="col">
                        Test ID
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Patient
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Test Name
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Date Received
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Status
                      </th>
                      <th className="px-6 py-3" scope="col">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTests.length > 0 ? (
                      filteredTests.map((test, index) => (
                        <tr
                          key={index}
                          className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4 font-mono font-medium text-[#111816] dark:text-white">
                            {test.id}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-[#111816] dark:text-white">
                                {test.patientName}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {test.patientId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-[#111816] dark:text-white">
                            {test.testName}
                          </td>
                          <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                            {new Date(test.dateReceived).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${test.statusColor}`}
                            >
                              {test.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                              <Link
                                href={`/admin/patients/${test.patientId}/profile`}
                                className="hover:text-primary"
                                title="View Patient"
                              >
                                <span className="material-symbols-outlined">
                                  visibility
                                </span>
                              </Link>
                              {test.status === "Urgent" ||
                              test.status === "Pending" ||
                              test.status === "In Progress" ? (
                                <button
                                  className="hover:text-primary"
                                  title="Update Status"
                                  onClick={() => {
                                    alert(`Update test status for ${test.testName}`);
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    edit
                                  </span>
                                </button>
                              ) : (
                                <button
                                  className="hover:text-primary"
                                  title="Download Report"
                                  onClick={() => {
                                    alert(`Download report for ${test.testName}`);
                                  }}
                                >
                                  <span className="material-symbols-outlined">
                                    download_for_offline
                                  </span>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-4xl text-gray-400">
                              search_off
                            </span>
                            <p className="text-gray-500 dark:text-gray-400">
                              No test requests found matching your search criteria.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#111816] dark:text-white mb-4">
                  Quick Actions
                </h3>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/lab/booking"
                    className="w-full flex items-center justify-center gap-2 bg-primary text-[#111816] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined">add</span>
                    <span>New Test Request</span>
                  </Link>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white font-medium py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => alert("Upload Results functionality")}
                  >
                    <span className="material-symbols-outlined">
                      upload_file
                    </span>
                    <span>Upload Results</span>
                  </button>
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white font-medium py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    onClick={() => alert("Print Reports functionality")}
                  >
                    <span className="material-symbols-outlined">print</span>
                    <span>Print Reports</span>
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-black/10 border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold text-[#111816] dark:text-white mb-4">
                  Today's Schedule
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-sm font-medium text-[#111816] dark:text-white">
                      Morning Batch
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      8:00 AM - 12:00 PM
                    </p>
                    <p className="text-xs text-primary mt-1">15 samples</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                    <p className="text-sm font-medium text-[#111816] dark:text-white">
                      Afternoon Batch
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      1:00 PM - 5:00 PM
                    </p>
                    <p className="text-xs text-primary mt-1">23 samples</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </main>
    </div>
  );
}
