"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface BillingItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function BillingInformationPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    bedNo?: string;
    ward?: string;
    department?: string;
    admissionDate?: string;
  } | null>(null);

  const [billingItems] = useState<BillingItem[]>([
    { description: "Bed Charges", quantity: 5, unitPrice: 2000, total: 10000 },
    { description: "Consultation Fees", quantity: 1, unitPrice: 5000, total: 5000 },
    { description: "Lab Tests", quantity: 1, unitPrice: 3500, total: 3500 },
    { description: "Medications", quantity: 1, unitPrice: 4500, total: 4500 },
    { description: "Procedure Charges", quantity: 1, unitPrice: 15000, total: 15000 },
  ]);

  const samplePatients = [
    { id: "P-10254", name: "Liam Johnson", bedNo: "ICU-05", ward: "ICU", admissionDate: "2024-01-15" },
    { id: "P-10260", name: "Robert Taylor", department: "Cardiology" },
  ];

  const handlePatientSelect = (patient: typeof samplePatients[0]) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
  };

  const subtotal = billingItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.05; // 5% tax
  const grandTotal = subtotal + tax;
  const advancePaid = 20000;
  const balance = grandTotal - advancePaid;

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
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
                href="/modules/hospital/nurse"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Nurse Section
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Billing Information
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                BILLING INFORMATION
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                View and manage patient billing information.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Patient Selection & Billing Details */}
              <div className="lg:col-span-2 space-y-6">
                {/* Patient Selection */}
                <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                    Patient Information
                  </h3>
                  <div className="relative">
                    <div className="flex-1 relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        search
                      </span>
                      <input
                        type="text"
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        placeholder="Search by Patient Name or ID..."
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 pl-10 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    {patientSearch && !selectedPatient && (
                      <div className="mt-2 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] max-h-48 overflow-y-auto">
                        {samplePatients
                          .filter(
                            (p) =>
                              p.name.toLowerCase().includes(patientSearch.toLowerCase()) ||
                              p.id.toLowerCase().includes(patientSearch.toLowerCase())
                          )
                          .map((patient) => (
                            <button
                              key={patient.id}
                              type="button"
                              onClick={() => handlePatientSelect(patient)}
                              className="w-full px-4 py-2 text-left hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors"
                            >
                              <div className="font-medium text-[#111816] dark:text-white">
                                {patient.name}
                              </div>
                              <div className="text-sm text-[#61897c] dark:text-gray-400">
                                {patient.id}
                                {patient.bedNo && ` • Bed: ${patient.bedNo} • ${patient.ward}`}
                                {patient.department && ` • ${patient.department}`}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                    {selectedPatient && (
                      <div className="mt-4 p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[#111816] dark:text-white">
                              {selectedPatient.name}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              ID: {selectedPatient.id}
                              {selectedPatient.bedNo && ` • Bed: ${selectedPatient.bedNo} • ${selectedPatient.ward}`}
                              {selectedPatient.department && ` • ${selectedPatient.department}`}
                              {selectedPatient.admissionDate && ` • Admission: ${new Date(selectedPatient.admissionDate).toLocaleDateString()}`}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPatient(null);
                              setPatientSearch("");
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Billing Details */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Billing Details
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-[#111816] dark:text-white">
                              Description
                            </th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-[#111816] dark:text-white">
                              Quantity
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-[#111816] dark:text-white">
                              Unit Price
                            </th>
                            <th className="text-right py-3 px-4 text-sm font-semibold text-[#111816] dark:text-white">
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {billingItems.map((item, index) => (
                            <tr
                              key={index}
                              className="border-b border-[#dbe6e2] dark:border-[#2a3f38]"
                            >
                              <td className="py-3 px-4 text-sm text-[#111816] dark:text-white">
                                {item.description}
                              </td>
                              <td className="py-3 px-4 text-sm text-center text-[#61897c] dark:text-gray-400">
                                {item.quantity}
                              </td>
                              <td className="py-3 px-4 text-sm text-right text-[#61897c] dark:text-gray-400">
                                ${item.unitPrice.toLocaleString()}
                              </td>
                              <td className="py-3 px-4 text-sm text-right font-medium text-[#111816] dark:text-white">
                                ${item.total.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38] space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#61897c] dark:text-gray-400">Subtotal</span>
                        <span className="text-[#111816] dark:text-white font-medium">
                          ${subtotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#61897c] dark:text-gray-400">Tax (5%)</span>
                        <span className="text-[#111816] dark:text-white font-medium">
                          ${tax.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <span className="text-[#111816] dark:text-white">Grand Total</span>
                        <span className="text-primary">${grandTotal.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#61897c] dark:text-gray-400">Advance Paid</span>
                          <span className="text-green-600 dark:text-green-400">
                            ${advancePaid.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                          <span className="text-[#111816] dark:text-white">Balance</span>
                          <span
                            className={
                              balance > 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }
                          >
                            ${Math.abs(balance).toLocaleString()}
                            {balance > 0 ? " (Due)" : " (Refund)"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-background-dark text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
                        <span className="material-symbols-outlined">print</span>
                        <span>Print Bill</span>
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                        <span className="material-symbols-outlined">download</span>
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Payment History */}
              <div className="lg:col-span-1">
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Payment History
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                            PAY-001
                          </span>
                          <span className="text-xs text-[#61897c] dark:text-gray-400">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          $10,000
                        </p>
                        <p className="text-xs text-[#61897c] dark:text-gray-400">
                          Cash • Advance Payment
                        </p>
                      </div>
                      <div className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                            PAY-002
                          </span>
                          <span className="text-xs text-[#61897c] dark:text-gray-400">
                            {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                          $10,000
                        </p>
                        <p className="text-xs text-[#61897c] dark:text-gray-400">
                          Card • Advance Payment
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

