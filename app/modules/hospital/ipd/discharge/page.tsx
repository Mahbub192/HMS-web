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

export default function DischargePage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    bedNo: string;
    ward: string;
    admissionDate: string;
    dischargeDate: string;
    totalAdvance: number;
    totalBilled: number;
    balance: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    dischargeDate: new Date().toISOString().split("T")[0],
    dischargeTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    dischargeType: "Normal",
    dischargeCondition: "Stable",
    dischargeTo: "Home",
    consultant: "",
    dischargeNotes: "",
    dischargedBy: "",
  });

  const [billingItems] = useState<BillingItem[]>([
    { description: "Bed Charges (15 days)", quantity: 15, unitPrice: 2000, total: 30000 },
    { description: "Consultation Fees", quantity: 1, unitPrice: 5000, total: 5000 },
    { description: "Lab Tests", quantity: 1, unitPrice: 3500, total: 3500 },
    { description: "Medications", quantity: 1, unitPrice: 4500, total: 4500 },
    { description: "Procedure Charges", quantity: 1, unitPrice: 15000, total: 15000 },
  ]);

  const samplePatients = [
    {
      id: "P-10254",
      name: "Liam Johnson",
      age: 35,
      gender: "Male",
      bedNo: "ICU-05",
      ward: "ICU",
      admissionDate: "2024-01-15",
      dischargeDate: "2024-01-30",
      totalAdvance: 50000,
      totalBilled: 58000,
      balance: -8000,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientSelect = (patient: typeof samplePatients[0]) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
    setFormData({
      ...formData,
      dischargeDate: patient.dischargeDate,
    });
  };

  const subtotal = billingItems.reduce((sum, item) => sum + item.total, 0);
  const tax = subtotal * 0.05; // 5% tax
  const grandTotal = subtotal + tax;
  const netBalance = selectedPatient ? grandTotal - selectedPatient.totalAdvance : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!formData.consultant) {
      alert("Please enter consultant name");
      return;
    }

    if (netBalance > 0) {
      if (!confirm(`Patient has outstanding balance of $${netBalance.toLocaleString()}. Proceed with discharge?`)) {
        return;
      }
    }

    console.log("Discharge Data:", {
      patient: selectedPatient,
      formData,
      billing: { subtotal, tax, grandTotal, netBalance },
    });

    alert(`Patient ${selectedPatient.name} discharged successfully!\nDischarge ID: DC-${Date.now()}`);
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/modules/hospital"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Hospital
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">Discharge</span>
            </div>

            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                PATIENT DISCHARGE FORM
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Discharge patients from IPD with complete billing summary.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Form */}
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
                                {patient.id} • Bed: {patient.bedNo}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                    {selectedPatient && (
                      <div className="mt-4 p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-[#111816] dark:text-white">
                              {selectedPatient.name}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              ID: {selectedPatient.id} • {selectedPatient.age} years • {selectedPatient.gender}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              Bed: {selectedPatient.bedNo} • Ward: {selectedPatient.ward}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              Admission: {new Date(selectedPatient.admissionDate).toLocaleDateString()}
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

                {/* Discharge Form */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Discharge Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Discharge Date: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="dischargeDate"
                            value={formData.dischargeDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Discharge Time: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="dischargeTime"
                            value={formData.dischargeTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Discharge Type: <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="dischargeType"
                            value={formData.dischargeType}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="Normal">Normal</option>
                            <option value="Against Medical Advice">Against Medical Advice</option>
                            <option value="LAMA">LAMA (Leave Against Medical Advice)</option>
                            <option value="Death">Death</option>
                            <option value="Transfer">Transfer</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Discharge Condition: <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="dischargeCondition"
                            value={formData.dischargeCondition}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="Stable">Stable</option>
                            <option value="Improved">Improved</option>
                            <option value="Unchanged">Unchanged</option>
                            <option value="Deteriorated">Deteriorated</option>
                            <option value="Critical">Critical</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Discharge To: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="dischargeTo"
                          value={formData.dischargeTo}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="Home">Home</option>
                          <option value="Another Hospital">Another Hospital</option>
                          <option value="Rehabilitation Center">Rehabilitation Center</option>
                          <option value="Nursing Home">Nursing Home</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Consultant: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="consultant"
                          value={formData.consultant}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter consultant name"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Discharge Notes:
                        </label>
                        <textarea
                          name="dischargeNotes"
                          value={formData.dischargeNotes}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Enter discharge notes and instructions..."
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Discharged By:
                        </label>
                        <input
                          type="text"
                          name="dischargedBy"
                          value={formData.dischargedBy}
                          onChange={handleInputChange}
                          placeholder="Enter staff name"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="flex justify-center pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <button
                          type="submit"
                          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <span className="material-symbols-outlined">logout</span>
                          <span>Confirm Discharge</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column - Billing Summary */}
              {selectedPatient && (
                <div className="lg:col-span-1">
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Billing Summary
                    </h3>
                    <div className="space-y-3 mb-4">
                      {billingItems.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-[#61897c] dark:text-gray-400">{item.description}</span>
                          <span className="text-[#111816] dark:text-white font-medium">
                            ${item.total.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-3 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-[#61897c] dark:text-gray-400">Subtotal</span>
                        <span className="text-[#111816] dark:text-white">${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#61897c] dark:text-gray-400">Tax (5%)</span>
                        <span className="text-[#111816] dark:text-white">${tax.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <span className="text-[#111816] dark:text-white">Grand Total</span>
                        <span className="text-primary">${grandTotal.toLocaleString()}</span>
                      </div>
                      <div className="pt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#61897c] dark:text-gray-400">Total Advance</span>
                          <span className="text-green-600 dark:text-green-400">
                            ${selectedPatient.totalAdvance.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                          <span className="text-[#111816] dark:text-white">Net Balance</span>
                          <span
                            className={
                              netBalance > 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }
                          >
                            ${Math.abs(netBalance).toLocaleString()}
                            {netBalance > 0 ? " (Due)" : " (Refund)"}
                          </span>
                        </div>
                      </div>
                    </div>
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
