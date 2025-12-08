"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useState } from "react";

interface DuePayment {
  id: string;
  date: string;
  amount: number;
  paymentMethod: string;
  receiptNo: string;
  collectedBy: string;
  remarks: string;
}

export default function IPDDueCollectionPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    bedNo: string;
    ward: string;
    admissionDate: string;
    totalAdvance: number;
    totalBilled: number;
    dueAmount: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    collectionDate: new Date().toISOString().split("T")[0],
    collectionTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    dueAmount: "",
    paymentMethod: "Cash",
    referenceNo: "",
    remarks: "",
    collectedBy: "",
  });

  const [dueHistory, setDueHistory] = useState<DuePayment[]>([]);

  // Sample patient data with dues
  const samplePatients = [
    {
      id: "P-10254",
      name: "Liam Johnson",
      age: 35,
      gender: "Male",
      bedNo: "ICU-05",
      ward: "ICU",
      admissionDate: "2024-01-15",
      totalAdvance: 50000,
      totalBilled: 65000,
      dueAmount: 15000,
    },
    {
      id: "P-10255",
      name: "Olivia Smith",
      age: 28,
      gender: "Female",
      bedNo: "GEN-102",
      ward: "General Ward",
      admissionDate: "2024-01-16",
      totalAdvance: 30000,
      totalBilled: 45000,
      dueAmount: 15000,
    },
    {
      id: "P-10256",
      name: "Noah Williams",
      age: 42,
      gender: "Male",
      bedNo: "GEN-205",
      ward: "General Ward",
      admissionDate: "2024-01-17",
      totalAdvance: 20000,
      totalBilled: 35000,
      dueAmount: 15000,
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
    setFormData({
      ...formData,
      dueAmount: patient.dueAmount.toString(),
    });
    // Load due payment history
    setDueHistory([
      {
        id: "DUE-001",
        date: "2024-01-20",
        amount: 5000,
        paymentMethod: "Cash",
        receiptNo: "RCP-2024-001",
        collectedBy: "John Doe",
        remarks: "Partial payment",
      },
      {
        id: "DUE-002",
        date: "2024-01-22",
        amount: 3000,
        paymentMethod: "Card",
        receiptNo: "RCP-2024-002",
        collectedBy: "Jane Smith",
        remarks: "Second installment",
      },
    ]);
  };

  const generateReceiptNo = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, "0");
    return `RCP-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    const amount = parseFloat(formData.dueAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid due amount");
      return;
    }
    if (amount > selectedPatient.dueAmount) {
      alert(
        `Amount cannot exceed due amount of $${selectedPatient.dueAmount.toLocaleString()}`
      );
      return;
    }

    const receiptNo = generateReceiptNo();
    const newPayment: DuePayment = {
      id: `DUE-${Date.now()}`,
      date: formData.collectionDate,
      amount: amount,
      paymentMethod: formData.paymentMethod,
      receiptNo: receiptNo,
      collectedBy: formData.collectedBy || "Current User",
      remarks: formData.remarks,
    };

    setDueHistory([newPayment, ...dueHistory]);

    // Update patient's due amount
    const remainingDue = selectedPatient.dueAmount - amount;
    setSelectedPatient({
      ...selectedPatient,
      totalAdvance: selectedPatient.totalAdvance + amount,
      dueAmount: remainingDue,
    });

    console.log("Due Collection Data:", {
      patient: selectedPatient,
      formData,
      newPayment,
      remainingDue,
    });

    alert(
      `Due collected successfully!\nAmount: $${amount.toLocaleString()}\nReceipt No: ${receiptNo}\nRemaining Due: $${remainingDue.toLocaleString()}`
    );

    // Reset form
    setFormData({
      ...formData,
      dueAmount: remainingDue > 0 ? remainingDue.toString() : "",
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
                IPD Due Collection
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                IPD DUE COLLECTION
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Collect pending dues from IPD patients.
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
                              (p.name
                                .toLowerCase()
                                .includes(patientSearch.toLowerCase()) ||
                                p.id
                                  .toLowerCase()
                                  .includes(patientSearch.toLowerCase())) &&
                              p.dueAmount > 0
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
                                {patient.id} • Bed: {patient.bedNo} • Due: $
                                {patient.dueAmount.toLocaleString()}
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
                              ID: {selectedPatient.id} • {selectedPatient.age}{" "}
                              years • {selectedPatient.gender}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              Bed: {selectedPatient.bedNo} • Ward:{" "}
                              {selectedPatient.ward}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPatient(null);
                              setPatientSearch("");
                              setDueHistory([]);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">
                              close
                            </span>
                          </button>
                        </div>
                        {/* Financial Summary */}
                        <div className="grid grid-cols-3 gap-3 mt-4">
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-xs text-blue-800 dark:text-blue-300">
                              Total Advance
                            </p>
                            <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                              ${selectedPatient.totalAdvance.toLocaleString()}
                            </p>
                          </div>
                          <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                            <p className="text-xs text-orange-800 dark:text-orange-300">
                              Total Billed
                            </p>
                            <p className="text-lg font-bold text-orange-700 dark:text-orange-400">
                              ${selectedPatient.totalBilled.toLocaleString()}
                            </p>
                          </div>
                          <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <p className="text-xs text-red-800 dark:text-red-300">
                              Due Amount
                            </p>
                            <p className="text-lg font-bold text-red-700 dark:text-red-400">
                              ${selectedPatient.dueAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Due Collection Form */}
                {selectedPatient && selectedPatient.dueAmount > 0 && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Collect Due Payment
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
                          Due Amount to Collect:{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="dueAmount"
                          value={formData.dueAmount}
                          onChange={handleInputChange}
                          required
                          min="0"
                          max={selectedPatient.dueAmount}
                          step="0.01"
                          placeholder={`Max: $${selectedPatient.dueAmount.toLocaleString()}`}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <p className="text-xs text-[#61897c] dark:text-gray-400 mt-1">
                          Maximum collectable: $
                          {selectedPatient.dueAmount.toLocaleString()}
                        </p>
                      </div>
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
                          <option value="Card">Card</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cheque">Cheque</option>
                          <option value="UPI">UPI</option>
                          <option value="Other">Other</option>
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
                            account_balance_wallet
                          </span>
                          <span>Collect Due Payment</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {selectedPatient && selectedPatient.dueAmount <= 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6 text-center">
                    <span className="material-symbols-outlined text-4xl text-green-500 mb-2">
                      check_circle
                    </span>
                    <p className="text-green-700 dark:text-green-400 font-semibold">
                      No pending dues for this patient
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column - Payment History */}
              <div className="lg:col-span-1">
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Due Payment History
                    </h3>
                    {dueHistory.length > 0 ? (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {dueHistory.map((payment) => (
                          <div
                            key={payment.id}
                            className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                                {payment.receiptNo}
                              </span>
                              <span className="text-xs text-[#61897c] dark:text-gray-400">
                                {new Date(payment.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-[#111816] dark:text-white">
                                ${payment.amount.toLocaleString()}
                              </span>
                              <span className="text-xs text-[#61897c] dark:text-gray-400">
                                {payment.paymentMethod}
                              </span>
                            </div>
                            <div className="text-xs text-[#61897c] dark:text-gray-400 space-y-1">
                              <p>By: {payment.collectedBy}</p>
                              {payment.remarks && (
                                <p className="mt-1 italic">
                                  "{payment.remarks}"
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
                          No payment history yet
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
