'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Image from 'next/image';

export default function AdminDashboard() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Page Heading */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#111816] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                Admin Dashboard
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                A complete overview of hospital operations and performance.
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 h-10 px-4 bg-white dark:bg-black/20 border border-gray-300 dark:border-gray-700 text-[#111816] dark:text-gray-200 text-sm font-medium leading-normal rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <span className="material-symbols-outlined text-base">calendar_today</span>
              <span className="truncate">Filter by Date</span>
            </button>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-6 mt-6">
            {/* Stats Section */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  Total Patients (Today)
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  124
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium leading-normal">
                  +2.5%
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  Total Patients (Month)
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  1,890
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium leading-normal">
                  +10.1%
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  New Appointments (Today)
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  62
                </p>
                <p className="text-red-600 dark:text-red-400 text-sm font-medium leading-normal">
                  -1.2%
                </p>
              </div>
              <div className="flex flex-col gap-2 rounded-xl p-6 bg-white dark:bg-black/20 border border-gray-200 dark:border-gray-800">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  Bed Occupancy Ratio
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  75%
                </p>
                <p className="text-green-600 dark:text-green-400 text-sm font-medium leading-normal">
                  +5.0%
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-2 rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black/20">
              <p className="text-[#111816] dark:text-white text-lg font-semibold leading-normal">
                Revenue & Expenses
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal">Last 30 Days</p>
              <div className="h-72 w-full mt-4 relative">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjU8iMMHLiPIcECfa5D6jDv4B7j9tMhg-J2IdLT14D8jakU4kS4GZuubYGnBjQnLHLeAePZKMt5-blKkjQzEEx8A22nE_rteHgBtmimjnizvLORzb0KX6nrpirHXG6hv_opqki_OAPJS7UDInV3qPLLOs1qp8zjooXO-neDr2XiAKD4gO3IuNtg9Q2PlozdjkOj325NC7LgOkkPTiytaG7akeykAVCGT6yRaZIrN-VZpn3It93Ri29lkUCWWcScoYbsW-3uUKpBtFF"
                  alt="Revenue and Expenses Chart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Quick Actions & Alerts Section */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black/20">
                <h3 className="text-[#111816] dark:text-white text-lg font-semibold">
                  Quick Actions
                </h3>
                <div className="flex flex-col gap-3">
                  <button className="flex w-full items-center justify-center gap-2 h-10 px-4 bg-primary text-[#10221c] text-sm font-bold leading-normal rounded-lg hover:bg-primary/90">
                    <span className="material-symbols-outlined text-base">person_add</span>
                    Add New Patient
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 h-10 px-4 bg-primary/20 dark:bg-primary/30 text-[#111816] dark:text-white text-sm font-bold leading-normal rounded-lg hover:bg-primary/30 dark:hover:bg-primary/40">
                    <span className="material-symbols-outlined text-base">medication</span>
                    Add New Doctor
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 h-10 px-4 bg-primary/20 dark:bg-primary/30 text-[#111816] dark:text-white text-sm font-bold leading-normal rounded-lg hover:bg-primary/30 dark:hover:bg-primary/40">
                    <span className="material-symbols-outlined text-base">request_quote</span>
                    Create New Invoice
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black/20">
                <h3 className="text-[#111816] dark:text-white text-lg font-semibold">
                  Alerts & Notifications
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-full mt-1">
                      <span className="material-symbols-outlined text-red-500 dark:text-red-400 text-base">
                        inventory_2
                      </span>
                    </div>
                    <div>
                      <p className="text-[#111816] dark:text-white text-sm font-medium">
                        Low Inventory Warning
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Paracetamol stock is below 100 units.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-full mt-1">
                      <span className="material-symbols-outlined text-orange-500 dark:text-orange-400 text-base">
                        error
                      </span>
                    </div>
                    <div>
                      <p className="text-[#111816] dark:text-white text-sm font-medium">
                        System Maintenance
                      </p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">
                        Scheduled for Sunday at 2:00 AM.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Overview Section */}
            <div className="col-span-12 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black/20">
              <h3 className="text-[#111816] dark:text-white text-lg font-semibold">
                Operational Overview
              </h3>
              {/* Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav aria-label="Tabs" className="-mb-px flex gap-6">
                  <a
                    className="shrink-0 border-b-2 border-primary px-1 pb-3 text-sm font-bold text-primary dark:text-primary"
                    href="#"
                  >
                    Appointments Overview
                  </a>
                  <a
                    className="shrink-0 border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-500 dark:hover:text-gray-200"
                    href="#"
                  >
                    Doctor Availability
                  </a>
                </nav>
              </div>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800/50">
                    <tr>
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        scope="col"
                      >
                        Patient Name
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        scope="col"
                      >
                        Doctor
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        scope="col"
                      >
                        Time
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        scope="col"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-black/10 divide-y divide-gray-200 dark:divide-gray-800">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111816] dark:text-white">
                        John Doe
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        Dr. Emily Carter
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        10:30 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/50 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                          Confirmed
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111816] dark:text-white">
                        Jane Smith
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        Dr. Alan Grant
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        11:00 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/50 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:text-yellow-300">
                          Pending
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#111816] dark:text-white">
                        Robert Brown
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        Dr. Sarah Connor
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                        11:15 AM
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900/50 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:text-green-300">
                          Checked In
                        </span>
                      </td>
                    </tr>
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

