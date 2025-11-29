"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";

export default function CreateAppointmentPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const navigateMonth = (direction: number) => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + direction, 1)
    );
  };

  return (
    <div className="flex h-screen w-full bg-background-light dark:bg-background-dark font-display">
      <Sidebar userType="admin" />
      <main className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-12 gap-6 p-6">
          {/* Left Panel: Form */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-wrap justify-between gap-3">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="text-[#111816] dark:text-white text-3xl font-black leading-tight tracking-[-0.03em]">
                  Schedule New Appointment
                </p>
                <p className="text-[#61897c] dark:text-[#a0b8b1] text-base font-normal leading-normal">
                  Fill in the details below to book a new appointment.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-background-dark border border-[#dbe6e2] dark:border-[#2a4038] rounded-xl p-6 flex flex-col gap-6">
              {/* Patient Information */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                  Patient Information
                </h3>
                <label className="flex flex-col w-full">
                  <p className="text-[#111816] dark:text-white text-base font-medium leading-normal pb-2">
                    Search Patient
                  </p>
                  <div className="relative flex w-full flex-1 items-stretch rounded-lg">
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6e2] dark:border-[#2a4038] bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#61897c] dark:placeholder:text-[#a0b8b1] p-[15px] pr-12 text-base font-normal leading-normal"
                      placeholder="Search by name or ID..."
                      defaultValue="Olivia Rhye"
                    />
                    <div className="absolute right-0 top-0 h-full flex items-center pr-[15px] text-[#61897c] dark:text-[#a0b8b1]">
                      <span className="material-symbols-outlined text-2xl">search</span>
                    </div>
                  </div>
                </label>
                <button className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent text-[#111816] dark:text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] border border-[#dbe6e2] dark:border-[#2a4038] hover:bg-[#f0f4f3] dark:hover:bg-[#20342d]">
                  <span className="material-symbols-outlined text-xl">add</span>
                  <span className="truncate">Add New Patient</span>
                </button>
              </div>

              {/* Appointment Details */}
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold text-[#111816] dark:text-white">
                  Appointment Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111816] dark:text-white text-base font-medium leading-normal pb-2">
                      Select Department
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6e2] dark:border-[#2a4038] bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#61897c] dark:placeholder:text-[#a0b8b1] p-[15px] text-base font-normal leading-normal"
                      placeholder="Select a department"
                      defaultValue="Cardiology"
                    />
                  </label>
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-[#111816] dark:text-white text-base font-medium leading-normal pb-2">
                      Select Doctor
                    </p>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6e2] dark:border-[#2a4038] bg-white dark:bg-background-dark focus:border-primary h-14 placeholder:text-[#61897c] dark:placeholder:text-[#a0b8b1] p-[15px] text-base font-normal leading-normal"
                      placeholder="Select a doctor"
                      defaultValue="Dr. Emily Carter"
                    />
                  </label>
                </div>
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-[#111816] dark:text-white text-base font-medium leading-normal pb-2">
                    Reason for Visit
                  </p>
                  <textarea
                    className="form-textarea flex w-full min-w-0 flex-1 resize-y overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-[#dbe6e2] dark:border-[#2a4038] bg-white dark:bg-background-dark focus:border-primary min-h-28 placeholder:text-[#61897c] dark:placeholder:text-[#a0b8b1] p-[15px] text-base font-normal leading-normal"
                    placeholder="E.g., Annual Check-up, Consultation..."
                    defaultValue="Routine Follow-up"
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 mt-4">
                <button className="flex flex-1 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-[#111816] text-base font-bold leading-normal tracking-wide">
                  <span className="truncate">Schedule Appointment</span>
                </button>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-transparent text-[#61897c] dark:text-[#a0b8b1] text-base font-bold leading-normal tracking-wide border border-[#dbe6e2] dark:border-[#2a4038] hover:bg-[#f0f4f3] dark:hover:bg-[#20342d]">
                  <span className="truncate">Cancel</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Calendar */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-white dark:bg-background-dark border border-[#dbe6e2] dark:border-[#2a4038] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 rounded-lg hover:bg-[#f0f4f3] dark:hover:bg-[#20342d]"
                >
                  <span className="material-symbols-outlined text-[#61897c] dark:text-[#a0b8b1]">
                    chevron_left
                  </span>
                </button>
                <h3 className="text-xl font-bold text-[#111816] dark:text-white">
                  {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                </h3>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 rounded-lg hover:bg-[#f0f4f3] dark:hover:bg-[#20342d]"
                >
                  <span className="material-symbols-outlined text-[#61897c] dark:text-[#a0b8b1]">
                    chevron_right
                  </span>
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {/* Week day headers */}
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] py-2"
                  >
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((day, index) => {
                  if (day === null) {
                    return <div key={`empty-${index}`} className="h-12" />;
                  }
                  const isToday =
                    day === new Date().getDate() &&
                    selectedDate.getMonth() === new Date().getMonth() &&
                    selectedDate.getFullYear() === new Date().getFullYear();
                  const hasAppointment = [5, 12, 18, 25].includes(day); // Sample appointments

                  return (
                    <div
                      key={day}
                      className={`h-12 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${
                        isToday
                          ? "bg-primary text-[#111816] font-bold"
                          : hasAppointment
                            ? "bg-primary/10 hover:bg-primary/20"
                            : "hover:bg-[#f0f4f3] dark:hover:bg-[#20342d]"
                      }`}
                    >
                      <span className="text-sm">{day}</span>
                      {hasAppointment && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"></span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Appointments List */}
              <div className="mt-6">
                <h4 className="text-lg font-bold text-[#111816] dark:text-white mb-4">
                  Today's Appointments
                </h4>
                <div className="flex flex-col gap-3">
                  {[
                    { time: "09:00 AM", patient: "James Brown", doctor: "Dr. Martinez" },
                    { time: "10:30 AM", patient: "Ethan Taylor", doctor: "Dr. Davis" },
                    { time: "02:00 PM", patient: "Sophia Garcia", doctor: "Dr. Chen" },
                  ].map((apt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#f0f4f3] dark:bg-[#20342d]"
                    >
                      <div>
                        <p className="font-semibold text-[#111816] dark:text-white">
                          {apt.patient}
                        </p>
                        <p className="text-sm text-[#61897c] dark:text-[#a0b8b1]">
                          {apt.doctor}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-[#61897c] dark:text-[#a0b8b1]">
                        {apt.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

