"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";

export default function PatientQueuePage() {
  const queueData = [
    {
      id: 1,
      name: "Liam Johnson",
      doctor: "Dr. Davis",
      status: "Waiting",
      waitTime: "12m",
      token: "T-001",
      statusColor: "bg-orange-500/20 text-orange-500",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCkvuiEMibXuJcxBWK9gLMP_3gfpFcgO610a0OqqJfKjFQYnHcN9dggGu-EdXqBt1WpKf33wZcon2ODgfnd3ah4cJlDzD7-xBS8_mly0_pqhLtnFi1O2e7RGliLObRoyIGopgJOG_wKa6aSUHKujfzPEUMRkjbNVnPe1qOZzYi6u2FOB0Uv2muZGIAbJI9y6b8mWJ0MBbHZZOZol6GNKftfb-HZn1NAWCHar8csQ34G4VGQla7p2qifMaWPlrDhLrs3UO2Hk-2jTzRl",
    },
    {
      id: 2,
      name: "Olivia Smith",
      doctor: "Dr. Martinez",
      status: "In Progress",
      waitTime: "5m",
      token: "T-002",
      statusColor: "bg-blue-500/20 text-blue-500",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDQYHF9U9N9Brav8YKIMQjY0rhFUwTmwkuIpnL87bQGpcYpWYEqwMyaTIo_-QhHYXGcm2-IPLzNb2C0qXuu6CRrRMvubj4sfVM32jo-tmzxXJ7k-XrfnbmCzUjf8K9nRCVPpN9nD9JBHty8eM2GUnEUPb4kqwwZw1MYF_Pta67p2uBzyJyPtyS3aGcLrqAkRIYMsszmlaFMdaLsuH9KEzpR7F8ynPZVuNbUSwyHGDgHP7XtOQsmksciDX-E6v_HTfTuEcGPTpoT-ds0",
    },
    {
      id: 3,
      name: "Noah Williams",
      doctor: "Dr. Chen",
      status: "Billing",
      waitTime: "25m",
      token: "T-003",
      statusColor: "bg-primary/20 text-primary",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD0U2gibZy0cVsiEx-FPicQkISjfnC31Zp51uc3ECoqZTSfk8YKRYdfZSckA2Vqfbap-SLcnLjPp4K-NKhtg3-kSulK8cY99LFDZj4mAgn-aMocWw2hTtJEoRwrB1F0KDVBMEe18yANgQJA4HmPOlJnSBKqvlzpbkrCI-Y8CVGZ--M6166N4yVNU1e5V32NmY6dB0q03LCkJ9rXNcU7Yowg9PamiaIyY80DltlbSKsmrS4uzGdG4plMmSXFPbarIvxmqBh0PTf1_K2l",
    },
    {
      id: 4,
      name: "Emma Jones",
      doctor: "Dr. Davis",
      status: "Waiting",
      waitTime: "2m",
      token: "T-004",
      statusColor: "bg-orange-500/20 text-orange-500",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCxK1Xb_QlEcUau6JAoJD81FgjrkPRbzwQVSvLZxfIpAXkRnIj1qqvfliEelEGz0shUqr5zTH4JefYEywiiW-S4CeFhpVGryzVNXn6EihZmq9KdGBA1dXmjscWB2-zXgoCqVw4OGK6iAvGEtKn3zLdpcg38IiAlc7UE_npt4Qu-TWgRY2Ryiafx0yEFJBAaXya2A1pLn2Lc8nNPZTJRBwlRLTIu3nrGW9ONYYbn8FN4Yt0Ri9YCsNE220ifD1mvsLE2q-XH1PiDgbJ5",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold leading-tight tracking-tight">
                Patient Queue
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Real-time patient queue management
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 h-10 px-4 bg-primary text-[#10221c] text-sm font-bold leading-normal rounded-lg hover:bg-primary/90">
              <span className="material-symbols-outlined text-base">refresh</span>
              <span>Refresh</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Queue List */}
            <div className="lg:col-span-2 space-y-4">
              {queueData.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black/20 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative size-12 rounded-full overflow-hidden">
                      <Image
                        src={patient.image}
                        alt={patient.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111816] dark:text-white">
                        {patient.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {patient.doctor}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Token: {patient.token}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${patient.statusColor}`}
                      >
                        {patient.status}
                      </span>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-1">
                        {patient.waitTime}
                      </p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-primary/10">
                      <span className="material-symbols-outlined text-gray-600 dark:text-gray-400">
                        more_vert
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Current Patient Display */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 bg-white dark:bg-black/20 rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 className="text-lg font-bold text-[#111816] dark:text-white mb-4">
                  Current Patient
                </h3>
                <div className="flex flex-col items-center gap-4 p-6 bg-primary/10 rounded-lg">
                  <div className="relative size-20 rounded-full overflow-hidden">
                    <Image
                      src={queueData[1].image}
                      alt={queueData[1].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-xl font-bold text-[#111816] dark:text-white">
                      {queueData[1].name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {queueData[1].doctor}
                    </p>
                    <p className="text-2xl font-black text-primary mt-2">
                      {queueData[1].token}
                    </p>
                  </div>
                  <button className="w-full py-3 bg-primary text-[#10221c] font-bold rounded-lg hover:bg-primary/90">
                    Call Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

