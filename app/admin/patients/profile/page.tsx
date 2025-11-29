"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import { useState } from "react";

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState("basic");

  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "contact", label: "Contact Details" },
    { id: "insurance", label: "Insurance" },
    { id: "emergency", label: "Emergency Contacts" },
  ];

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 p-8">
        <div className="w-full max-w-7xl mx-auto">
          {/* Page Heading */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <div className="flex flex-col">
              <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Patient Profile
              </h1>
              <p className="text-[#61897c] dark:text-[#a0b8b1] text-base font-normal leading-normal">
                Manage and review patient information.
              </p>
            </div>
            <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="material-symbols-outlined">add</span>
              <span className="truncate">Add New Patient</span>
            </button>
          </div>

          <div className="bg-white dark:bg-[#1a2c26] rounded-xl shadow-sm p-4 sm:p-6">
            {/* Profile Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-[#dbe6e2] dark:border-[#2a4038]">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf9gNiZOODiRboXanpIi0-ZlnmDlmzFy-_c5HoMm8Kc7v1D6wFQlz2cUEAIUUFIL4IvpSqaMe1sS-Q_YaNf8bgsdceBs9xr5GV8DFt0C4XfFgAsdgJw2IzS5dKbuR5Zu0n2uejhSUmEqxy8hcCZN9tN9bMH6bj3VVise1RlM82dKgtJgxQzQY4PKRaRArmZgVfS9WyTLdaCkDvZUfSGMpgckA_bRl5RBq7HwGhgnstxTzvYmunPaVLl0lZRrdh3qwWrztWWUbxx0iw"
                    alt="Isabella Rossi"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#111816] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                    Isabella Rossi
                  </p>
                  <p className="text-[#61897c] dark:text-[#a0b8b1] text-base font-normal leading-normal">
                    Patient ID: P-843592
                  </p>
                  <p className="text-[#61897c] dark:text-[#a0b8b1] text-base font-normal leading-normal">
                    Status: Active, In-Patient
                  </p>
                </div>
              </div>
              <div className="flex w-full gap-3 md:w-auto">
                <button className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-[#111816] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 transition-colors">
                  <span className="truncate">Save Changes</span>
                </button>
                <button className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                  <span className="truncate">Edit Profile</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="pt-2">
              <div className="flex border-b border-[#dbe6e2] dark:border-[#2a4038] -mx-4 sm:-mx-6 px-4 sm:px-6 gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex shrink-0 flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                      activeTab === tab.id
                        ? "border-primary text-primary"
                        : "border-b-transparent text-[#61897c] dark:text-[#a0b8b1] hover:border-primary/50 hover:text-[#111816] dark:hover:text-white"
                    }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                      {tab.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Form Content */}
            <div className="pt-6">
              <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                Basic Information
              </h2>
              <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                <div className="col-span-12 sm:col-span-4">
                  <label
                    className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                    htmlFor="first-name"
                  >
                    First Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                    id="first-name"
                    type="text"
                    defaultValue="Isabella"
                  />
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <label
                    className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                    htmlFor="middle-name"
                  >
                    Middle Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                    id="middle-name"
                    type="text"
                  />
                </div>
                <div className="col-span-12 sm:col-span-4">
                  <label
                    className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                    htmlFor="last-name"
                  >
                    Last Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                    id="last-name"
                    type="text"
                    defaultValue="Rossi"
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                    id="dob"
                    type="date"
                    defaultValue="1990-05-15"
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                    id="gender"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                    htmlFor="blood-type"
                  >
                    Blood Type
                  </label>
                  <select
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                    id="blood-type"
                    defaultValue="O+"
                  >
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                    htmlFor="marital-status"
                  >
                    Marital Status
                  </label>
                  <select
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                    id="marital-status"
                    defaultValue="Married"
                  >
                    <option>Single</option>
                    <option>Married</option>
                    <option>Divorced</option>
                    <option>Widowed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

