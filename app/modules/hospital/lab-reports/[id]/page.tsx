"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Sample report data
const reportData = {
  reportId: "LR-001234",
  patientId: "P-10254",
  patientName: "Liam Johnson",
  age: 35,
  gender: "Male",
  testName: "Complete Blood Count (CBC)",
  testDate: "2023-10-27",
  collectionDate: "2023-10-27 09:00 AM",
  doctor: "Dr. Emily Carter",
  department: "Hematology",
  results: [
    {
      analyte: "Hemoglobin",
      result: "15.2",
      unit: "g/dL",
      referenceRange: "13.5-17.5",
      status: "Normal",
      statusColor: "text-[#111816] dark:text-white",
    },
    {
      analyte: "Hematocrit",
      result: "55.0",
      unit: "%",
      referenceRange: "41-50",
      status: "High",
      statusColor: "text-red-600 dark:text-red-400",
    },
    {
      analyte: "WBC Count",
      result: "7.5",
      unit: "x10³/μL",
      referenceRange: "4.5-11.0",
      status: "Normal",
      statusColor: "text-[#111816] dark:text-white",
    },
    {
      analyte: "RBC Count",
      result: "5.2",
      unit: "x10⁶/μL",
      referenceRange: "4.5-5.5",
      status: "Normal",
      statusColor: "text-[#111816] dark:text-white",
    },
    {
      analyte: "Platelet Count",
      result: "250",
      unit: "x10³/μL",
      referenceRange: "150-400",
      status: "Normal",
      statusColor: "text-[#111816] dark:text-white",
    },
  ],
  notes: "All parameters are within normal range except Hematocrit which is slightly elevated. Recommend follow-up.",
  pathologist: "Dr. Sarah Mitchell",
  pathologistSignature: "Digitally Signed",
};

export default function LabReportViewPage() {
  const params = useParams();
  const reportId = params.id as string;
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  const handleDownloadPDF = () => {
    alert(`Downloading PDF for report ${reportId}`);
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/modules/hospital"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Hospital
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <Link
                href="/modules/hospital/lab-reports"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Lab Reports
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                {reportId}
              </span>
            </div>

            {/* Header Actions */}
            <div
              className={`flex flex-wrap justify-between items-center gap-4 mb-6 ${
                isPrinting ? "hidden" : ""
              }`}
            >
              <div>
                <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Lab Report {reportId}
                </h1>
                <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal mt-1">
                  {reportData.testName}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary/20 dark:bg-primary/30 px-4 text-sm font-bold text-primary dark:text-primary hover:bg-primary/30 dark:hover:bg-primary/40"
                >
                  <span className="material-symbols-outlined">print</span>
                  <span className="truncate">Print</span>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-background-dark hover:opacity-90"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    download
                  </span>
                  <span className="truncate">Download PDF</span>
                </button>
              </div>
            </div>

            {/* Report Container */}
            <div
              className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-lg p-6 sm:p-8 lg:p-12"
              id="report-container"
            >
              {/* Hospital Header */}
              <div className="flex items-start justify-between border-b border-[#dbe6e2] dark:border-[#2a3f38] pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#111816] dark:text-white">
                    City Central Hospital
                  </h3>
                  <p className="text-xs text-[#61897c] dark:text-gray-400">
                    123 Health St, Meditown, USA
                  </p>
                </div>
                <div className="text-xs font-mono uppercase text-[#61897c] dark:text-gray-400">
                  Lab Report
                </div>
              </div>

              {/* Patient Information */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Patient Name</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.patientName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Patient ID</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.patientId}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Age / Gender</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.age} / {reportData.gender}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Collection Date</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.collectionDate}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Test Name</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.testName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Referring Doctor</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.doctor}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Department</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.department}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">Report ID</p>
                  <p className="text-sm font-semibold text-[#111816] dark:text-white">
                    {reportData.reportId}
                  </p>
                </div>
              </div>

              {/* Results Table */}
              <div className="mb-6">
                <table className="w-full text-sm">
                  <thead className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-[#111816] dark:text-white">
                        Analyte
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-[#111816] dark:text-white">
                        Result
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-[#111816] dark:text-white">
                        Reference Range
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-[#111816] dark:text-white">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                    {reportData.results.map((result, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-[#111816] dark:text-white">
                          {result.analyte}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`font-medium ${result.statusColor}`}>
                            {result.result} {result.unit}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#61897c] dark:text-gray-400">
                          {result.referenceRange}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              result.status === "Normal"
                                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                            }`}
                          >
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Notes */}
              {reportData.notes && (
                <div className="mb-6 p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg">
                  <p className="text-sm font-semibold text-[#111816] dark:text-white mb-2">
                    Pathologist Notes:
                  </p>
                  <p className="text-sm text-[#111816] dark:text-white">{reportData.notes}</p>
                </div>
              )}

              {/* Footer */}
              <div className="border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-[#111816] dark:text-white">
                      {reportData.pathologist}
                    </p>
                    <p className="text-xs text-[#61897c] dark:text-gray-400">
                      {reportData.pathologistSignature}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#61897c] dark:text-gray-400">
                      Report Generated: {new Date().toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

