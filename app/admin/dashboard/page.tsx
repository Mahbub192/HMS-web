'use client';

import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminDashboard() {
  const modules = [
    {
      id: 'registration',
      name: 'Registration',
      icon: 'description',
      href: '/modules/registration',
      color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      iconColor: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'hospital',
      name: 'Hospital',
      icon: 'local_hospital',
      href: '/modules/hospital',
      color: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      iconColor: 'text-red-600 dark:text-red-400',
    },
    {
      id: 'diagnosis',
      name: 'Diagnosis',
      icon: 'medical_services',
      href: '/modules/diagnosis',
      color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 'emergency',
      name: 'Emergency',
      icon: 'emergency',
      href: '/modules/emergency',
      color: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      id: 'opd-service',
      name: 'OPD Service',
      icon: 'medical_information',
      href: '/modules/opd-service',
      color: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
      iconColor: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      id: 'dialysis',
      name: 'Dialysis',
      icon: 'healing',
      href: '/modules/dialysis',
      color: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 'hr-management',
      name: 'HR Management',
      icon: 'groups',
      href: '/modules/hr-management',
      color: 'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
      iconColor: 'text-pink-600 dark:text-pink-400',
    },
    {
      id: 'doctor-management',
      name: 'Doctor Management',
      icon: 'person',
      href: '/admin/doctors',
      color: 'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      id: 'asset-management',
      name: 'Asset Management',
      icon: 'inventory_2',
      href: '/modules/asset-management',
      color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
    },
    {
      id: 'security',
      name: 'Security',
      icon: 'security',
      href: '/modules/security',
      color: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800',
      iconColor: 'text-gray-600 dark:text-gray-400',
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      icon: 'local_pharmacy',
      href: '/pharmacy/billing',
      color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      iconColor: 'text-green-600 dark:text-green-400',
    },
    {
      id: 'lab',
      name: 'Lab',
      icon: 'science',
      href: '/lab/dashboard',
      color: 'bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
      iconColor: 'text-violet-600 dark:text-violet-400',
    },
  ];

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
                  <Link
                    href="/admin/patients/profile"
                    className="flex w-full items-center justify-center gap-2 h-10 px-4 bg-primary text-[#10221c] text-sm font-bold leading-normal rounded-lg hover:bg-primary/90"
                  >
                    <span className="material-symbols-outlined text-base">person_add</span>
                    Add New Patient
                  </Link>
                  <Link
                    href="/admin/doctors"
                    className="flex w-full items-center justify-center gap-2 h-10 px-4 bg-primary/20 dark:bg-primary/30 text-[#111816] dark:text-white text-sm font-bold leading-normal rounded-lg hover:bg-primary/30 dark:hover:bg-primary/40"
                  >
                    <span className="material-symbols-outlined text-base">medication</span>
                    Add New Doctor
                  </Link>
                  <Link
                    href="/admin/appointments/create"
                    className="flex w-full items-center justify-center gap-2 h-10 px-4 bg-primary/20 dark:bg-primary/30 text-[#111816] dark:text-white text-sm font-bold leading-normal rounded-lg hover:bg-primary/30 dark:hover:bg-primary/40"
                  >
                    <span className="material-symbols-outlined text-base">calendar_month</span>
                    Create Appointment
                  </Link>
                  <Link
                    href="/admin/billing"
                    className="flex w-full items-center justify-center gap-2 h-10 px-4 bg-primary/20 dark:bg-primary/30 text-[#111816] dark:text-white text-sm font-bold leading-normal rounded-lg hover:bg-primary/30 dark:hover:bg-primary/40"
                  >
                    <span className="material-symbols-outlined text-base">request_quote</span>
                    Create New Invoice
                  </Link>
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

            {/* Modules Grid Section */}
            <div className="col-span-12 flex flex-col gap-4 rounded-xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-black/20">
              <div className="flex items-center justify-between">
                <h3 className="text-[#111816] dark:text-white text-lg font-semibold">
                  All Modules
                </h3>
                <Link
                  href="/modules"
                  className="text-sm text-primary hover:text-primary/80 font-medium"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {modules.map((module) => (
                  <Link
                    key={module.id}
                    href={module.href}
                    className={`flex flex-col items-center justify-center gap-3 p-4 rounded-lg border-2 transition-all hover:scale-105 hover:shadow-md ${module.color}`}
                  >
                    <div className={`p-3 rounded-lg bg-white dark:bg-gray-800`}>
                      <span
                        className={`material-symbols-outlined text-3xl ${module.iconColor}`}
                      >
                        {module.icon}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-center text-[#111816] dark:text-white">
                      {module.name}
                    </span>
                  </Link>
                ))}
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
                  <Link
                    href="/admin/appointments/status"
                    className="shrink-0 border-b-2 border-primary px-1 pb-3 text-sm font-bold text-primary dark:text-primary"
                  >
                    Appointments Overview
                  </Link>
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
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        scope="col"
                      >
                        Action
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href="/admin/appointments/status"
                          className="text-primary hover:text-primary/80 font-medium"
                        >
                          View
                        </Link>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href="/admin/appointments/status"
                          className="text-primary hover:text-primary/80 font-medium"
                        >
                          View
                        </Link>
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <Link
                          href="/admin/appointments/status"
                          className="text-primary hover:text-primary/80 font-medium"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Links Section */}
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/admin/patients/profile"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 hover:border-primary transition-colors"
              >
                <div className="p-3 bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    person
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111816] dark:text-white">
                    Patient Profile
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Manage patients
                  </p>
                </div>
              </Link>

              <Link
                href="/admin/patients/queue"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 hover:border-primary transition-colors"
              >
                <div className="p-3 bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    queue
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111816] dark:text-white">
                    Patient Queue
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    View queue
                  </p>
                </div>
              </Link>

              <Link
                href="/pharmacy/billing"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 hover:border-primary transition-colors"
              >
                <div className="p-3 bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    local_pharmacy
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111816] dark:text-white">
                    Pharmacy
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Billing & Inventory
                  </p>
                </div>
              </Link>

              <Link
                href="/lab/dashboard"
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 hover:border-primary transition-colors"
              >
                <div className="p-3 bg-primary/20 rounded-lg">
                  <span className="material-symbols-outlined text-primary text-2xl">
                    science
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#111816] dark:text-white">
                    Lab Dashboard
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Test results
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

