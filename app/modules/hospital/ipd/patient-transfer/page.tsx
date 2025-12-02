"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface TransferRecord {
  id: string;
  date: string;
  fromWard: string;
  toWard: string;
  fromBed: string;
  toBed: string;
  reason: string;
  transferredBy: string;
  remarks: string;
}

export default function PatientTransferPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    currentBed: string;
    currentWard: string;
    admissionDate: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    transferDate: new Date().toISOString().split("T")[0],
    transferTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    toWard: "",
    toBed: "",
    reason: "",
    remarks: "",
    transferredBy: "",
  });

  const [transferHistory, setTransferHistory] = useState<TransferRecord[]>([]);
  const [wardFilter, setWardFilter] = useState("All Wards");
  const [bedSearch, setBedSearch] = useState("");

  // Sample patient data
  const samplePatients = [
    {
      id: "P-10254",
      name: "Liam Johnson",
      age: 35,
      gender: "Male",
      currentBed: "ICU-05",
      currentWard: "ICU",
      admissionDate: "2024-01-15",
    },
    {
      id: "P-10255",
      name: "Olivia Smith",
      age: 28,
      gender: "Female",
      currentBed: "GEN-102",
      currentWard: "General Ward",
      admissionDate: "2024-01-16",
    },
  ];

  // Available beds by ward
  const availableBeds = {
    "ICU": [
      { bedNo: "ICU-01", type: "ICU", status: "occupied" },
      { bedNo: "ICU-02", type: "ICU", status: "vacant" },
      { bedNo: "ICU-03", type: "ICU", status: "vacant" },
      { bedNo: "ICU-04", type: "ICU", status: "reserved" },
      { bedNo: "ICU-06", type: "ICU", status: "vacant" },
    ],
    "General Ward": [
      { bedNo: "GEN-101", type: "Private", status: "vacant" },
      { bedNo: "GEN-103", type: "Semi-Private", status: "vacant" },
      { bedNo: "GEN-104", type: "General", status: "vacant" },
      { bedNo: "GEN-105", type: "Private", status: "vacant" },
    ],
    "Emergency": [
      { bedNo: "EMG-01", type: "Emergency", status: "occupied" },
      { bedNo: "EMG-02", type: "Emergency", status: "vacant" },
      { bedNo: "EMG-03", type: "Emergency", status: "vacant" },
    ],
    "Maternity": [
      { bedNo: "MAT-01", type: "Private", status: "vacant" },
      { bedNo: "MAT-02", type: "Semi-Private", status: "vacant" },
      { bedNo: "MAT-03", type: "Private", status: "occupied" },
    ],
    "Pediatrics": [
      { bedNo: "PED-01", type: "Private", status: "vacant" },
      { bedNo: "PED-02", type: "Semi-Private", status: "vacant" },
    ],
  };

  const wards = ["ICU", "General Ward", "Emergency", "Maternity", "Pediatrics"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "toWard") {
      setFormData((prev) => ({ ...prev, toBed: "" }));
    }
  };

  const handlePatientSelect = (patient: typeof samplePatients[0]) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
    setTransferHistory([
      {
        id: "TRF-001",
        date: "2024-01-16",
        fromWard: "Emergency",
        toWard: "ICU",
        fromBed: "EMG-01",
        toBed: "ICU-05",
        reason: "Condition deteriorated",
        transferredBy: "Dr. John Smith",
        remarks: "Patient moved to ICU for intensive care",
      },
    ]);
  };

  const filteredBeds = formData.toWard
    ? (availableBeds[formData.toWard as keyof typeof availableBeds] || []).filter(
        (bed) =>
          (bed.status === "vacant" || bed.status === "reserved") &&
          (bedSearch === "" || bed.bedNo.toLowerCase().includes(bedSearch.toLowerCase()))
      )
    : [];

  const generateTransferId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `TRF-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!formData.toWard) {
      alert("Please select destination ward");
      return;
    }
    if (!formData.toBed) {
      alert("Please select destination bed");
      return;
    }
    if (!formData.reason) {
      alert("Please provide a reason for transfer");
      return;
    }
    if (formData.toWard === selectedPatient.currentWard && formData.toBed === selectedPatient.currentBed) {
      alert("Destination bed cannot be the same as current bed");
      return;
    }

    const newTransfer: TransferRecord = {
      id: generateTransferId(),
      date: formData.transferDate,
      fromWard: selectedPatient.currentWard,
      toWard: formData.toWard,
      fromBed: selectedPatient.currentBed,
      toBed: formData.toBed,
      reason: formData.reason,
      transferredBy: formData.transferredBy || "Current User",
      remarks: formData.remarks,
    };

    setTransferHistory([newTransfer, ...transferHistory]);

    // Update patient's current bed and ward
    setSelectedPatient({
      ...selectedPatient,
      currentBed: formData.toBed,
      currentWard: formData.toWard,
    });

    console.log("Patient Transfer Data:", {
      patient: selectedPatient,
      formData,
      newTransfer,
    });

    alert(
      `Patient transferred successfully!\nFrom: ${selectedPatient.currentWard} (${selectedPatient.currentBed}) → To: ${formData.toWard} (${formData.toBed})\nTransfer ID: ${newTransfer.id}`
    );

    // Reset form
    setFormData({
      ...formData,
      toWard: "",
      toBed: "",
      reason: "",
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
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Patient Transfer
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                PATIENT TRANSFER
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Transfer patients between wards and beds.
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
                                {patient.id} • Bed: {patient.currentBed} • {patient.currentWard}
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
                              Admission: {new Date(selectedPatient.admissionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedPatient(null);
                              setPatientSearch("");
                              setTransferHistory([]);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                        {/* Current Location */}
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-blue-800 dark:text-blue-300">Current Location</p>
                              <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                {selectedPatient.currentWard}
                              </p>
                              <p className="text-xs text-blue-600 dark:text-blue-400">
                                Bed: {selectedPatient.currentBed}
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-blue-500">
                              location_on
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transfer Form */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Transfer Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Transfer Date: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="transferDate"
                            value={formData.transferDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Transfer Time: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="transferTime"
                            value={formData.transferTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Transfer To Ward: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="toWard"
                          value={formData.toWard}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Ward</option>
                          {wards
                            .filter((ward) => ward !== selectedPatient.currentWard)
                            .map((ward) => (
                              <option key={ward} value={ward}>
                                {ward}
                              </option>
                            ))}
                        </select>
                      </div>
                      {formData.toWard && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                              Search Bed:
                            </label>
                            <input
                              type="text"
                              value={bedSearch}
                              onChange={(e) => setBedSearch(e.target.value)}
                              placeholder="Search by Bed No..."
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                              Select Bed: <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-48 overflow-y-auto p-2 border border-[#dbe6e2] dark:border-[#2a3f38] rounded-lg">
                              {filteredBeds.map((bed) => (
                                <button
                                  key={bed.bedNo}
                                  type="button"
                                  onClick={() =>
                                    setFormData((prev) => ({ ...prev, toBed: bed.bedNo }))
                                  }
                                  className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                                    formData.toBed === bed.bedNo
                                      ? "ring-4 ring-primary border-primary bg-primary/10"
                                      : bed.status === "vacant"
                                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                      : "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                                  }`}
                                >
                                  <p className="font-bold text-sm text-[#111816] dark:text-white">
                                    {bed.bedNo}
                                  </p>
                                  <p className="text-xs text-[#61897c] dark:text-gray-400">{bed.type}</p>
                                  <p className="text-xs text-[#61897c] dark:text-gray-400">
                                    {bed.status === "vacant" ? "Available" : "Reserved"}
                                  </p>
                                </button>
                              ))}
                            </div>
                            {filteredBeds.length === 0 && (
                              <p className="text-sm text-[#61897c] dark:text-gray-400 mt-2">
                                No available beds in this ward
                              </p>
                            )}
                          </div>
                        </>
                      )}
                      {formData.toBed && (
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-green-800 dark:text-green-300">Destination</p>
                              <p className="text-lg font-bold text-green-700 dark:text-green-400">
                                {formData.toWard}
                              </p>
                              <p className="text-xs text-green-600 dark:text-green-400">
                                Bed: {formData.toBed}
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-green-500">
                              check_circle
                            </span>
                          </div>
                        </div>
                      )}
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Reason for Transfer: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Reason</option>
                          <option value="Condition improved">Condition improved</option>
                          <option value="Condition deteriorated">Condition deteriorated</option>
                          <option value="Bed availability">Bed availability</option>
                          <option value="Specialized care required">Specialized care required</option>
                          <option value="Patient request">Patient request</option>
                          <option value="Ward capacity">Ward capacity</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Transferred By:
                        </label>
                        <input
                          type="text"
                          name="transferredBy"
                          value={formData.transferredBy}
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
                          <span className="material-symbols-outlined">transfer_within_a_station</span>
                          <span>Confirm Transfer</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column - Transfer History */}
              <div className="lg:col-span-1">
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Transfer History
                    </h3>
                    {transferHistory.length > 0 ? (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {transferHistory.map((transfer) => (
                          <div
                            key={transfer.id}
                            className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                                {transfer.id}
                              </span>
                              <span className="text-xs text-[#61897c] dark:text-gray-400">
                                {new Date(transfer.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="text-center">
                                <p className="text-xs text-[#61897c] dark:text-gray-400">From</p>
                                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                  {transfer.fromWard}
                                </p>
                                <p className="text-xs text-[#61897c] dark:text-gray-400">
                                  {transfer.fromBed}
                                </p>
                              </div>
                              <span className="material-symbols-outlined text-sm text-gray-400">
                                arrow_forward
                              </span>
                              <div className="text-center">
                                <p className="text-xs text-[#61897c] dark:text-gray-400">To</p>
                                <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                                  {transfer.toWard}
                                </p>
                                <p className="text-xs text-[#61897c] dark:text-gray-400">
                                  {transfer.toBed}
                                </p>
                              </div>
                            </div>
                            <div className="text-xs text-[#61897c] dark:text-gray-400 space-y-1">
                              <p>Reason: {transfer.reason}</p>
                              <p>By: {transfer.transferredBy}</p>
                              {transfer.remarks && (
                                <p className="mt-1 italic">"{transfer.remarks}"</p>
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
                          No transfer history yet
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
