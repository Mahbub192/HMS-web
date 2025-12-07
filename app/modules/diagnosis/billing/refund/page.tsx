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

export default function DiagnosisRefundPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    totalPaid: number;
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

  const samplePatients = [
    {
      id: "P-10260",
      name: "Robert Taylor",
      age: 45,
      gender: "Male",
      totalPaid: 15000,
      totalBilled: 12000,
      balance: 3000,
      totalRefunded: 0,
    },
    {
      id: "P-10261",
      name: "Emily Davis",
      age: 32,
      gender: "Female",
      totalPaid: 20000,
      totalBilled: 18000,
      balance: 2000,
      totalRefunded: 0,
    },
    {
      id: "P-10262",
      name: "Michael Brown",
      age: 38,
      gender: "Male",
      totalPaid: 10000,
      totalBilled: 15000,
      balance: -5000,
      totalRefunded: 0,
    },
    {
      id: "P-10263",
      name: "Sarah Wilson",
      age: 29,
      gender: "Female",
      totalPaid: 25000,
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
    if (patient.totalRefunded > 0) {
      setRefundHistory([
        {
          id: "REF-001",
          date: "2024-01-20",
          amount: 2000,
          paymentMethod: "Bank Transfer",
          refundNo: "REF-2024-001",
          reason: "Excess Payment",
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
    const amount = parseFloat(formData.refundAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid refund amount");
      return;
    }
    const availableRefund = getAvailableRefundAmount();
    if (amount > availableRefund) {
      alert(`Refund amount cannot exceed available balance of ৳${availableRefund.toLocaleString()}`);
      return;
    }

    const newRefund: RefundRecord = {
      id: Date.now().toString(),
      date: formData.refundDate,
      amount: amount,
      paymentMethod: formData.paymentMethod,
      refundNo: generateRefundNo(),
      reason: formData.reason,
      processedBy: formData.processedBy || "Current User",
      remarks: formData.remarks,
    };

    setRefundHistory([...refundHistory, newRefund]);
    alert(`Refund of ৳${amount.toLocaleString()} processed successfully!\nRefund No: ${newRefund.refundNo}`);

    setFormData({
      ...formData,
      refundAmount: "",
      reason: "",
      referenceNo: "",
      remarks: "",
    });
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="w-full max-w-[1920px] mx-auto">
            {/* Breadcrumbs and Heading */}
            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/modules/diagnosis"
                    className="font-medium text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Diagnosis
                  </Link>
                  <span className="font-medium text-gray-500 dark:text-gray-400">/</span>
                  <Link
                    href="/modules/diagnosis/billing"
                    className="font-medium text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Billing Information
                  </Link>
                  <span className="font-medium text-gray-500 dark:text-gray-400">/</span>
                  <span className="font-medium text-[#111816] dark:text-white">Refund</span>
                </div>
                <h1 className="text-xl font-bold text-[#111816] dark:text-white">REFUND</h1>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
              {/* Left Column - Patient Search and Form */}
              <div className="lg:col-span-2 space-y-2">
                {/* Patient Search */}
                <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                  <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                    Patient Information
                  </h3>
                  <div className="relative">
                    <div className="flex-1 relative">
                      <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                        search
                      </span>
                      <input
                        type="text"
                        value={patientSearch}
                        onChange={(e) => setPatientSearch(e.target.value)}
                        placeholder="Search by Patient Name or ID..."
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-2 py-1 pl-8 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    {patientSearch && !selectedPatient && (
                      <div className="mt-1 rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] max-h-32 overflow-y-auto">
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
                              className="w-full px-2 py-1 text-left hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors text-xs"
                            >
                              <div className="font-medium text-[#111816] dark:text-white">
                                {patient.name}
                              </div>
                              <div className="text-[#61897c] dark:text-gray-400">
                                {patient.id} • {patient.age} years • {patient.gender}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                    {selectedPatient && (
                      <div className="mt-2 p-2 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded border border-[#dbe6e2] dark:border-[#2a3f38]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-xs text-[#111816] dark:text-white">
                              {selectedPatient.name}
                            </p>
                            <p className="text-xs text-[#61897c] dark:text-gray-400">
                              ID: {selectedPatient.id} • {selectedPatient.age} years • {selectedPatient.gender}
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
                            <span className="material-symbols-outlined text-sm">close</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Financial Summary */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                    <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                      Financial Summary
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-[#61897c] dark:text-gray-400">Total Paid</p>
                        <p className="font-semibold text-[#111816] dark:text-white">
                          ৳{selectedPatient.totalPaid.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#61897c] dark:text-gray-400">Total Billed</p>
                        <p className="font-semibold text-[#111816] dark:text-white">
                          ৳{selectedPatient.totalBilled.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#61897c] dark:text-gray-400">Balance</p>
                        <p
                          className={`font-semibold ${
                            selectedPatient.balance >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          ৳{selectedPatient.balance.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[#61897c] dark:text-gray-400">Total Refunded</p>
                        <p className="font-semibold text-[#111816] dark:text-white">
                          ৳{selectedPatient.totalRefunded.toLocaleString()}
                        </p>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <p className="text-[#61897c] dark:text-gray-400">Available for Refund</p>
                        <p className="font-bold text-lg text-primary">
                          ৳{getAvailableRefundAmount().toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Refund Form */}
                {selectedPatient && (
                  <form onSubmit={handleSubmit} className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                    <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                      Refund Details
                    </h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Refund Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="refundDate"
                            value={formData.refundDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Refund Time
                          </label>
                          <input
                            type="time"
                            name="refundTime"
                            value={formData.refundTime}
                            onChange={handleInputChange}
                            className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Refund Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="refundAmount"
                          value={formData.refundAmount}
                          onChange={handleInputChange}
                          required
                          min="0"
                          max={getAvailableRefundAmount()}
                          placeholder="Enter refund amount"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                        <p className="text-xs text-[#61897c] dark:text-gray-400 mt-0.5">
                          Max: ৳{getAvailableRefundAmount().toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Payment Method <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="paymentMethod"
                          value={formData.paymentMethod}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="Cash">Cash</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Card">Card</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Mobile Banking">Mobile Banking</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Reason <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter refund reason"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Reference No
                        </label>
                        <input
                          type="text"
                          name="referenceNo"
                          value={formData.referenceNo}
                          onChange={handleInputChange}
                          placeholder="Enter reference number"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Processed By
                        </label>
                        <input
                          type="text"
                          name="processedBy"
                          value={formData.processedBy}
                          onChange={handleInputChange}
                          placeholder="Enter processor name"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Remarks
                        </label>
                        <textarea
                          name="remarks"
                          value={formData.remarks}
                          onChange={handleInputChange}
                          rows={2}
                          placeholder="Enter any remarks..."
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-4 py-1.5 bg-primary text-background-dark text-xs font-bold rounded hover:opacity-90 transition-opacity"
                      >
                        Process Refund
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column - Refund History */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2 sticky top-3">
                  <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                    Refund History
                  </h3>
                  {refundHistory.length === 0 ? (
                    <p className="text-xs text-[#61897c] dark:text-gray-400 text-center py-4">
                      No refund history available
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {refundHistory.map((refund) => (
                        <div
                          key={refund.id}
                          className="p-2 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded border border-[#dbe6e2] dark:border-[#2a3f38]"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-semibold text-[#111816] dark:text-white">
                              {refund.refundNo}
                            </p>
                            <p className="text-xs font-bold text-green-600 dark:text-green-400">
                              ৳{refund.amount.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            {new Date(refund.date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            {refund.paymentMethod}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            Reason: {refund.reason}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            By: {refund.processedBy}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

