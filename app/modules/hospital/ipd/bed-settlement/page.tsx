"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface SettlementRecord {
  id: string;
  date: string;
  bedNo: string;
  ward: string;
  daysOccupied: number;
  dailyCharge: number;
  totalCharge: number;
  advancePaid: number;
  balance: number;
  settledBy: string;
  remarks: string;
}

interface BillingItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function BedSettlementPage() {
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
    daysOccupied: number;
    dailyCharge: number;
    totalBedCharge: number;
    advancePaid: number;
    otherCharges: number;
    totalCharges: number;
    balance: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    settlementDate: new Date().toISOString().split("T")[0],
    settlementTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    paymentMethod: "Cash",
    referenceNo: "",
    remarks: "",
    settledBy: "",
  });

  const [settlementHistory, setSettlementHistory] = useState<SettlementRecord[]>([]);
  const [billingItems] = useState<BillingItem[]>([
    { description: "Bed Charges", quantity: 15, unitPrice: 2000, total: 30000 },
    { description: "Consultation Fees", quantity: 1, unitPrice: 5000, total: 5000 },
    { description: "Lab Tests", quantity: 1, unitPrice: 3500, total: 3500 },
    { description: "Medications", quantity: 1, unitPrice: 4500, total: 4500 },
    { description: "Procedure Charges", quantity: 1, unitPrice: 15000, total: 15000 },
  ]);

  // Sample patient data
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
      daysOccupied: 15,
      dailyCharge: 5000,
      totalBedCharge: 75000,
      advancePaid: 50000,
      otherCharges: 28000,
      totalCharges: 103000,
      balance: 53000,
    },
    {
      id: "P-10255",
      name: "Olivia Smith",
      age: 28,
      gender: "Female",
      bedNo: "GEN-102",
      ward: "General Ward",
      admissionDate: "2024-01-16",
      dischargeDate: "2024-01-28",
      daysOccupied: 12,
      dailyCharge: 2000,
      totalBedCharge: 24000,
      advancePaid: 30000,
      otherCharges: 15000,
      totalCharges: 39000,
      balance: -9000,
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
    setSettlementHistory([
      {
        id: "SET-001",
        date: "2024-01-25",
        bedNo: "GEN-101",
        ward: "General Ward",
        daysOccupied: 10,
        dailyCharge: 2000,
        totalCharge: 20000,
        advancePaid: 25000,
        balance: -5000,
        settledBy: "John Doe",
        remarks: "Full settlement with refund",
      },
    ]);
  };

  const generateSettlementId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `SET-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }

    const newSettlement: SettlementRecord = {
      id: generateSettlementId(),
      date: formData.settlementDate,
      bedNo: selectedPatient.bedNo,
      ward: selectedPatient.ward,
      daysOccupied: selectedPatient.daysOccupied,
      dailyCharge: selectedPatient.dailyCharge,
      totalCharge: selectedPatient.totalCharges,
      advancePaid: selectedPatient.advancePaid,
      balance: selectedPatient.balance,
      settledBy: formData.settledBy || "Current User",
      remarks: formData.remarks,
    };

    setSettlementHistory([newSettlement, ...settlementHistory]);

    console.log("Bed Settlement Data:", {
      patient: selectedPatient,
      formData,
      newSettlement,
    });

    const message =
      selectedPatient.balance > 0
        ? `Settlement recorded!\nSettlement ID: ${newSettlement.id}\nOutstanding Balance: $${selectedPatient.balance.toLocaleString()}`
        : `Settlement completed!\nSettlement ID: ${newSettlement.id}\nRefund Amount: $${Math.abs(selectedPatient.balance).toLocaleString()}`;

    alert(message);

    // Reset form
    setSelectedPatient(null);
    setPatientSearch("");
    setSettlementHistory([]);
    setFormData({
      settlementDate: new Date().toISOString().split("T")[0],
      settlementTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      paymentMethod: "Cash",
      referenceNo: "",
      remarks: "",
      settledBy: "",
    });
  };

  const subtotal = selectedPatient
    ? billingItems.reduce((sum, item) => sum + item.total, 0) + selectedPatient.totalBedCharge
    : 0;
  const tax = subtotal * 0.05; // 5% tax
  const grandTotal = subtotal + tax;
  
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
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Bed Settlement
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                BED SETTLEMENT
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Settle bed charges and payments for discharged patients.
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
                                {patient.id} • Bed: {patient.bedNo} • Discharged: {new Date(patient.dischargeDate).toLocaleDateString()}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                    {selectedPatient && (
                      <div className="mt-4 p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
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
                              Admission: {new Date(selectedPatient.admissionDate).toLocaleDateString()} → Discharge: {new Date(selectedPatient.dischargeDate).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPatient(null);
                              setPatientSearch("");
                              setSettlementHistory([]);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                        {/* Bed Charges Summary */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-xs text-blue-800 dark:text-blue-300">Days Occupied</p>
                            <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                              {selectedPatient.daysOccupied} days
                            </p>
                            <p className="text-xs text-blue-600 dark:text-blue-400">
                              ${selectedPatient.dailyCharge}/day
                            </p>
                          </div>
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <p className="text-xs text-green-800 dark:text-green-300">Total Bed Charge</p>
                            <p className="text-lg font-bold text-green-700 dark:text-green-400">
                              ${selectedPatient.totalBedCharge.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Settlement Form */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Settlement Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Settlement Date: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="settlementDate"
                            value={formData.settlementDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Settlement Time: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="settlementTime"
                            value={formData.settlementTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Payment Method: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="Cash">Cash</option>
                          <option value="Card">Card</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cheque">Cheque</option>
                          <option value="UPI">UPI</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Reference No:
                        </label>
                        <input
                          type="text"
                          name="referenceNo"
                          value={formData.referenceNo}
                          onChange={handleInputChange}
                          placeholder="Transaction/Cheque/Reference number"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Settled By:
                        </label>
                        <input
                          type="text"
                          name="settledBy"
                          value={formData.settledBy}
                          onChange={handleInputChange}
                          placeholder="Enter staff name"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Remarks:
                        </label>
                        <textarea
                          name="remarks"
                          value={formData.remarks}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Enter any remarks or notes..."
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="flex justify-center pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <button
                          type="submit"
                          className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                        >
                          <span className="material-symbols-outlined">hotel</span>
                          <span>Confirm Settlement</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column - Billing Summary & History */}
              <div className="lg:col-span-1 space-y-6">
                {/* Billing Summary */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Billing Summary
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#61897c] dark:text-gray-400">Bed Charges ({selectedPatient.daysOccupied} days)</span>
                          <span className="text-[#111816] dark:text-white font-medium">
                            ${selectedPatient.totalBedCharge.toLocaleString()}
                          </span>
                        </div>
                      </div>
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
                            ${selectedPatient.advancePaid.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-bold pt-2 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                          <span className="text-[#111816] dark:text-white">Balance</span>
                          <span
                            className={
                              selectedPatient.balance > 0
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }
                          >
                            ${Math.abs(selectedPatient.balance).toLocaleString()}
                            {selectedPatient.balance > 0 ? " (Due)" : " (Refund)"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Settlement History */}
                {selectedPatient && settlementHistory.length > 0 && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Settlement History
                    </h3>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {settlementHistory.map((settlement) => (
                        <div
                          key={settlement.id}
                          className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                              {settlement.id}
                            </span>
                            <span className="text-xs text-[#61897c] dark:text-gray-400">
                              {new Date(settlement.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">
                            {settlement.ward} • Bed: {settlement.bedNo}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">
                            {settlement.daysOccupied} days × ${settlement.dailyCharge} = ${settlement.totalCharge.toLocaleString()}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            By: {settlement.settledBy}
                          </p>
                        </div>
                      ))}
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
