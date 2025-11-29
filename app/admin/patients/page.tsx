"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample patient data
  const patients = [
    {
      id: "P-843592",
      name: "Isabella Rossi",
      email: "isabella.rossi@example.com",
      phone: "+1 (555) 123-4567",
      age: 34,
      gender: "Female",
      bloodType: "O+",
      status: "Active",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAf9gNiZOODiRboXanpIi0-ZlnmDlmzFy-_c5HoMm8Kc7v1D6wFQlz2cUEAIUUFIL4IvpSqaMe1sS-Q_YaNf8bgsdceBs9xr5GV8DFt0C4XfFgAsdgJw2IzS5dKbuR5Zu0n2uejhSUmEqxy8hcCZN9tN9bMH6bj3VVise1RlM82dKgtJgxQzQY4PKRaRArmZgVfS9WyTLdaCkDvZUfSGMpgckA_bRl5RBq7HwGhgnstxTzvYmunPaVLl0lZRrdh3qwWrztWWUbxx0iw",
      lastVisit: "2023-10-27",
    },
    {
      id: "P-789012",
      name: "Jameson Smith",
      email: "jameson.smith@example.com",
      phone: "+1 (555) 234-5678",
      age: 42,
      gender: "Male",
      bloodType: "O+",
      status: "Active",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwDz8fMTdNfZOoOrBHpwGRWu8Hr0Qqb8epOnqcqiUp4vdQvW-lNGMWmfZsG930CQvoRPVkskbhcOXqGXfh4EDGWFpdvj0S2aXklUkvasF0BpS40OK7ExKYNJHq1r038hMDKJ9Fa9xzCN81qZl1j6AwVCD0e9XP46JIDYx9RetNVaPnYKLETvjxs5dmtkYDVMCfePALXryAvLhFSxEqEszc0yx2BuXLwZZRqqC5OjFoG5Vzzv3lE1RsOYU6AjRuCif7eBNOllriUV52",
      lastVisit: "2023-10-25",
    },
    {
      id: "P-456789",
      name: "Sarah Lee",
      email: "sarah.lee@example.com",
      phone: "+1 (555) 345-6789",
      age: 28,
      gender: "Female",
      bloodType: "A+",
      status: "Active",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDNrhOxFRPfDVgEDXjKBme5_bq38Ice3w35Vz77-xCPU1kb8J8Bwf9x9Iuiub4bF-vc4mDQOveg8XlirS6JENXwpbh67D_f_JH2lUvnUVTfputlLKznVcM_mJKHcStZFhrf_SNGkGA9SOBT36Kd8hDfmyP8GIQA_PRQzoThboH8qUHF5UDt8YEYN4sZQRoJXj18UlUYBR6QU9F1DeNASWIBZ9qekp_dD8xmiIC4ubGp7hSqZZ1v3uNxS3CqoJxebKlg23o9soYsODOq",
      lastVisit: "2023-10-26",
    },
    {
      id: "P-123456",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 456-7890",
      age: 45,
      gender: "Male",
      bloodType: "B+",
      status: "Inactive",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCtchnN16oC67tRy1P1C6bYHzm5L4UgP4mOavQox88MfWI40IUrAtJBjjgTAdAWP8HmnqmqFMpj0T82bv5dwUCd79-5HgOlPy6TD_A8Ta_Nmt99wAtpuWGC1lxuVoLD9AChB3U1LS1ldGPLMuehAQd33SPaD7Ior2B61tHUvyCI3Aq4GjtLDRIsKvPXGwoew2Ak9CP7iDxY_BXbSTYPobQgLpTHxV8lh1D9X5TedTfgNTpHIho_93KwlrLCi8Rkpgv14XfKkr498Dsv",
      lastVisit: "2023-09-15",
    },
    {
      id: "P-987654",
      name: "Emily Johnson",
      email: "emily.johnson@example.com",
      phone: "+1 (555) 567-8901",
      age: 31,
      gender: "Female",
      bloodType: "AB+",
      status: "Active",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYHeR5TmcZGk67xdXouN8HWKrI3Y5-v-P1EFzPpZBsLtY7dNshThHTEhTwUD32vFUePTTwRQz9a_VtUSRoSM5KJm89fczVb5f7WfN13q1b4IQrcqHJcqMrf2_zvOd6L7T4-pex59CwrOJLo40x3wMQRNJzedynyHpjqjhrmreD5x6qWS3tUHYptN1CxbZI__9qd-ievPB-8e7tgMlXvbQ5BHHryuC1NSoVD9DGq_exz9b0-3o1bsuq0qE0ZKPDQV-YVy7GNVdVO-C0",
      lastVisit: "2023-10-28",
    },
    {
      id: "P-321098",
      name: "David Chen",
      email: "david.chen@example.com",
      phone: "+1 (555) 678-9012",
      age: 39,
      gender: "Male",
      bloodType: "A-",
      status: "Active",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB0wLVY1BwSJ43U_jzyxK4Am33E6lM1BJj_4LWoMQA90w4Z8rt11erCXDXoMtTJoX6vKEy-pA6_bxVV-_tkcINZO81r1HvGO9UiBmFpAvUwWdur6J20m4RHn8DyUopfph84IMo-Q_ATCmW7xvwm5DeHCebaaAGQwgU6WMUfKU7GjvRGyyzBIbBoF7EXO5mNo7QSjmVzECiVDVwLJqYoEJx9rGh9PpLLiSx35cBHSYiT7miTk_Dlzkf62H-bvTCU2XHnXtPlY6IVOrUW",
      lastVisit: "2023-10-24",
    },
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery)
  );

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#111816] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                  Patients
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Manage patient records and information.
                </p>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="material-symbols-outlined">add</span>
                <span className="truncate">Add New Patient</span>
              </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 relative w-full">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search by name, ID, email, or phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark text-[#111816] dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-[#111816] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="material-symbols-outlined text-base">
                      filter_list
                    </span>
                    <span>Filter</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-[#111816] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                    <span className="material-symbols-outlined text-base">
                      sort
                    </span>
                    <span>Sort</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Patient ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Age / Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Blood Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-black/10 divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredPatients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer"
                        onClick={() => {
                          window.location.href = `/admin/patients/${patient.id}/profile`;
                        }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src={patient.avatar}
                                alt={patient.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-[#111816] dark:text-white">
                                {patient.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {patient.id}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {patient.email}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {patient.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {patient.age} years / {patient.gender}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {patient.bloodType}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              patient.status === "Active"
                                ? "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {patient.lastVisit}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center gap-3">
                            <Link
                              href={`/admin/patients/${patient.id}/profile`}
                              className="text-primary hover:text-primary/80 font-medium"
                            >
                              Profile
                            </Link>
                            <Link
                              href={`/admin/patients/${patient.id}/history`}
                              className="text-gray-600 dark:text-gray-400 hover:text-primary font-medium"
                            >
                              History
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">
                  {patients.length}
                </p>
              </div>
              <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Active Patients
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {patients.filter((p) => p.status === "Active").length}
                </p>
              </div>
              <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  New This Month
                </p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">
                  12
                </p>
              </div>
              <div className="bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                  Appointments Today
                </p>
                <p className="text-2xl font-bold text-primary">8</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
