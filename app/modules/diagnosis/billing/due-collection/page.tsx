"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
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

export default function DiagnosisDueCollectionPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    totalPaid: number;
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

  const samplePatients = [
    {
      id: "P-10270",
      name: "Michael Brown",
      age: 45,
      gender: "Male",
      totalPaid: 50000,
      totalBilled: 65000,
      dueAmount: 15000,
    },
    {
      id: "P-10271",
      name: "Sarah Wilson",
      age: 32,
      gender: "Female",
      totalPaid: 30000,
      totalBilled: 45000,
      dueAmount: 15000,
    },
    {
      id: "P-10272",
      name: "David Lee",
      age: 38,
      gender: "Male",
      totalPaid: 20000,
      totalBilled: 35000,
      dueAmount: 15000,
    },
    {
      id: "P-10273",
      name: "Jennifer Martinez",
      age: 29,
      gender: "Female",
      totalPaid: 40000,
      totalBilled: 55000,
      dueAmount: 15000,
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
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
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
      alert(`Amount cannot exceed due amount of ৳${selectedPatient.dueAmount.toLocaleString()}`);
      return;
    }

    const newPayment: DuePayment = {
      id: Date.now().toString(),
      date: formData.collectionDate,
      amount: amount,
      paymentMethod: formData.paymentMethod,
      receiptNo: generateReceiptNo(),
      collectedBy: formData.collectedBy || "Current User",
      remarks: formData.remarks,
    };

    setDueHistory([...dueHistory, newPayment]);
    alert(`Due payment of ৳${amount.toLocaleString()} collected successfully!\nReceipt No: ${newPayment.receiptNo}`);

    const remainingDue = selectedPatient.dueAmount - amount;
    setSelectedPatient({
      ...selectedPatient,
      totalPaid: selectedPatient.totalPaid + amount,
      dueAmount: remainingDue,
    });

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
                  <span className="font-medium text-[#111816] dark:text-white">Due Collection</span>
                </div>
                <h1 className="text-xl font-bold text-[#111816] dark:text-white">DUE COLLECTION</h1>
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
                              setDueHistory([]);
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
                      <div className="col-span-2 pt-1 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <p className="text-[#61897c] dark:text-gray-400">Due Amount</p>
                        <p className="font-bold text-lg text-red-600 dark:text-red-400">
                          ৳{selectedPatient.dueAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Due Collection Form */}
                {selectedPatient && (
                  <form onSubmit={handleSubmit} className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                    <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                      Due Collection Details
                    </h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Collection Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="collectionDate"
                            value={formData.collectionDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Collection Time
                          </label>
                          <input
                            type="time"
                            name="collectionTime"
                            value={formData.collectionTime}
                            onChange={handleInputChange}
                            className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Due Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="dueAmount"
                          value={formData.dueAmount}
                          onChange={handleInputChange}
                          required
                          min="0"
                          max={selectedPatient.dueAmount}
                          placeholder="Enter due amount to collect"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                        <p className="text-xs text-[#61897c] dark:text-gray-400 mt-0.5">
                          Max: ৳{selectedPatient.dueAmount.toLocaleString()}
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
                          <option value="Card">Card</option>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Mobile Banking">Mobile Banking</option>
                        </select>
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
                          Collected By
                        </label>
                        <input
                          type="text"
                          name="collectedBy"
                          value={formData.collectedBy}
                          onChange={handleInputChange}
                          placeholder="Enter collector name"
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
                        Collect Due Payment
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column - Payment History */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2 sticky top-3">
                  <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                    Payment History
                  </h3>
                  {dueHistory.length === 0 ? (
                    <p className="text-xs text-[#61897c] dark:text-gray-400 text-center py-4">
                      No payment history available
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-[600px] overflow-y-auto">
                      {dueHistory.map((payment) => (
                        <div
                          key={payment.id}
                          className="p-2 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded border border-[#dbe6e2] dark:border-[#2a3f38]"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-semibold text-[#111816] dark:text-white">
                              {payment.receiptNo}
                            </p>
                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                              ৳{payment.amount.toLocaleString()}
                            </p>
                          </div>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            {new Date(payment.date).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            {payment.paymentMethod}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            By: {payment.collectedBy}
                          </p>
                          {payment.remarks && (
                            <p className="text-xs text-[#61897c] dark:text-gray-400">
                              {payment.remarks}
                            </p>
                          )}
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

