"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Sample patient data - In real app, this would come from API
const samplePatients = [
  {
    id: "P-10254",
    name: "Liam Johnson",
    email: "liam.johnson@email.com",
    phone: "+1 (555) 123-4567",
    registrationDate: "2023-10-15",
    lastVisit: "2023-10-25",
    status: "Active",
    gender: "Male",
    age: 35,
    bloodType: "O+",
  },
  {
    id: "P-10255",
    name: "Olivia Smith",
    email: "olivia.smith@email.com",
    phone: "+1 (555) 234-5678",
    registrationDate: "2023-10-20",
    lastVisit: "2023-10-25",
    status: "Active",
    gender: "Female",
    age: 28,
    bloodType: "A+",
  },
  {
    id: "P-10256",
    name: "Noah Williams",
    email: "noah.williams@email.com",
    phone: "+1 (555) 345-6789",
    registrationDate: "2023-09-10",
    lastVisit: "2023-09-15",
    status: "Inactive",
    gender: "Male",
    age: 42,
    bloodType: "B+",
  },
  {
    id: "P-10257",
    name: "Emma Brown",
    email: "emma.brown@email.com",
    phone: "+1 (555) 456-7890",
    registrationDate: "2023-10-22",
    lastVisit: "2023-10-24",
    status: "Active",
    gender: "Female",
    age: 31,
    bloodType: "AB+",
  },
  {
    id: "P-10258",
    name: "James Jones",
    email: "james.jones@email.com",
    phone: "+1 (555) 567-8901",
    registrationDate: "2023-10-18",
    lastVisit: "2023-10-23",
    status: "Active",
    gender: "Male",
    age: 45,
    bloodType: "O-",
  },
  {
    id: "P-10259",
    name: "Sophia Davis",
    email: "sophia.davis@email.com",
    phone: "+1 (555) 678-9012",
    registrationDate: "2023-10-10",
    lastVisit: "2023-10-20",
    status: "Active",
    gender: "Female",
    age: 29,
    bloodType: "A-",
  },
  {
    id: "P-10260",
    name: "William Miller",
    email: "william.miller@email.com",
    phone: "+1 (555) 789-0123",
    registrationDate: "2023-09-25",
    lastVisit: "2023-10-05",
    status: "Active",
    gender: "Male",
    age: 38,
    bloodType: "B-",
  },
  {
    id: "P-10261",
    name: "Isabella Wilson",
    email: "isabella.wilson@email.com",
    phone: "+1 (555) 890-1234",
    registrationDate: "2023-10-12",
    lastVisit: "2023-10-22",
    status: "Active",
    gender: "Female",
    age: 33,
    bloodType: "O+",
  },
];

export default function RegisteredPatientsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("registrationDate");

  const filteredPatients = samplePatients
    .filter((patient) => {
      const matchesSearch =
        patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.phone.includes(searchQuery);
      const matchesStatus = statusFilter === "All" || patient.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "registrationDate") {
        return new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime();
      } else if (sortBy === "lastVisit") {
        return new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime();
      }
      return 0;
    });

  const handlePatientClick = (patientId: string) => {
    router.push(`/admin/patients/${patientId}/profile`);
  };

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
                href="/modules/registration"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Registration
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Registered Patients
              </span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
              <div className="flex flex-col gap-1">
                <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Registered Patients
                </h1>
                <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                  View and manage all registered patients in the system.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/modules/registration/new"
                  className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90"
                >
                  <span className="material-symbols-outlined">person_add</span>
                  <span className="truncate">New Registration</span>
                </Link>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-6 mb-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
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
                        placeholder="Search by Name, ID, Email, or Phone..."
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
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <div>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-select w-full h-12 rounded-lg text-[#111816] dark:text-white bg-[#f0f4f3] dark:bg-[#2a3f38] border-none focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-inset text-base font-normal"
                  >
                    <option value="registrationDate">Sort by Registration Date</option>
                    <option value="name">Sort by Name</option>
                    <option value="lastVisit">Sort by Last Visit</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">
                  {samplePatients.length}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Active Patients
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {samplePatients.filter((p) => p.status === "Active").length}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Registered This Month
                </p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">
                  {samplePatients.filter(
                    (p) =>
                      new Date(p.registrationDate).getMonth() === new Date().getMonth() &&
                      new Date(p.registrationDate).getFullYear() === new Date().getFullYear()
                  ).length}
                </p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">
                  Registered Today
                </p>
                <p className="text-2xl font-bold text-primary">
                  {samplePatients.filter(
                    (p) =>
                      new Date(p.registrationDate).toDateString() ===
                      new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>

            {/* Patients Table */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                    <tr className="text-sm font-semibold text-[#61897c] dark:text-gray-400">
                      <th className="px-6 py-4">Patient ID</th>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Phone</th>
                      <th className="px-6 py-4">Gender</th>
                      <th className="px-6 py-4">Age</th>
                      <th className="px-6 py-4">Registration Date</th>
                      <th className="px-6 py-4">Last Visit</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                    {filteredPatients.length > 0 ? (
                      filteredPatients.map((patient) => (
                        <tr
                          key={patient.id}
                          onClick={() => handlePatientClick(patient.id)}
                          className="text-[#111816] dark:text-white text-sm hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <td className="px-6 py-4 font-mono font-medium">{patient.id}</td>
                          <td className="px-6 py-4 font-medium">{patient.name}</td>
                          <td className="px-6 py-4 text-[#61897c] dark:text-gray-400">
                            {patient.email}
                          </td>
                          <td className="px-6 py-4 text-[#61897c] dark:text-gray-400">
                            {patient.phone}
                          </td>
                          <td className="px-6 py-4">{patient.gender}</td>
                          <td className="px-6 py-4">{patient.age} years</td>
                          <td className="px-6 py-4">
                            {new Date(patient.registrationDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4">
                            {new Date(patient.lastVisit).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                patient.status === "Active"
                                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                              }`}
                            >
                              {patient.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div
                              className="flex items-center gap-2"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Link
                                href={`/admin/patients/${patient.id}/profile`}
                                className="text-[#61897c] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                                title="View Profile"
                              >
                                <span className="material-symbols-outlined">visibility</span>
                              </Link>
                              <Link
                                href={`/admin/patients/${patient.id}/history`}
                                className="text-[#61897c] dark:text-gray-400 hover:text-primary dark:hover:text-primary"
                                title="View History"
                              >
                                <span className="material-symbols-outlined">history</span>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={10} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center gap-2">
                            <span className="material-symbols-outlined text-4xl text-gray-400">
                              search_off
                            </span>
                            <p className="text-[#61897c] dark:text-gray-400">
                              No patients found matching your search criteria.
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredPatients.length > 0 && (
                <div className="flex items-center justify-between p-6 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                  <p className="text-sm text-[#61897c] dark:text-gray-400">
                    Showing 1 to {filteredPatients.length} of {filteredPatients.length} results
                  </p>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                      <span className="material-symbols-outlined text-xl">chevron_left</span>
                    </button>
                    <button className="flex items-center justify-center size-9 rounded-lg border border-primary text-primary bg-primary/20 dark:bg-primary/30 font-bold">
                      1
                    </button>
                    <button className="flex items-center justify-center size-9 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] text-[#111816] dark:text-white hover:bg-black/5 dark:hover:bg-white/5">
                      <span className="material-symbols-outlined text-xl">chevron_right</span>
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

