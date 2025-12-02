"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface BlockedPatient {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  bedNo: string;
  ward: string;
  admissionDate: string;
  blockedDate: string;
  blockedBy: string;
  reason: string;
  remarks: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function BlockedPatientPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    bedNo: string;
    ward: string;
    admissionDate: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    blockDate: new Date().toISOString().split("T")[0],
    blockTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    reason: "",
    remarks: "",
    blockedBy: "",
  });

  const [blockedPatients, setBlockedPatients] = useState<BlockedPatient[]>([
    {
      id: "BLK-001",
      patientId: "P-10250",
      patientName: "Emma Wilson",
      age: 45,
      gender: "Female",
      bedNo: "GEN-105",
      ward: "General Ward",
      admissionDate: "2024-01-10",
      blockedDate: "2024-01-20",
      blockedBy: "Dr. Sarah Johnson",
      reason: "Non-payment of dues",
      remarks: "Patient has outstanding balance of $25,000",
      status: "Pending",
    },
    {
      id: "BLK-002",
      patientId: "P-10251",
      patientName: "Michael Brown",
      age: 38,
      gender: "Male",
      bedNo: "ICU-03",
      ward: "ICU",
      admissionDate: "2024-01-12",
      blockedDate: "2024-01-18",
      blockedBy: "Admin",
      reason: "Insurance claim rejected",
      remarks: "Insurance company denied coverage",
      status: "Approved",
    },
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
    },
    {
      id: "P-10255",
      name: "Olivia Smith",
      age: 28,
      gender: "Female",
      bedNo: "GEN-102",
      ward: "General Ward",
      admissionDate: "2024-01-16",
    },
    {
      id: "P-10256",
      name: "Noah Williams",
      age: 42,
      gender: "Male",
      bedNo: "GEN-205",
      ward: "General Ward",
      admissionDate: "2024-01-17",
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
  };

  const generateBlockId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `BLK-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!formData.reason) {
      alert("Please provide a reason for blocking");
      return;
    }

    const newBlock: BlockedPatient = {
      id: generateBlockId(),
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      age: selectedPatient.age,
      gender: selectedPatient.gender,
      bedNo: selectedPatient.bedNo,
      ward: selectedPatient.ward,
      admissionDate: selectedPatient.admissionDate,
      blockedDate: formData.blockDate,
      blockedBy: formData.blockedBy || "Current User",
      reason: formData.reason,
      remarks: formData.remarks,
      status: "Pending",
    };

    setBlockedPatients([newBlock, ...blockedPatients]);

    console.log("Block Patient Data:", {
      patient: selectedPatient,
      formData,
      newBlock,
    });

    alert(
      `Patient blocked successfully!\nBlock ID: ${newBlock.id}\nStatus: Pending Approval`
    );

    // Reset form
    setSelectedPatient(null);
    setPatientSearch("");
    setFormData({
      blockDate: new Date().toISOString().split("T")[0],
      blockTime: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      reason: "",
      remarks: "",
      blockedBy: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700";
      case "Approved":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700";
      case "Rejected":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700";
    }
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Blocked Patient
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                BLOCK PATIENT
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Block patients from accessing services due to various reasons.
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
                                {patient.id} • Bed: {patient.bedNo} • {patient.ward}
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

                {/* Block Patient Form */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Block Patient Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Block Date: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="blockDate"
                            value={formData.blockDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Block Time: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="blockTime"
                            value={formData.blockTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Reason for Blocking: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Reason</option>
                          <option value="Non-payment of dues">Non-payment of dues</option>
                          <option value="Insurance claim rejected">Insurance claim rejected</option>
                          <option value="Legal issues">Legal issues</option>
                          <option value="Violation of hospital policy">Violation of hospital policy</option>
                          <option value="Requested by patient">Requested by patient</option>
                          <option value="Medical reasons">Medical reasons</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Blocked By:
                        </label>
                        <input
                          type="text"
                          name="blockedBy"
                          value={formData.blockedBy}
                          onChange={handleInputChange}
                          placeholder="Enter staff name"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Remarks: <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          name="remarks"
                          value={formData.remarks}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Enter detailed remarks about the blocking..."
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-400">
                            warning
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                              Important Notice
                            </p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                              Blocking a patient will restrict their access to services. This action requires approval from authorized personnel.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <button
                          type="submit"
                          className="flex items-center justify-center gap-2 px-8 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <span className="material-symbols-outlined">block</span>
                          <span>Block Patient</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column - Blocked Patients List */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                    Blocked Patients
                  </h3>
                  {blockedPatients.length > 0 ? (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                      {blockedPatients.map((blocked) => (
                        <div
                          key={blocked.id}
                          className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                              {blocked.id}
                            </span>
                            <span
                              className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(blocked.status)}`}
                            >
                              {blocked.status}
                            </span>
                          </div>
                          <p className="font-semibold text-sm text-[#111816] dark:text-white mb-1">
                            {blocked.patientName}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400 mb-2">
                            {blocked.patientId} • Bed: {blocked.bedNo}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400 mb-1">
                            <span className="font-medium">Reason:</span> {blocked.reason}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            Blocked: {new Date(blocked.blockedDate).toLocaleDateString()} by {blocked.blockedBy}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                        block
                      </span>
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        No blocked patients
                      </p>
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
