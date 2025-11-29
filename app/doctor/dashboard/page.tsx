"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";

export default function DoctorDashboardPage() {
  const todayAppointments = [
    {
      id: 1,
      patientName: "Sarah Lee",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDNrhOxFRPfDVgEDXjKBme5_bq38Ice3w35Vz77-xCPU1kb8J8Bwf9x9Iuiub4bF-vc4mDQOveg8XlirS6JENXwpbh67D_f_JH2lUvnUVTfputlLKznVcM_mJKHcStZFhrf_SNGkGA9SOBT36Kd8hDfmyP8GIQA_PRQzoThboH8qUHF5UDt8YEYN4sZQRoJXj18UlUYBR6QU9F1DeNASWIBZ9qekp_dD8xmiIC4ubGp7hSqZZ1v3uNxS3CqoJxebKlg23o9soYsODOq",
      time: "09:00 AM",
      reason: "Follow-up",
      status: "Waiting",
      statusColor: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: 2,
      patientName: "Michael Brown",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCtchnN16oC67tRy1P1C6bYHzm5L4UgP4mOavQox88MfWI40IUrAtJBjjgTAdAWP8HmnqmqFMpj0T82bv5dwUCd79-5HgOlPy6TD_A8Ta_Nmt99wAtpuWGC1lxuVoLD9AChB3U1LS1ldGPLMuehAQd33SPaD7Ior2B61tHUvyCI3Aq4GjtLDRIsKvPXGwoew2Ak9CP7iDxY_BXbSTYPobQgLpTHxV8lh1D9X5TedTfgNTpHIho_93KwlrLCi8Rkpgv14XfKkr498Dsv",
      time: "09:30 AM",
      reason: "Annual Physical",
      status: "In Progress",
      statusColor: "bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300",
    },
    {
      id: 3,
      patientName: "David Chen",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB0wLVY1BwSJ43U_jzyxK4Am33E6lM1BJj_4LWoMQA90w4Z8rt11erCXDXoMtTJoX6vKEy-pA6_bxVV-_tkcINZO81r1HvGO9UiBmFpAvUwWdur6J20m4RHn8DyUopfph84IMo-Q_ATCmW7xvwm5DeHCebaaAGQwgU6WMUfKU7GjvRGyyzBIbBoF7EXO5mNo7QSjmVzECiVDVwLJqYoEJx9rGh9PpLLiSx35cBHSYiT7miTk_Dlzkf62H-bvTCU2XHnXtPlY6IVOrUW",
      time: "10:15 AM",
      reason: "Pre-op Evaluation",
      status: "Waiting",
      statusColor: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    },
    {
      id: 4,
      patientName: "Maria Garcia",
      patientAvatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAsAAhNjTj3ieQrnJTsMpNNZx3o5xFFNeI-wqC_FyLf-zZO1TOACbclFt_fuBLayMEd5aKXL17WcgQqfNTx7IGH5xzNQC9X8LVWmesbN64fTgqxly2yhni9Ls0JTHe1edwtexZTzmp4eabSueWryFBOWmsp2_6M09683b4k7h0RuSb4bIWJkxjmdBd7cVJLChF3lWPAJF1r-Ki05unLm1G3GFikLBHpZLjF6_CT4XZK7gan8guQ5flfNh8xwJrtLdOu_3UA5EY3Dzld",
      time: "11:00 AM",
      reason: "New Patient",
      status: "Completed",
      statusColor: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    },
  ];

  const labResults = [
    {
      patientName: "John Smith",
      testName: "Chest X-Ray",
      status: "Critical",
      statusColor: "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300",
    },
    {
      patientName: "Jane Doe",
      testName: "Blood Glucose",
      status: "Abnormal",
      statusColor: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300",
    },
    {
      patientName: "Peter Jones",
      testName: "Lipid Panel",
      status: "Normal",
      statusColor: "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300",
    },
  ];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <div className="flex min-h-screen">
        <Sidebar userType="doctor" />
        <main className="flex-1">
          <Header />
          {/* Dashboard Content */}
          <div className="p-8 grid grid-cols-12 gap-6">
            {/* ActionPanel */}
            <div className="col-span-12">
              <div className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-red-200 bg-red-50 p-5 md:flex-row md:items-center dark:bg-red-900/30 dark:border-red-500/30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center size-8 bg-red-500 text-white rounded-full">
                    <span className="material-symbols-outlined text-base">priority_high</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-red-800 text-base font-bold leading-tight dark:text-red-200">
                      Critical Alert: John Smith - STAT Imaging Results Ready
                    </p>
                    <p className="text-red-600 text-base font-normal leading-normal dark:text-red-300">
                      Immediate review required for abnormal findings in chest X-ray.
                    </p>
                  </div>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-4 bg-primary text-[#111816] text-sm font-medium leading-normal">
                  <span className="truncate">View Results</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="col-span-12 xl:col-span-8">
              <div className="flex flex-col bg-white rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-[#111816] text-lg font-bold leading-tight tracking-[-0.015em] px-5 pb-3 pt-5 dark:text-gray-100">
                  Today's Appointments
                </h2>
                <div className="flex overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-white dark:bg-gray-800">
                        <th className="px-5 py-3 text-left text-gray-500 w-1/3 text-sm font-medium leading-normal dark:text-gray-400">
                          PATIENT
                        </th>
                        <th className="px-5 py-3 text-left text-gray-500 w-1/6 text-sm font-medium leading-normal dark:text-gray-400">
                          TIME
                        </th>
                        <th className="px-5 py-3 text-left text-gray-500 w-1/4 text-sm font-medium leading-normal dark:text-gray-400">
                          REASON FOR VISIT
                        </th>
                        <th className="px-5 py-3 text-left text-gray-500 w-1/6 text-sm font-medium leading-normal dark:text-gray-400">
                          STATUS
                        </th>
                        <th className="px-5 py-3 text-left text-gray-500 text-sm font-medium leading-normal dark:text-gray-400">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayAppointments.map((appointment) => (
                        <tr
                          key={appointment.id}
                          className="border-t border-t-gray-200 dark:border-t-gray-700"
                        >
                          <td className="h-[72px] px-5 py-2">
                            <div className="flex items-center gap-3">
                              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 relative overflow-hidden">
                                <Image
                                  src={appointment.patientAvatar}
                                  alt={appointment.patientName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <p className="text-[#111816] font-medium dark:text-gray-200">
                                {appointment.patientName}
                              </p>
                            </div>
                          </td>
                          <td className="h-[72px] px-5 py-2 text-gray-500 text-sm font-normal leading-normal dark:text-gray-400">
                            {appointment.time}
                          </td>
                          <td className="h-[72px] px-5 py-2 text-gray-500 text-sm font-normal leading-normal dark:text-gray-400">
                            {appointment.reason}
                          </td>
                          <td className="h-[72px] px-5 py-2">
                            <span
                              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${appointment.statusColor}`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                          <td className="h-[72px] px-5 py-2">
                            <a
                              className="text-[#111816] hover:text-primary dark:text-gray-300 dark:hover:text-primary text-sm font-bold tracking-[0.015em]"
                              href="#"
                            >
                              View Chart
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Side Cards */}
            <div className="col-span-12 xl:col-span-4 flex flex-col gap-6">
              {/* Upcoming Schedule */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-[#111816] text-lg font-bold leading-tight tracking-[-0.015em] mb-4 dark:text-gray-100">
                  Upcoming Schedule
                </h2>
                <div className="flex justify-between items-center mb-4">
                  <button className="text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <p className="font-semibold text-[#111816] dark:text-gray-200">October 2023</p>
                  <button className="text-gray-500 dark:text-gray-400">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  <span className="text-gray-500 dark:text-gray-500">Su</span>
                  <span className="text-gray-500 dark:text-gray-500">Mo</span>
                  <span className="text-gray-500 dark:text-gray-500">Tu</span>
                  <span className="text-gray-500 dark:text-gray-500">We</span>
                  <span className="text-gray-500 dark:text-gray-500">Th</span>
                  <span className="text-gray-500 dark:text-gray-500">Fr</span>
                  <span className="text-gray-500 dark:text-gray-500">Sa</span>
                  <span className="text-gray-400 dark:text-gray-600">24</span>
                  <span className="text-gray-400 dark:text-gray-600">25</span>
                  <span className="text-gray-400 dark:text-gray-600">26</span>
                  <span className="text-[#111816] dark:text-gray-300 relative">
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"></div>
                    27
                  </span>
                  <span className="text-[#111816] dark:text-gray-300">28</span>
                  <span className="font-bold text-black bg-primary rounded-full size-8 leading-8">
                    29
                  </span>
                  <span className="text-[#111816] dark:text-gray-300">30</span>
                  <span className="text-[#111816] dark:text-gray-300 relative">
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-primary"></div>
                    31
                  </span>
                  <span className="text-gray-400 dark:text-gray-600">1</span>
                </div>
              </div>

              {/* Lab Results */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-[#111816] text-lg font-bold leading-tight tracking-[-0.015em] mb-4 dark:text-gray-100">
                  Lab Results Updates
                </h2>
                <div className="flex flex-col gap-4">
                  {labResults.map((result, index) => (
                    <div key={index} className="flex items-start justify-between">
                      <div className="flex flex-col">
                        <p className="font-medium text-[#111816] dark:text-gray-200">
                          {result.patientName}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{result.testName}</p>
                      </div>
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${result.statusColor}`}
                      >
                        {result.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

