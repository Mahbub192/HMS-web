"use client";

import Sidebar from "@/components/Sidebar";

export default function LabDashboardPage() {
  const testRequests = [
    {
      id: "#P78901",
      testName: "Complete Blood Count (CBC)",
      dateReceived: "2023-10-27",
      status: "Urgent",
      statusColor:
        "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300",
    },
    {
      id: "#P78902",
      testName: "Lipid Panel",
      dateReceived: "2023-10-27",
      status: "Completed",
      statusColor:
        "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    },
    {
      id: "#P78903",
      testName: "Thyroid Function Test",
      dateReceived: "2023-10-26",
      status: "In Progress",
      statusColor:
        "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: "#P78904",
      testName: "Urinalysis",
      dateReceived: "2023-10-26",
      status: "Pending",
      statusColor:
        "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
    },
    {
      id: "#P78905",
      testName: "Blood Glucose Test",
      dateReceived: "2023-10-25",
      status: "Completed",
      statusColor:
        "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 overflow-y-auto">
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
                <div className="relative w-full sm:w-auto max-w-xs">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                    search
                  </span>
                  <input
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-background-light dark:bg-background-dark text-[#111816] dark:text-white focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                    placeholder="Search by patient..."
                    type="text"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 text-[#111816] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10">
                    <span className="material-symbols-outlined text-base">
                      filter_list
                    </span>
                    <span>Filter</span>
                  </button>
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
                        Patient ID
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
                    {testRequests.map((test, index) => (
                      <tr key={index} className="border-b dark:border-gray-800">
                        <td className="px-6 py-4 font-medium text-[#111816] dark:text-white">
                          {test.id}
                        </td>
                        <td className="px-6 py-4 text-[#111816] dark:text-white">
                          {test.testName}
                        </td>
                        <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                          {test.dateReceived}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${test.statusColor}`}
                          >
                            {test.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <button className="hover:text-primary">
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                          {test.status === "Urgent" ||
                          test.status === "Pending" ? (
                            <button className="hover:text-primary">
                              <span className="material-symbols-outlined">
                                edit
                              </span>
                            </button>
                          ) : (
                            <button className="hover:text-primary">
                              <span className="material-symbols-outlined">
                                download_for_offline
                              </span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
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
                  <button className="w-full flex items-center justify-center gap-2 bg-primary text-[#111816] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined">add</span>
                    <span>New Test Request</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white font-medium py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span className="material-symbols-outlined">
                      upload_file
                    </span>
                    <span>Upload Results</span>
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white font-medium py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
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
      </main>
    </div>
  );
}
