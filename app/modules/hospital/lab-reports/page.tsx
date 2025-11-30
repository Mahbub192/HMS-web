"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState } from "react";

// Sample lab report data
const labReports = [
  {
    id: "LR-001234",
    patientId: "P-10254",
    patientName: "Liam Johnson",
    testName: "Complete Blood Count (CBC)",
    testDate: "2023-10-27",
    status: "Completed",
    statusColor:
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    doctor: "Dr. Emily Carter",
    department: "Hematology",
  },
  {
    id: "LR-001235",
    patientId: "P-10255",
    patientName: "Olivia Smith",
    testName: "Lipid Profile",
    testDate: "2023-10-27",
    status: "Completed",
    statusColor:
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    doctor: "Dr. Michael Brown",
    department: "Biochemistry",
  },
  {
    id: "LR-001236",
    patientId: "P-10256",
    patientName: "Noah Williams",
    testName: "Thyroid Function Test",
    testDate: "2023-10-26",
    status: "Pending",
    statusColor:
      "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
    doctor: "Dr. Sarah Lee",
    department: "Biochemistry",
  },
  {
    id: "LR-001237",
    patientId: "P-10257",
    patientName: "Emma Brown",
    testName: "Urinalysis",
    testDate: "2023-10-26",
    status: "In Progress",
    statusColor:
      "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
    doctor: "Dr. James Wilson",
    department: "Microbiology",
  },
  {
    id: "LR-001238",
    patientId: "P-10258",
    patientName: "James Jones",
    testName: "Blood Glucose Test",
    testDate: "2023-10-25",
    status: "Completed",
    statusColor:
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    doctor: "Dr. Emily Carter",
    department: "Biochemistry",
  },
  {
    id: "LR-001239",
    patientId: "P-10259",
    patientName: "Sophia Davis",
    testName: "Liver Function Test",
    testDate: "2023-10-28",
    status: "Completed",
    statusColor:
      "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
    doctor: "Dr. Michael Brown",
    department: "Biochemistry",
  },
];

export default function HospitalLabReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const filteredReports = labReports.filter((report) => {
    const matchesSearch =
      report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.patientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    const matchesDepartment =
      departmentFilter === "All" || report.department === departmentFilter;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const departments = [
    "All",
    "Hematology",
    "Biochemistry",
    "Microbiology",
    "Radiology",
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/modules/hospital"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Hospital
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                /
              </span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Lab Reports
              </span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Lab Reports
                </h1>
                <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                  View and manage all laboratory test reports.
                </p>
              </div>
              <Link
                href="/lab/dashboard"
                className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90"
              >
                <span className="material-symbols-outlined">science</span>
                <span className="truncate">Lab Dashboard</span>
              </Link>
            </div>

            {/* Search and Filters */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                <div className="lg:col-span-2">
                  <label className="flex flex-col w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-12">
                      <div className="text-[#61897c] dark:text-gray-400 flex bg-[#f0f4f3] dark:bg-[#2a3f38] items-center justify-center pl-4 rounded-l-lg">
                        <span className="material-symbols-outlined">
                          search
                        </span>
                      </div>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset border-none bg-[#f0f4f3] dark:bg-[#2a3f38] h-full placeholder:text-[#61897c] dark:placeholder:text-gray-500 px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
                        placeholder="Search by patient name, ID, test name, or report ID..."
                      />
                    </div>
                  </label>
                </div>
                <div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-select w-full h-12 rounded-lg text-[#111816] dark:text-white bg-[#f0f4f3] dark:bg-[#2a3f38] border-none focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset text-base font-normal"
                  >
                    <option>All Status</option>
                    <option>Completed</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                  </select>
                </div>
                <div>
                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="form-select w-full h-12 rounded-lg text-[#111816] dark:text-white bg-[#f0f4f3] dark:bg-[#2a3f38] border-none focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset text-base font-normal"
                  >
                    {departments.map((dept) => (
                      <option key={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Total Reports
                </p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">
                  {labReports.length}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Completed
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {labReports.filter((r) => r.status === "Completed").length}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Pending
                </p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {labReports.filter((r) => r.status === "Pending").length}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  In Progress
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {labReports.filter((r) => r.status === "In Progress").length}
                </p>
              </div>
            </div>

            {/* Reports Table */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                    <tr className="text-sm font-semibold text-[#61897c] dark:text-gray-400">
                      <th className="px-6 py-4">Report ID</th>
                      <th className="px-6 py-4">Patient</th>
                      <th className="px-6 py-4">Test Name</th>
                      <th className="px-6 py-4">Department</th>
                      <th className="px-6 py-4">Test Date</th>
                      <th className="px-6 py-4">Doctor</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                    {filteredReports.length > 0 ? (
                      filteredReports.map((report) => (
                        <tr
                          key={report.id}
                          className="text-[#111816] dark:text-white text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4 font-mono font-medium">
                            {report.id}
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium">
                                {report.patientName}
                              </div>
                              <div className="text-xs text-[#61897c] dark:text-gray-400">
                                {report.patientId}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">{report.testName}</td>
                          <td className="px-6 py-4 text-[#61897c] dark:text-gray-400">
                            {report.department}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(report.testDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>
                          <td className="px-6 py-4 text-[#61897c] dark:text-gray-400">
                            {report.doctor}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${report.statusColor}`}
                            >
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {report.status === "Completed" ? (
                                <>
                                  <Link
                                    href={`/modules/hospital/lab-reports/${report.id}`}
                                    className="text-[#61897c] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                                    title="View Report"
                                  >
                                    <span className="material-symbols-outlined">
                                      visibility
                                    </span>
                                  </Link>
                                  <button
                                    className="text-[#61897c] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                                    title="Download PDF"
                                    onClick={() =>
                                      alert(`Downloading report ${report.id}`)
                                    }
                                  >
                                    <span className="material-symbols-outlined">
                                      download_for_offline
                                    </span>
                                  </button>
                                </>
                              ) : (
                                <span className="text-[#61897c] dark:text-gray-400 text-xs">
                                  Pending
                                </span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-4xl text-gray-400">
                              search_off
                            </span>
                            <p className="text-[#61897c] dark:text-gray-400">
                              No lab reports found matching your search
                              criteria.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredReports.length > 0 && (
                <div className="flex items-center justify-between p-6 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                  <p className="text-sm text-[#61897c] dark:text-gray-400">
                    Showing 1 to {filteredReports.length} of{" "}
                    {filteredReports.length} results
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                      <span className="material-symbols-outlined text-xl">
                        chevron_left
                      </span>
                    </button>
                    <button className="flex items-center justify-center size-9 rounded-lg border border-primary text-primary bg-primary/20 dark:bg-primary/30 font-bold">
                      1
                    </button>
                    <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                      <span className="material-symbols-outlined text-xl">
                        chevron_right
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
