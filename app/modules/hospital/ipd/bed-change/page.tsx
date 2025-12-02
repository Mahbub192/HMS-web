"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface BedChangeRecord {
  id: string;
  date: string;
  fromBed: string;
  toBed: string;
  fromWard: string;
  toWard: string;
  reason: string;
  changedBy: string;
  remarks: string;
}

interface Bed {
  id: string;
  bedNo: string;
  ward: string;
  type: string;
  status: "vacant" | "occupied" | "reserved" | "out-of-service";
  charge: number;
  patientId?: string;
  patientName?: string;
}

export default function BedChangePage() {
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
    changeDate: new Date().toISOString().split("T")[0],
    changeTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    reason: "",
    remarks: "",
    changedBy: "",
  });

  const [selectedNewBed, setSelectedNewBed] = useState<Bed | null>(null);
  const [wardFilter, setWardFilter] = useState("All Wards");
  const [bedSearch, setBedSearch] = useState("");
  const [bedChangeHistory, setBedChangeHistory] = useState<BedChangeRecord[]>([]);

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
    {
      id: "P-10256",
      name: "Noah Williams",
      age: 42,
      gender: "Male",
      currentBed: "GEN-205",
      currentWard: "General Ward",
      admissionDate: "2024-01-17",
    },
  ];

  // Available beds data
  const availableBeds: Bed[] = [
    // ICU Beds
    { id: "1", bedNo: "ICU-01", ward: "ICU", type: "ICU", status: "occupied", charge: 5000 },
    { id: "2", bedNo: "ICU-02", ward: "ICU", type: "ICU", status: "vacant", charge: 5000 },
    { id: "3", bedNo: "ICU-03", ward: "ICU", type: "ICU", status: "vacant", charge: 5000 },
    { id: "4", bedNo: "ICU-04", ward: "ICU", type: "ICU", status: "reserved", charge: 5000 },
    { id: "5", bedNo: "ICU-05", ward: "ICU", type: "ICU", status: "occupied", charge: 5000 },
    { id: "6", bedNo: "ICU-06", ward: "ICU", type: "ICU", status: "vacant", charge: 5000 },
    // General Ward Beds
    { id: "7", bedNo: "GEN-101", ward: "General Ward", type: "Private", status: "vacant", charge: 2000 },
    { id: "8", bedNo: "GEN-102", ward: "General Ward", type: "Semi-Private", status: "occupied", charge: 1500 },
    { id: "9", bedNo: "GEN-103", ward: "General Ward", type: "Semi-Private", status: "vacant", charge: 1500 },
    { id: "10", bedNo: "GEN-104", ward: "General Ward", type: "General", status: "vacant", charge: 1000 },
    { id: "11", bedNo: "GEN-105", ward: "General Ward", type: "Private", status: "vacant", charge: 2000 },
    { id: "12", bedNo: "GEN-205", ward: "General Ward", type: "Semi-Private", status: "occupied", charge: 1500 },
    { id: "13", bedNo: "GEN-206", ward: "General Ward", type: "General", status: "vacant", charge: 1000 },
    { id: "14", bedNo: "GEN-207", ward: "General Ward", type: "Private", status: "vacant", charge: 2000 },
    // Emergency Beds
    { id: "15", bedNo: "EMG-01", ward: "Emergency", type: "Emergency", status: "occupied", charge: 3000 },
    { id: "16", bedNo: "EMG-02", ward: "Emergency", type: "Emergency", status: "vacant", charge: 3000 },
    { id: "17", bedNo: "EMG-03", ward: "Emergency", type: "Emergency", status: "vacant", charge: 3000 },
    // Maternity Beds
    { id: "18", bedNo: "MAT-01", ward: "Maternity", type: "Private", status: "vacant", charge: 2500 },
    { id: "19", bedNo: "MAT-02", ward: "Maternity", type: "Semi-Private", status: "vacant", charge: 1800 },
    { id: "20", bedNo: "MAT-03", ward: "Maternity", type: "Private", status: "occupied", charge: 2500 },
  ];

  const wards = ["All Wards", "ICU", "General Ward", "Emergency", "Maternity", "Pediatrics"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientSelect = (patient: typeof samplePatients[0]) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
    setSelectedNewBed(null);
    // Load bed change history for selected patient
    setBedChangeHistory([
      {
        id: "BC-001",
        date: "2024-01-16",
        fromBed: "GEN-101",
        toBed: "GEN-102",
        fromWard: "General Ward",
        toWard: "General Ward",
        reason: "Patient Request",
        changedBy: "John Doe",
        remarks: "Patient requested room change",
      },
    ]);
  };

  const getBedColor = (status: string) => {
    switch (status) {
      case "vacant":
        return "border-green-500 bg-green-50 dark:bg-green-900/20";
      case "occupied":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
      case "reserved":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20";
      case "out-of-service":
        return "border-gray-400 bg-gray-100 dark:bg-gray-800";
      default:
        return "border-gray-200 bg-white dark:bg-gray-800";
    }
  };

  const getBedStatusIcon = (status: string) => {
    switch (status) {
      case "vacant":
        return "check_circle";
      case "occupied":
        return "person";
      case "reserved":
        return "schedule";
      case "out-of-service":
        return "block";
      default:
        return "bed";
    }
  };

  const filteredBeds = availableBeds.filter((bed) => {
    const matchesWard = wardFilter === "All Wards" || bed.ward === wardFilter;
    const matchesSearch =
      bedSearch === "" ||
      bed.bedNo.toLowerCase().includes(bedSearch.toLowerCase()) ||
      bed.type.toLowerCase().includes(bedSearch.toLowerCase());
    const isVacant = bed.status === "vacant" || bed.status === "reserved";
    const isNotCurrentBed = selectedPatient ? bed.bedNo !== selectedPatient.currentBed : true;
    return matchesWard && matchesSearch && isVacant && isNotCurrentBed;
  });

  const handleBedSelect = (bed: Bed) => {
    if (bed.status === "vacant" || bed.status === "reserved") {
      setSelectedNewBed(bed);
    }
  };

  const generateChangeId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `BC-${year}-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!selectedNewBed) {
      alert("Please select a new bed");
      return;
    }
    if (!formData.reason) {
      alert("Please provide a reason for bed change");
      return;
    }

    const newChange: BedChangeRecord = {
      id: generateChangeId(),
      date: formData.changeDate,
      fromBed: selectedPatient.currentBed,
      toBed: selectedNewBed.bedNo,
      fromWard: selectedPatient.currentWard,
      toWard: selectedNewBed.ward,
      reason: formData.reason,
      changedBy: formData.changedBy || "Current User",
      remarks: formData.remarks,
    };

    setBedChangeHistory([newChange, ...bedChangeHistory]);

    // Update patient's current bed
    setSelectedPatient({
      ...selectedPatient,
      currentBed: selectedNewBed.bedNo,
      currentWard: selectedNewBed.ward,
    });

    console.log("Bed Change Data:", {
      patient: selectedPatient,
      formData,
      newBed: selectedNewBed,
      newChange,
    });

    alert(
      `Bed changed successfully!\nFrom: ${selectedPatient.currentBed} → To: ${selectedNewBed.bedNo}\nChange ID: ${newChange.id}`
    );

    // Reset form
    setSelectedNewBed(null);
    setFormData({
      ...formData,
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
                Bed Change
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                BED CHANGE FORM
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Change patient bed assignments within the hospital.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Form & Bed Selection */}
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
                                {patient.id} • {patient.age} years • {patient.gender} • Bed: {patient.currentBed}
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
                              ID: {selectedPatient.id} • Age: {selectedPatient.age} • {selectedPatient.gender}
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
                              setSelectedNewBed(null);
                              setBedChangeHistory([]);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                        {/* Current Bed Info */}
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-blue-800 dark:text-blue-300">Current Bed</p>
                              <p className="text-lg font-bold text-blue-700 dark:text-blue-400">
                                {selectedPatient.currentBed}
                              </p>
                              <p className="text-xs text-blue-600 dark:text-blue-400">
                                {selectedPatient.currentWard}
                              </p>
                            </div>
                            <span className="material-symbols-outlined text-4xl text-blue-500">
                              bed
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bed Selection Section */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Select New Bed
                    </h3>

                    {/* Filters */}
                    <div className="mb-4 space-y-3">
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {wards.map((ward) => (
                          <button
                            key={ward}
                            type="button"
                            onClick={() => setWardFilter(ward)}
                            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-sm font-medium ${
                              wardFilter === ward
                                ? "bg-primary/20 text-primary ring-2 ring-primary"
                                : "bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            }`}
                          >
                            {ward}
                          </button>
                        ))}
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                          search
                        </span>
                        <input
                          type="text"
                          value={bedSearch}
                          onChange={(e) => setBedSearch(e.target.value)}
                          placeholder="Search by Bed No or Type..."
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 pl-10 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Bed Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto p-2">
                      {filteredBeds.map((bed) => (
                        <button
                          key={bed.id}
                          type="button"
                          onClick={() => handleBedSelect(bed)}
                          className={`relative flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${
                            selectedNewBed?.id === bed.id
                              ? "ring-4 ring-primary border-primary"
                              : getBedColor(bed.status)
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-3xl ${
                              bed.status === "vacant"
                                ? "text-green-600 dark:text-green-400"
                                : bed.status === "reserved"
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-gray-400"
                            }`}
                          >
                            {getBedStatusIcon(bed.status)}
                          </span>
                          <p className="font-bold text-sm text-[#111816] dark:text-white mt-2">
                            {bed.bedNo}
                          </p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">{bed.type}</p>
                          <p className="text-xs text-[#61897c] dark:text-gray-400">
                            ${bed.charge}/day
                          </p>
                          {selectedNewBed?.id === bed.id && (
                            <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1">
                              <span className="material-symbols-outlined text-sm">check</span>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>

                    {filteredBeds.length === 0 && (
                      <div className="text-center py-8">
                        <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                          bed
                        </span>
                        <p className="text-sm text-[#61897c] dark:text-gray-400">
                          No available beds found
                        </p>
                      </div>
                    )}

                    {/* Selected Bed Info */}
                    {selectedNewBed && (
                      <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-green-800 dark:text-green-300">New Bed Selected</p>
                            <p className="text-lg font-bold text-green-700 dark:text-green-400">
                              {selectedNewBed.bedNo}
                            </p>
                            <p className="text-xs text-green-600 dark:text-green-400">
                              {selectedNewBed.ward} • {selectedNewBed.type} • ${selectedNewBed.charge}/day
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedNewBed(null)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <span className="material-symbols-outlined">close</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Bed Change Form */}
                {selectedPatient && selectedNewBed && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Bed Change Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Change Date: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="changeDate"
                            value={formData.changeDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Change Time: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="time"
                            name="changeTime"
                            value={formData.changeTime}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Reason for Bed Change: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Reason</option>
                          <option value="Patient Request">Patient Request</option>
                          <option value="Medical Necessity">Medical Necessity</option>
                          <option value="Ward Transfer">Ward Transfer</option>
                          <option value="Bed Maintenance">Bed Maintenance</option>
                          <option value="Isolation Required">Isolation Required</option>
                          <option value="Upgrade/Downgrade">Upgrade/Downgrade</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Changed By:
                        </label>
                        <input
                          type="text"
                          name="changedBy"
                          value={formData.changedBy}
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
                          <span className="material-symbols-outlined">bed</span>
                          <span>Confirm Bed Change</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column - Bed Change History */}
              <div className="lg:col-span-1">
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Bed Change History
                    </h3>
                    {bedChangeHistory.length > 0 ? (
                      <div className="space-y-3 max-h-[600px] overflow-y-auto">
                        {bedChangeHistory.map((change) => (
                          <div
                            key={change.id}
                            className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-[#61897c] dark:text-gray-400">
                                {change.id}
                              </span>
                              <span className="text-xs text-[#61897c] dark:text-gray-400">
                                {new Date(change.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                                {change.fromBed}
                              </span>
                              <span className="material-symbols-outlined text-sm text-gray-400">
                                arrow_forward
                              </span>
                              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                                {change.toBed}
                              </span>
                            </div>
                            <div className="text-xs text-[#61897c] dark:text-gray-400 space-y-1">
                              <p>Reason: {change.reason}</p>
                              <p>By: {change.changedBy}</p>
                              {change.remarks && (
                                <p className="mt-1 italic">"{change.remarks}"</p>
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
                          No bed changes recorded yet
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
