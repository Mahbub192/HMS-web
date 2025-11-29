"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function ReceptionistDashboard() {
  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="receptionist" />
      <main className="flex-1 overflow-y-auto">
        <Header />
        <div className="p-6 lg:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111816] dark:text-white">
              Receptionist Dashboard
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/receptionist/patients/new"
                className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-5 text-base font-bold leading-normal tracking-[0.015em] text-background-dark"
              >
                <span className="material-symbols-outlined">person_add</span>
                <span className="truncate">New Patient Registration</span>
              </Link>
              <Link
                href="/admin/appointments/create"
                className="flex h-12 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#f0f4f3] dark:bg-[#20342d] px-5 text-base font-bold leading-normal tracking-[0.015em] text-[#111816] dark:text-white"
              >
                <span className="material-symbols-outlined">book_online</span>
                <span className="truncate">Book New Appointment</span>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-1 flex-col gap-2 rounded-xl border border-[#e1e4e8] dark:border-[#2c3e38] bg-white dark:bg-[#182c25] p-6">
              <p className="text-base font-medium leading-normal text-[#61897c] dark:text-[#8fa8a1]">
                Beds Available
              </p>
              <p className="text-3xl font-bold leading-tight tracking-tight text-[#111816] dark:text-white">
                28
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-xl border border-[#e1e4e8] dark:border-[#2c3e38] bg-white dark:bg-[#182c25] p-6">
              <p className="text-base font-medium leading-normal text-[#61897c] dark:text-[#8fa8a1]">
                Beds Occupied
              </p>
              <p className="text-3xl font-bold leading-tight tracking-tight text-[#111816] dark:text-white">
                72
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-xl border border-[#e1e4e8] dark:border-[#2c3e38] bg-white dark:bg-[#182c25] p-6">
              <p className="text-base font-medium leading-normal text-[#61897c] dark:text-[#8fa8a1]">
                Pending Payments
              </p>
              <p className="text-3xl font-bold leading-tight tracking-tight text-[#111816] dark:text-white">
                15
              </p>
            </div>
            <div className="flex flex-1 flex-col gap-2 rounded-xl border border-[#e1e4e8] dark:border-[#2c3e38] bg-white dark:bg-[#182c25] p-6">
              <p className="text-base font-medium leading-normal text-[#61897c] dark:text-[#8fa8a1]">
                Payments Received Today
              </p>
              <p className="text-3xl font-bold leading-tight tracking-tight text-[#111816] dark:text-white">
                $8,450
              </p>
            </div>
          </div>

          {/* Grid for main content */}
          <div className="mt-8 grid grid-cols-12 gap-6">
            {/* Queue Management */}
            <div className="col-span-12 rounded-xl border border-[#e1e4e8] dark:border-[#2c3e38] bg-white dark:bg-[#182c25] p-6 lg:col-span-5">
              <h3 className="text-lg font-bold text-[#111816] dark:text-white">Queue Management</h3>
              <p className="mb-4 text-sm text-[#61897c] dark:text-[#8fa8a1]">
                Real-time patient status
              </p>
              <div className="flex flex-col gap-4">
                {[
                  {
                    name: "Liam Johnson",
                    doctor: "Dr. Davis",
                    status: "Waiting",
                    time: "12m",
                    statusColor: "bg-orange-500/20 text-orange-500",
                    image:
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuCkvuiEMibXuJcxBWK9gLMP_3gfpFcgO610a0OqqJfKjFQYnHcN9dggGu-EdXqBt1WpKf33wZcon2ODgfnd3ah4cJlDzD7-xBS8_mly0_pqhLtnFi1O2e7RGliLObRoyIGopgJOG_wKa6aSUHKujfzPEUMRkjbNVnPe1qOZzYi6u2FOB0Uv2muZGIAbJI9y6b8mWJ0MBbHZZOZol6GNKftfb-HZn1NAWCHar8csQ34G4VGQla7p2qifMaWPlrDhLrs3UO2Hk-2jTzRl",
                  },
                  {
                    name: "Olivia Smith",
                    doctor: "Dr. Martinez",
                    status: "With Doctor",
                    time: "5m",
                    statusColor: "bg-blue-500/20 text-blue-500",
                    image:
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQYHF9U9N9Brav8YKIMQjY0rhFUwTmwkuIpnL87bQGpcYpWYEqwMyaTIo_-QhHYXGcm2-IPLzNb2C0qXuu6CRrRMvubj4sfVM32jo-tmzxXJ7k-XrfnbmCzUjf8K9nRCVPpN9nD9JBHty8eM2GUnEUPb4kqwwZw1MYF_Pta67p2uBzyJyPtyS3aGcLrqAkRIYMsszmlaFMdaLsuH9KEzpR7F8ynPZVuNbUSwyHGDgHP7XtOQsmksciDX-E6v_HTfTuEcGPTpoT-ds0",
                  },
                  {
                    name: "Noah Williams",
                    doctor: "Dr. Chen",
                    status: "Billing",
                    time: "25m",
                    statusColor: "bg-primary/20 text-primary",
                    image:
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0U2gibZy0cVsiEx-FPicQkISjfnC31Zp51uc3ECoqZTSfk8YKRYdfZSckA2Vqfbap-SLcnLjPp4K-NKhtg3-kSulK8cY99LFDZj4mAgn-aMocWw2hTtJEoRwrB1F0KDVBMEe18yANgQJA4HmPOlJnSBKqvlzpbkrCI-Y8CVGZ--M6166N4yVNU1e5V32NmY6dB0q03LCkJ9rXNcU7Yowg9PamiaIyY80DltlbSKsmrS4uzGdG4plMmSXFPbarIvxmqBh0PTf1_K2l",
                  },
                  {
                    name: "Emma Jones",
                    doctor: "Dr. Davis",
                    status: "Waiting",
                    time: "2m",
                    statusColor: "bg-orange-500/20 text-orange-500",
                    image:
                      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxK1Xb_QlEcUau6JAoJD81FgjrkPRbzwQVSvLZxfIpAXkRnIj1qqvfliEelEGz0shUqr5zTH4JefYEywiiW-S4CeFhpVGryzVNXn6EihZmq9KdGBA1dXmjscWB2-zXgoCqVw4OGK6iAvGEtKn3zLdpcg38IiAlc7UE_npt4Qu-TWgRY2Ryiafx0yEFJBAaXya2A1pLn2Lc8nNPZTJRBwlRLTIu3nrGW9ONYYbn8FN4Yt0Ri9YCsNE220ifD1mvsLE2q-XH1PiDgbJ5",
                  },
                ].map((patient, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg bg-[#f0f4f3] dark:bg-[#20342d] p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 rounded-full overflow-hidden">
                        <Image
                          src={patient.image}
                          alt={patient.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold">{patient.name}</p>
                        <p className="text-xs text-[#61897c] dark:text-[#8fa8a1]">
                          {patient.doctor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${patient.statusColor}`}
                      >
                        {patient.status}
                      </span>
                      <p className="text-sm font-medium">{patient.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Appointments */}
            <div className="col-span-12 rounded-xl border border-[#e1e4e8] dark:border-[#2c3e38] bg-white dark:bg-[#182c25] p-6 lg:col-span-7">
              <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                Today's Appointments
              </h3>
              <p className="mb-4 text-sm text-[#61897c] dark:text-[#8fa8a1]">
                List of scheduled appointments
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#e1e4e8] dark:border-[#2c3e38] text-[#61897c] dark:text-[#8fa8a1]">
                      <th className="py-3 pr-3 font-medium">Time</th>
                      <th className="py-3 pr-3 font-medium">Patient</th>
                      <th className="py-3 pr-3 font-medium">Doctor</th>
                      <th className="py-3 pr-3 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        time: "09:00 AM",
                        patient: "James Brown",
                        doctor: "Dr. Martinez",
                        status: "Completed",
                        statusColor: "bg-green-500/20 text-green-500",
                      },
                      {
                        time: "09:30 AM",
                        patient: "Ava Rodriguez",
                        doctor: "Dr. Chen",
                        status: "Completed",
                        statusColor: "bg-green-500/20 text-green-500",
                      },
                      {
                        time: "10:00 AM",
                        patient: "Olivia Smith",
                        doctor: "Dr. Martinez",
                        status: "Checked-in",
                        statusColor: "bg-blue-500/20 text-blue-500",
                      },
                      {
                        time: "10:30 AM",
                        patient: "Ethan Taylor",
                        doctor: "Dr. Davis",
                        status: "Scheduled",
                        statusColor: "bg-gray-500/20 text-gray-500",
                      },
                      {
                        time: "11:00 AM",
                        patient: "Sophia Garcia",
                        doctor: "Dr. Chen",
                        status: "No-show",
                        statusColor: "bg-red-500/20 text-red-500",
                      },
                    ].map((appointment, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-[#e1e4e8] dark:border-[#2c3e38]"
                      >
                        <td className="py-4 pr-3">{appointment.time}</td>
                        <td className="py-4 pr-3 font-semibold">
                          {appointment.patient}
                        </td>
                        <td className="py-4 pr-3">{appointment.doctor}</td>
                        <td className="py-4 pr-3 text-right">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${appointment.statusColor}`}
                          >
                            {appointment.status}
                          </span>
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

