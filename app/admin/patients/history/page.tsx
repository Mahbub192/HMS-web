"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function PatientHistoryPage() {
  const [activeTab, setActiveTab] = useState("Diagnoses");

  const timelineEvents = [
    {
      date: "October 15, 2023",
      title: "Annual Check-up & Consultation",
      doctor: "Dr. Emily Carter • Cardiology",
      description:
        "Routine annual physical. Blood pressure noted as slightly elevated. ECG normal. Advised lifestyle modifications and follow-up in 3 months.",
    },
    {
      date: "June 2, 2023",
      title: "Emergency Admission",
      doctor: "Dr. Alan Grant • Emergency Medicine",
      description:
        "Patient presented with symptoms of acute appendicitis. Confirmed via ultrasound. Admitted for emergency appendectomy.",
    },
    {
      date: "June 2, 2023",
      title: "Procedure: Appendectomy",
      doctor: "Dr. Laura Dern • General Surgery",
      description:
        "Successful laparoscopic appendectomy performed. No complications. Patient recovered well post-op.",
    },
    {
      date: "February 20, 2022",
      title: "Initial Patient Registration",
      doctor: "Admissions Desk",
      description:
        "Patient registered with the hospital system for the first time. Full medical history and insurance details recorded.",
    },
  ];

  const diagnoses = [
    {
      name: "Hypertension (Stage 1)",
      date: "Oct 15, 2023",
      doctor: "Dr. Carter",
      status: "Active",
      statusColor:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300",
    },
    {
      name: "Acute Appendicitis",
      date: "June 2, 2023",
      doctor: "Dr. Grant",
      status: "Resolved",
      statusColor:
        "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    },
    {
      name: "Allergic Reaction to Penicillin",
      date: "Feb 20, 2022",
      doctor: "Dr. House",
      status: "Chronic",
      statusColor:
        "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <a
                href="/admin/patients"
                className="text-gray-500 dark:text-gray-400 hover:text-primary text-base font-medium leading-normal"
              >
                Patients
              </a>
              <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                /
              </span>
              <a
                href="#"
                className="text-gray-500 dark:text-gray-400 hover:text-primary text-base font-medium leading-normal"
              >
                Jameson Smith
              </a>
              <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                History
              </span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between gap-3 mb-6 items-center">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Patient History
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Comprehensive medical record and timeline of events.
                </p>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em]">
                <span className="material-symbols-outlined mr-2 text-base">
                  add
                </span>
                <span className="truncate">Add New Record</span>
              </button>
            </div>

            {/* Profile Header */}
            <div className="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 border border-gray-200 dark:border-gray-800 rounded-xl mb-8">
              <div className="flex w-full flex-col gap-4 md:flex-row md:justify-between md:items-center">
                <div className="flex gap-4 items-center">
                  <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-24 w-24 flex-shrink-0 relative overflow-hidden">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwDz8fMTdNfZOoOrBHpwGRWu8Hr0Qqb8epOnqcqiUp4vdQvW-lNGMWmfZsG930CQvoRPVkskbhcOXqGXfh4EDGWFpdvj0S2aXklUkvasF0BpS40OK7ExKYNJHq1r038hMDKJ9Fa9xzCN81qZl1j6AwVCD0e9XP46JIDYx9RetNVaPnYKLETvjxs5dmtkYDVMCfePALXryAvLhFSxEqEszc0yx2BuXLwZZRqqC5OjFoG5Vzzv3lE1RsOYU6AjRuCif7eBNOllriUV52"
                      alt="Jameson Smith"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <p className="text-[#111816] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                      Jameson Smith
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                      PID: 8B4567 • Male • 42 years • O+
                    </p>
                    <div className="mt-1 flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 rounded-full w-fit">
                      <span className="material-symbols-outlined text-red-600 dark:text-red-400 text-xl">
                        warning
                      </span>
                      <p className="text-red-600 dark:text-red-400 text-sm font-medium leading-normal">
                        Allergy: Penicillin
                      </p>
                    </div>
                  </div>
                </div>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] md:w-auto">
                  <span className="material-symbols-outlined mr-2 text-base">
                    print
                  </span>
                  <span className="truncate">Print Summary</span>
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-gray-500 dark:text-gray-400 flex bg-white dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg border border-r-0 border-gray-200 dark:border-gray-700">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-l-0 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-gray-200 dark:focus:border-gray-700 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
                    placeholder="Search patient history by event, diagnosis, or doctor..."
                  />
                </div>
              </label>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-12 gap-8">
              {/* Left Pane: Timeline */}
              <div className="col-span-12 lg:col-span-7">
                <h2 className="text-xl font-bold text-[#111816] dark:text-white mb-4">
                  Timeline
                </h2>
                <div className="relative flex flex-col gap-8 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[34px] top-1 h-4 w-4 rounded-full bg-primary border-4 border-background-light dark:border-background-dark"></div>
                      <div className="bg-white dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          {event.date}
                        </p>
                        <h3 className="font-bold text-[#111816] dark:text-white">
                          {event.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {event.doctor}
                        </p>
                        <p className="text-sm text-[#111816] dark:text-white mt-2">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Pane: Tabbed Details */}
              <div className="col-span-12 lg:col-span-5">
                <div className="w-full">
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-6">
                      {[
                        "Diagnoses",
                        "Medications",
                        "Lab Results",
                        "Documents",
                      ].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                            activeTab === tab
                              ? "border-primary text-primary"
                              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-[#111816] dark:hover:text-white hover:border-gray-200 dark:hover:border-gray-700"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Tab Content */}
                  {activeTab === "Diagnoses" && (
                    <div className="flex flex-col gap-4">
                      {diagnoses.map((diagnosis, index) => (
                        <div
                          key={index}
                          className="bg-white dark:bg-gray-800/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-[#111816] dark:text-white">
                                {diagnosis.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Diagnosed: {diagnosis.date} by{" "}
                                {diagnosis.doctor}
                              </p>
                            </div>
                            <span
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${diagnosis.statusColor}`}
                            >
                              {diagnosis.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "Medications" && (
                    <div className="flex flex-col gap-4">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Medication history will be displayed here.
                      </p>
                    </div>
                  )}

                  {activeTab === "Lab Results" && (
                    <div className="flex flex-col gap-4">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Lab results will be displayed here.
                      </p>
                    </div>
                  )}

                  {activeTab === "Documents" && (
                    <div className="flex flex-col gap-4">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Documents will be displayed here.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
