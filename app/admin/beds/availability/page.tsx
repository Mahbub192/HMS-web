"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function BedAvailabilityPage() {
  const [selectedWard, setSelectedWard] = useState("All Wards");

  const wards = [
    "All Wards",
    "ICU",
    "General Ward",
    "Emergency",
    "Maternity",
    "Pediatrics",
  ];

  // Sample bed data
  const generateBeds = (count: number, statuses: string[]) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  };

  const icuBeds = generateBeds(24, [
    "occupied",
    "vacant",
    "reserved",
    "out-of-service",
  ]);
  const generalBeds = generateBeds(48, [
    "occupied",
    "vacant",
    "reserved",
    "out-of-service",
  ]);
  const emergencyBeds = generateBeds(12, [
    "occupied",
    "vacant",
    "reserved",
    "out-of-service",
  ]);

  const getBedColor = (status: string) => {
    switch (status) {
      case "vacant":
        return "border-green-500 bg-green-50 dark:bg-green-900/20";
      case "occupied":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
      case "reserved":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "out-of-service":
        return "border-gray-400 bg-gray-100 dark:bg-gray-800";
      default:
        return "border-gray-200 bg-white dark:bg-gray-800";
    }
  };

  const getBedStatusText = (status: string) => {
    switch (status) {
      case "vacant":
        return "Vacant";
      case "occupied":
        return "Occupied";
      case "reserved":
        return "Reserved";
      case "out-of-service":
        return "Out of Service";
      default:
        return "Unknown";
    }
  };

  const stats = {
    vacant: 86,
    occupied: 114,
    occupancyRate: 57,
    reserved: 12,
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="px-4 sm:px-6 lg:px-10 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full">
            <div className="flex flex-wrap justify-between items-center gap-4 p-4">
              <div className="flex min-w-72 flex-col gap-2">
                <p className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Bed Availability Map
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                  Real-time overview of bed status across all hospital wards.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                  Status Legend:
                </p>
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded-full bg-green-500"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Vacant
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Occupied
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded-full bg-yellow-500"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Reserved
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded-full bg-gray-400"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Out of Service
                  </span>
                </div>
              </div>
            </div>

            {/* Ward Filter Buttons */}
            <div className="flex gap-3 p-3 overflow-x-auto">
              {wards.map((ward) => (
                <button
                  key={ward}
                  onClick={() => setSelectedWard(ward)}
                  className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 ${
                    selectedWard === ward
                      ? "bg-primary/20 text-primary ring-2 ring-primary"
                      : "bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <p className="text-sm font-medium leading-normal">{ward}</p>
                </button>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  Total Vacant Beds
                </p>
                <p className="text-green-500 tracking-tight text-3xl font-bold leading-tight">
                  {stats.vacant}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  Total Occupied
                </p>
                <p className="text-blue-500 tracking-tight text-3xl font-bold leading-tight">
                  {stats.occupied}
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  Occupancy Rate
                </p>
                <p className="text-[#111816] dark:text-white tracking-tight text-3xl font-bold leading-tight">
                  {stats.occupancyRate}%
                </p>
              </div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400 text-base font-medium leading-normal">
                  Beds Reserved
                </p>
                <p className="text-yellow-500 tracking-tight text-3xl font-bold leading-tight">
                  {stats.reserved}
                </p>
              </div>
            </div>

            {/* Bed Grids */}
            <div className="flex flex-col gap-6">
              {/* ICU Section */}
              {(selectedWard === "All Wards" || selectedWard === "ICU") && (
                <div className="flex flex-col">
                  <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                    ICU - Intensive Care Unit
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-4">
                    {icuBeds.map((bed) => (
                      <div
                        key={bed.id}
                        className={`relative group flex flex-col gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${getBedColor(
                          bed.status
                        )}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#111816] dark:text-white">
                            Bed {bed.id}
                          </span>
                          <div
                            className={`size-3 rounded-full ${
                              bed.status === "vacant"
                                ? "bg-green-500"
                                : bed.status === "occupied"
                                ? "bg-blue-500"
                                : bed.status === "reserved"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {getBedStatusText(bed.status)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* General Ward Section */}
              {(selectedWard === "All Wards" ||
                selectedWard === "General Ward") && (
                <div className="flex flex-col">
                  <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                    General Ward
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-4">
                    {generalBeds.map((bed) => (
                      <div
                        key={bed.id}
                        className={`relative group flex flex-col gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${getBedColor(
                          bed.status
                        )}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#111816] dark:text-white">
                            Bed {bed.id}
                          </span>
                          <div
                            className={`size-3 rounded-full ${
                              bed.status === "vacant"
                                ? "bg-green-500"
                                : bed.status === "occupied"
                                ? "bg-blue-500"
                                : bed.status === "reserved"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {getBedStatusText(bed.status)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Emergency Section */}
              {(selectedWard === "All Wards" ||
                selectedWard === "Emergency") && (
                <div className="flex flex-col">
                  <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                    Emergency Ward
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 px-4">
                    {emergencyBeds.map((bed) => (
                      <div
                        key={bed.id}
                        className={`relative group flex flex-col gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${getBedColor(
                          bed.status
                        )}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#111816] dark:text-white">
                            Bed {bed.id}
                          </span>
                          <div
                            className={`size-3 rounded-full ${
                              bed.status === "vacant"
                                ? "bg-green-500"
                                : bed.status === "occupied"
                                ? "bg-blue-500"
                                : bed.status === "reserved"
                                ? "bg-yellow-500"
                                : "bg-gray-400"
                            }`}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {getBedStatusText(bed.status)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
