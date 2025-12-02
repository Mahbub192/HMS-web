"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState } from "react";

interface AdvancePayment {
  id: string;
  date: string;
  amount: number;
  paymentMethod: string;
  receiptNo: string;
  collectedBy: string;
  remarks: string;
}

export default function AdvanceCollectionPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    bedNo: string;
    admissionDate: string;
    totalAdvance: number;
    totalBilled: number;
    balance: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    collectionDate: new Date().toISOString().split("T")[0],
    collectionTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    advanceAmount: "",
    paymentMethod: "Cash",
    referenceNo: "",
    remarks: "",
    collectedBy: "",
  });

  const [advanceHistory, setAdvanceHistory] = useState<AdvancePayment[]>([]);

  // Sample patient data
  const samplePatients = [
    {
      id: "P-10254",
      name: "Liam Johnson",
      age: 35,
      gender: "Male",
      bedNo: "B-101",
      admissionDate: "2024-01-15",
      totalAdvance: 15000,
      totalBilled: 12000,
      balance: 3000,
    },
    {
      id: "P-10255",
      name: "Olivia Smith",
      age: 28,
      gender: "Female",
      bedNo: "B-102",
      admissionDate: "2024-01-16",
      totalAdvance: 20000,
      totalBilled: 18000,
      balance: 2000,
    },
    {
      id: "P-10256",
      name: "Noah Williams",
      age: 42,
      gender: "Male",
      bedNo: "B-103",
      admissionDate: "2024-01-17",
      totalAdvance: 10000,
      totalBilled: 15000,
      balance: -5000,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientSelect = (patient: (typeof samplePatients)[0]) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
    // Load advance history for selected patient
    setAdvanceHistory([
      {
        id: "ADV-001",
        date: "2024-01-15",
        amount: 10000,
        paymentMethod: "Cash",
        receiptNo: "RCP-2024-001",
        collectedBy: "John Doe",
        remarks: "Initial advance payment",
      },
      {
        id: "ADV-002",
        date: "2024-01-18",
        amount: 5000,
        paymentMethod: "Card",
        receiptNo: "RCP-2024-002",
        collectedBy: "Jane Smith",
        remarks: "Additional advance",
      },
    ]);
  };

  const generateReceiptNo = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `ADV-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!formData.advanceAmount || parseFloat(formData.advanceAmount) <= 0) {
      alert("Please enter a valid advance amount");
      return;
    }

    const newAdvance: AdvancePayment = {
      id: `ADV-${Date.now()}`,
      date: formData.collectionDate,
      amount: parseFloat(formData.advanceAmount),
      paymentMethod: formData.paymentMethod,
      receiptNo: generateReceiptNo(),
      collectedBy: formData.collectedBy || "Current User",
      remarks: formData.remarks,
    };

    setAdvanceHistory([newAdvance, ...advanceHistory]);

    // Update patient balance
    if (selectedPatient) {
      setSelectedPatient({
        ...selectedPatient,
        totalAdvance: selectedPatient.totalAdvance + newAdvance.amount,
        balance: selectedPatient.balance + newAdvance.amount,
      });
    }

    console.log("Advance Collection Data:", {
      patient: selectedPatient,
      formData,
      newAdvance,
    });

    alert(
      `Advance payment of $${newAdvance.amount} collected successfully!\nReceipt No: ${newAdvance.receiptNo}`
    );

    // Reset form
    setFormData({
      ...formData,
      advanceAmount: "",
      referenceNo: "",
      remarks: "",
    });
  };

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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                /
              </span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Advance Collection
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                ADVANCE COLLECTION FORM
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Collect advance payments from IPD patients.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Patient Selection Section */}
                <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                    Patient Information
                  </h3>
                  <div className="relative">
                    <div className="flex items-center gap-2">
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
                    </div>
                    {/* Patient Suggestions */}
                    {patientSearch && !selectedPatient && (
                      <div className="mt-2 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] max-h-48 overflow-y-auto">
                        {samplePatients
                          .filter(
                            (p) =>
                              p.name
                                .toLowerCase()
                                .includes(patientSearch.toLowerCase()) ||
                              p.id
                                .toLowerCase()
                                .includes(patientSearch.toLowerCase())
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
                                {patient.id} • {patient.age} years •{" "}
                                {patient.gender} • Bed: {patient.bedNo}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                    {/* Selected Patient Display */}
                    {selectedPatient && (
                      <div className="mt-4 p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-[#111816] dark:text-white">
                              {selectedPatient.name}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              ID: {selectedPatient.id} • Age:{" "}
                              {selectedPatient.age} • {selectedPatient.gender} •
                              Bed: {selectedPatient.bedNo}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400 mt-1">
                              Admission Date:{" "}
                              {new Date(
                                selectedPatient.admissionDate
                              ).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPatient(null);
                              setPatientSearch("");
                              setAdvanceHistory([]);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">
                              close
                            </span>
                          </button>
                        </div>
                        {/* Financial Summary */}
                        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                          <div>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">
                              Total Advance
                            </p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                              ${selectedPatient.totalAdvance.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">
                              Total Billed
                            </p>
                            <p className="text-lg font-bold text-[#111816] dark:text-white">
                              ${selectedPatient.totalBilled.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">
                              Balance
                            </p>
                            <p
                              className={`text-lg font-bold ${
                                selectedPatient.balance >= 0
                                  ? "text-green-600 dark:text-green-400"
                                  : "text-red-600 dark:text-red-400"
                              }`}
                            >
                              ${selectedPatient.balance.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Advance Collection Form */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Advance Payment Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Collection Date:{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="collectionDate"
                            value={formData.collectionDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Collection Time:{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="collectionTime"
                            value={formData.collectionTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Advance Amount:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#111816] dark:text-white font-semibold">
                            $
                          </span>
                          <input
                            type="number"
                            name="advanceAmount"
                            value={formData.advanceAmount}
                            onChange={handleInputChange}
                            required
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pl-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Payment Method:{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="Cash">Cash</option>
                            <option value="Card">Card (Debit/Credit)</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cheque">Cheque</option>
                            <option value="UPI">UPI</option>
                            <option value="Mobile Banking">
                              Mobile Banking
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Reference No / Transaction ID:
                          </label>
                          <input
                            type="text"
                            name="referenceNo"
                            value={formData.referenceNo}
                            onChange={handleInputChange}
                            placeholder="Enter reference number if applicable"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Collected By:
                        </label>
                        <input
                          type="text"
                          name="collectedBy"
                          value={formData.collectedBy}
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
                          <span className="material-symbols-outlined">
                            payments
                          </span>
                          <span>Collect Advance Payment</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column - Advance History */}
              <div className="lg:col-span-1">
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Advance Payment History
                    </h3>
                    {advanceHistory.length > 0 ? (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {advanceHistory.map((advance) => (
                          <div
                            key={advance.id}
                            className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                                {advance.receiptNo}
                              </span>
                              <span className="text-sm font-bold text-green-600 dark:text-green-400">
                                ${advance.amount.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-xs text-[#61897c] dark:text-gray-400 space-y-1">
                              <p>
                                Date:{" "}
                                {new Date(advance.date).toLocaleDateString()}
                              </p>
                              <p>Method: {advance.paymentMethod}</p>
                              <p>By: {advance.collectedBy}</p>
                              {advance.remarks && (
                                <p className="mt-1 italic">
                                  "{advance.remarks}"
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                          history
                        </span>
                        <p className="text-sm text-[#61897c] dark:text-gray-400">
                          No advance payments recorded yet
                        </p>
                      </div>
                    )}
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
