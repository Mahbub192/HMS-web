"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface RefundRecord {
  id: string;
  date: string;
  amount: number;
  paymentMethod: string;
  refundNo: string;
  reason: string;
  processedBy: string;
  remarks: string;
}

export default function RefundAmountPage() {
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
    totalRefunded: number;
  } | null>(null);

  const [formData, setFormData] = useState({
    refundDate: new Date().toISOString().split("T")[0],
    refundTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    refundAmount: "",
    paymentMethod: "Cash",
    reason: "",
    referenceNo: "",
    remarks: "",
    processedBy: "",
  });

  const [refundHistory, setRefundHistory] = useState<RefundRecord[]>([]);

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
      totalRefunded: 0,
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
      totalRefunded: 0,
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
      totalRefunded: 0,
    },
    {
      id: "P-10257",
      name: "Emma Davis",
      age: 31,
      gender: "Female",
      bedNo: "B-104",
      admissionDate: "2024-01-18",
      totalAdvance: 25000,
      totalBilled: 20000,
      balance: 5000,
      totalRefunded: 2000,
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
    // Load refund history for selected patient
    if (patient.totalRefunded > 0) {
      setRefundHistory([
        {
          id: "REF-001",
          date: "2024-01-20",
          amount: 2000,
          paymentMethod: "Bank Transfer",
          refundNo: "REF-2024-001",
          reason: "Excess Advance Payment",
          processedBy: "John Doe",
          remarks: "Refund processed as per patient request",
        },
      ]);
    } else {
      setRefundHistory([]);
    }
  };

  const generateRefundNo = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `REF-${year}-${random}`;
  };

  const getAvailableRefundAmount = () => {
    if (!selectedPatient) return 0;
    return Math.max(0, selectedPatient.balance - selectedPatient.totalRefunded);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }

    const refundAmount = parseFloat(formData.refundAmount);
    if (!formData.refundAmount || refundAmount <= 0) {
      alert("Please enter a valid refund amount");
      return;
    }

    const availableRefund = getAvailableRefundAmount();
    if (refundAmount > availableRefund) {
      alert(
        `Refund amount cannot exceed available balance.\nAvailable for refund: $${availableRefund.toLocaleString()}`
      );
      return;
    }

    if (!formData.reason) {
      alert("Please provide a reason for the refund");
      return;
    }

    const newRefund: RefundRecord = {
      id: `REF-${Date.now()}`,
      date: formData.refundDate,
      amount: refundAmount,
      paymentMethod: formData.paymentMethod,
      refundNo: generateRefundNo(),
      reason: formData.reason,
      processedBy: formData.processedBy || "Current User",
      remarks: formData.remarks,
    };

    setRefundHistory([newRefund, ...refundHistory]);

    // Update patient balance
    if (selectedPatient) {
      setSelectedPatient({
        ...selectedPatient,
        totalRefunded: selectedPatient.totalRefunded + newRefund.amount,
        balance: selectedPatient.balance - newRefund.amount,
      });
    }

    console.log("Refund Data:", {
      patient: selectedPatient,
      formData,
      newRefund,
    });

    alert(
      `Refund of $${newRefund.amount} processed successfully!\nRefund No: ${newRefund.refundNo}`
    );

    // Reset form
    setFormData({
      ...formData,
      refundAmount: "",
      referenceNo: "",
      remarks: "",
      reason: "",
    });
  };

  const availableRefund = getAvailableRefundAmount();
  
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
                Refund Amount
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                REFUND AMOUNT FORM
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Process refunds for IPD patients with excess advance payments.
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
                                {patient.id} • {patient.age} years • {patient.gender} • Bed: {patient.bedNo}
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
                              ID: {selectedPatient.id} • Age: {selectedPatient.age} • {selectedPatient.gender} • Bed: {selectedPatient.bedNo}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400 mt-1">
                              Admission Date: {new Date(selectedPatient.admissionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPatient(null);
                              setPatientSearch("");
                              setRefundHistory([]);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                        {/* Financial Summary */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                          <div>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">Total Advance</p>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                              ${selectedPatient.totalAdvance.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">Total Billed</p>
                            <p className="text-lg font-bold text-[#111816] dark:text-white">
                              ${selectedPatient.totalBilled.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">Current Balance</p>
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
                          <div>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">Total Refunded</p>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                              ${selectedPatient.totalRefunded.toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {/* Available Refund Amount */}
                        {availableRefund > 0 && (
                          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-green-800 dark:text-green-300">
                                Available for Refund:
                              </span>
                              <span className="text-lg font-bold text-green-700 dark:text-green-400">
                                ${availableRefund.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        )}
                        {availableRefund <= 0 && (
                          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-red-600 dark:text-red-400">
                                warning
                              </span>
                              <span className="text-sm font-medium text-red-800 dark:text-red-300">
                                No refund available. Patient has no excess balance.
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Refund Form */}
                {selectedPatient && availableRefund > 0 && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Refund Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Refund Date: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="refundDate"
                            value={formData.refundDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Refund Time: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="refundTime"
                            value={formData.refundTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Refund Amount: <span className="text-red-500">*</span>
                          <span className="text-xs text-[#61897c] dark:text-gray-400 ml-2">
                            (Max: ${availableRefund.toLocaleString()})
                          </span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#111816] dark:text-white font-semibold">
                            $
                          </span>
                          <input
                            type="number"
                            name="refundAmount"
                            value={formData.refundAmount}
                            onChange={handleInputChange}
                            required
                            min="0"
                            max={availableRefund}
                            step="0.01"
                            placeholder="0.00"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pl-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Reason for Refund: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Reason</option>
                          <option value="Excess Advance Payment">Excess Advance Payment</option>
                          <option value="Service Cancellation">Service Cancellation</option>
                          <option value="Bed Change Refund">Bed Change Refund</option>
                          <option value="Package Adjustment">Package Adjustment</option>
                          <option value="Discharge Settlement">Discharge Settlement</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Refund Method: <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="Cash">Cash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Card Refund">Card Refund</option>
                            <option value="UPI">UPI</option>
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
                          Processed By:
                        </label>
                        <input
                          type="text"
                          name="processedBy"
                          value={formData.processedBy}
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
                          <span className="material-symbols-outlined">money_off</span>
                          <span>Process Refund</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {selectedPatient && availableRefund <= 0 && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-6xl text-gray-400 mb-4">
                        money_off
                      </span>
                      <p className="text-lg font-semibold text-[#111816] dark:text-white mb-2">
                        No Refund Available
                      </p>
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        This patient has no excess balance available for refund.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Refund History */}
              <div className="lg:col-span-1">
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Refund History
                    </h3>
                    {refundHistory.length > 0 ? (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {refundHistory.map((refund) => (
                          <div
                            key={refund.id}
                            className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                                {refund.refundNo}
                              </span>
                              <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                ${refund.amount.toLocaleString()}
                              </span>
                            </div>
                            <div className="text-xs text-[#61897c] dark:text-gray-400 space-y-1">
                              <p>Date: {new Date(refund.date).toLocaleDateString()}</p>
                              <p>Method: {refund.paymentMethod}</p>
                              <p>Reason: {refund.reason}</p>
                              <p>By: {refund.processedBy}</p>
                              {refund.remarks && (
                                <p className="mt-1 italic">"{refund.remarks}"</p>
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
                          No refunds processed yet
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
