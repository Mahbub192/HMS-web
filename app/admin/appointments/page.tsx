"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppointmentsPage() {
  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="flex flex-col gap-1">
            <h1 className="text-[#111816] dark:text-white text-3xl font-bold leading-tight tracking-tight">
              Appointments
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
              View and manage all appointments.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

