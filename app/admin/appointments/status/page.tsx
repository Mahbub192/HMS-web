"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function AppointmentStatusPage() {
  const [activeTab, setActiveTab] = useState("All");

  const appointments = [
    {
      id: "#APT001",
      patientName: "Olivia Rhye",
      patientEmail: "olivia@example.com",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYHeR5TmcZGk67xdXouN8HWKrI3Y5-v-P1EFzPpZBsLtY7dNshThHTEhTwUD32vFUePTTwRQz9a_VtUSRoSM5KJm89fczVb5f7WfN13q1b4IQrcqHJcqMrf2_zvOd6L7T4-pex59CwrOJLo40x3wMQRNJzedynyHpjqjhrmreD5x6qWS3tUHYptN1CxbZI__9qd-ievPB-8e7tgMlXvbQ5BHHryuC1NSoVD9DGq_exz9b0-3o1bsuq0qE0ZKPDQV-YVy7GNVdVO-C0",
      doctor: "Dr. Aiden Lee",
      department: "Cardiology",
      dateTime: "Nov 15, 2023 - 10:30 AM",
      status: "Approved",
      statusColor:
        "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    },
    {
      id: "#APT002",
      patientName: "Sarah Connor",
      patientEmail: "sarah@example.com",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYHeR5TmcZGk67xdXouN8HWKrI3Y5-v-P1EFzPpZBsLtY7dNshThHTEhTwUD32vFUePTTwRQz9a_VtUSRoSM5KJm89fczVb5f7WfN13q1b4IQrcqHJcqMrf2_zvOd6L7T4-pex59CwrOJLo40x3wMQRNJzedynyHpjqjhrmreD5x6qWS3tUHYptN1CxbZI__9qd-ievPB-8e7tgMlXvbQ5BHHryuC1NSoVD9DGq_exz9b0-3o1bsuq0qE0ZKPDQV-YVy7GNVdVO-C0",
      doctor: "Dr. Emily Carter",
      department: "Dermatology",
      dateTime: "Nov 16, 2023 - 2:00 PM",
      status: "Pending",
      statusColor:
        "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: "#APT003",
      patientName: "Michael Chen",
      patientEmail: "michael@example.com",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYHeR5TmcZGk67xdXouN8HWKrI3Y5-v-P1EFzPpZBsLtY7dNshThHTEhTwUD32vFUePTTwRQz9a_VtUSRoSM5KJm89fczVb5f7WfN13q1b4IQrcqHJcqMrf2_zvOd6L7T4-pex59CwrOJLo40x3wMQRNJzedynyHpjqjhrmreD5x6qWS3tUHYptN1CxbZI__9qd-ievPB-8e7tgMlXvbQ5BHHryuC1NSoVD9DGq_exz9b0-3o1bsuq0qE0ZKPDQV-YVy7GNVdVO-C0",
      doctor: "Dr. Alan Grant",
      department: "Orthopedics",
      dateTime: "Nov 14, 2023 - 9:00 AM",
      status: "Completed",
      statusColor:
        "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300",
    },
    {
      id: "#APT004",
      patientName: "Emma Wilson",
      patientEmail: "emma@example.com",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDYHeR5TmcZGk67xdXouN8HWKrI3Y5-v-P1EFzPpZBsLtY7dNshThHTEhTwUD32vFUePTTwRQz9a_VtUSRoSM5KJm89fczVb5f7WfN13q1b4IQrcqHJcqMrf2_zvOd6L7T4-pex59CwrOJLo40x3wMQRNJzedynyHpjqjhrmreD5x6qWS3tUHYptN1CxbZI__9qd-ievPB-8e7tgMlXvbQ5BHHryuC1NSoVD9DGq_exz9b0-3o1bsuq0qE0ZKPDQV-YVy7GNVdVO-C0",
      doctor: "Dr. Laura Dern",
      department: "Pediatrics",
      dateTime: "Nov 17, 2023 - 11:00 AM",
      status: "Cancelled",
      statusColor:
        "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#111816] dark:text-white">
                Appointment Status Management
              </h1>
              <button className="mt-4 md:mt-0 flex items-center justify-center gap-2 bg-primary text-[#111816] font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                <span className="material-symbols-outlined text-xl">add</span>
                New Appointment
              </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Pending Appointments
                </h3>
                <p className="text-3xl font-bold text-yellow-500 mt-1">15</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Approved Appointments
                </h3>
                <p className="text-3xl font-bold text-green-500 mt-1">42</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Completed Appointments
                </h3>
                <p className="text-3xl font-bold text-gray-500 mt-1">112</p>
              </div>
              <div className="bg-white dark:bg-gray-800/50 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Cancelled Appointments
                </h3>
                <p className="text-3xl font-bold text-red-500 mt-1">8</p>
              </div>
            </div>

            {/* Filters & Table Container */}
            <div className="bg-white dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              {/* Filter Controls */}
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Search by Patient, Doctor, ID..."
                    type="text"
                  />
                </div>
                <div className="flex-shrink-0">
                  <input
                    className="w-full sm:w-auto bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    type="date"
                  />
                </div>
                <div className="flex-shrink-0">
                  <select className="w-full sm:w-auto bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary/50">
                    <option>Sort by Date</option>
                    <option>Sort by Patient Name</option>
                    <option>Sort by Doctor</option>
                  </select>
                </div>
              </div>

              {/* Status Filter Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav aria-label="Tabs" className="-mb-px flex space-x-6">
                  {["All", "Pending", "Approved", "Completed", "Cancelled"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`shrink-0 border-b-2 px-1 py-3 text-sm font-semibold ${
                          activeTab === tab
                            ? "border-primary text-primary"
                            : "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-700 dark:hover:text-gray-200"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </nav>
              </div>

              {/* Appointments Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        scope="col"
                      >
                        Appointment ID
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        scope="col"
                      >
                        Patient Name
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        scope="col"
                      >
                        Doctor
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        scope="col"
                      >
                        Date & Time
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                        scope="col"
                      >
                        Status
                      </th>
                      <th className="relative px-6 py-3" scope="col">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800/50 divide-y divide-gray-200 dark:divide-gray-700">
                    {appointments.map((appointment) => (
                      <tr key={appointment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 dark:text-gray-400">
                          {appointment.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 relative">
                              <Image
                                src={appointment.patientAvatar}
                                alt={appointment.patientName}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#111816] dark:text-white">
                                {appointment.patientName}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {appointment.patientEmail}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-[#111816] dark:text-white">
                            {appointment.doctor}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {appointment.department}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {appointment.dateTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${appointment.statusColor}`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary hover:text-primary/80 mr-4">
                            View
                          </button>
                          <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
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
