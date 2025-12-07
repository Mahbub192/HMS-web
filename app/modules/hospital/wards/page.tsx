"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface Bed {
  id: string;
  bedNo: string;
  ward: string;
  type: string;
  status: "vacant" | "occupied" | "reserved" | "out-of-service";
  charge: number;
  patientId?: string;
  patientName?: string;
  admissionDate?: string;
}

interface Patient {
  id: string;
  name: string;
  age: number;
  sex: string;
  phone: string;
  department?: string;
}

export default function WardsPage() {
  const [selectedWard, setSelectedWard] = useState<string>("All Wards");
  const [showAdmissionModal, setShowAdmissionModal] = useState(false);
  const [showBedAssignmentModal, setShowBedAssignmentModal] = useState(false);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [admissionForm, setAdmissionForm] = useState({
    admissionDate: new Date().toISOString().split("T")[0],
    admissionTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    department: "",
    consultant: "",
    remarks: "",
  });

  const wards = ["All Wards", "ICU", "General Ward", "Emergency", "Maternity", "Pediatrics"];

  const beds: Bed[] = [
    // ICU Beds
    { id: "1", bedNo: "ICU-01", ward: "ICU", type: "ICU", status: "occupied", charge: 5000, patientId: "P-10254", patientName: "Liam Johnson", admissionDate: "2024-01-15" },
    { id: "2", bedNo: "ICU-02", ward: "ICU", type: "ICU", status: "vacant", charge: 5000 },
    { id: "3", bedNo: "ICU-03", ward: "ICU", type: "ICU", status: "vacant", charge: 5000 },
    { id: "4", bedNo: "ICU-04", ward: "ICU", type: "ICU", status: "reserved", charge: 5000 },
    { id: "5", bedNo: "ICU-05", ward: "ICU", type: "ICU", status: "occupied", charge: 5000, patientId: "P-10270", patientName: "Michael Brown", admissionDate: "2024-01-16" },
    { id: "6", bedNo: "ICU-06", ward: "ICU", type: "ICU", status: "vacant", charge: 5000 },
    // General Ward Beds
    { id: "7", bedNo: "GEN-101", ward: "General Ward", type: "Private", status: "vacant", charge: 2000 },
    { id: "8", bedNo: "GEN-102", ward: "General Ward", type: "Semi-Private", status: "occupied", charge: 1500, patientId: "P-10255", patientName: "Olivia Smith", admissionDate: "2024-01-17" },
    { id: "9", bedNo: "GEN-103", ward: "General Ward", type: "Semi-Private", status: "vacant", charge: 1500 },
    { id: "10", bedNo: "GEN-104", ward: "General Ward", type: "General", status: "vacant", charge: 1000 },
    { id: "11", bedNo: "GEN-105", ward: "General Ward", type: "Private", status: "vacant", charge: 2000 },
    { id: "12", bedNo: "GEN-205", ward: "General Ward", type: "Semi-Private", status: "occupied", charge: 1500, patientId: "P-10272", patientName: "David Lee", admissionDate: "2024-01-18" },
    // Emergency Beds
    { id: "15", bedNo: "EMG-01", ward: "Emergency", type: "Emergency", status: "occupied", charge: 3000, patientId: "P-10260", patientName: "Robert Taylor", admissionDate: "2024-01-19" },
    { id: "16", bedNo: "EMG-02", ward: "Emergency", type: "Emergency", status: "vacant", charge: 3000 },
    { id: "17", bedNo: "EMG-03", ward: "Emergency", type: "Emergency", status: "vacant", charge: 3000 },
    // Maternity Beds
    { id: "18", bedNo: "MAT-01", ward: "Maternity", type: "Private", status: "vacant", charge: 2500 },
    { id: "19", bedNo: "MAT-02", ward: "Maternity", type: "Semi-Private", status: "vacant", charge: 2000 },
    { id: "20", bedNo: "MAT-03", ward: "Maternity", type: "Private", status: "occupied", charge: 2500, patientId: "P-10261", patientName: "Emily Davis", admissionDate: "2024-01-20" },
  ];

  const samplePatients: Patient[] = [
    { id: "P-10280", name: "James Anderson", age: 45, sex: "Male", phone: "01712345678", department: "Cardiology" },
    { id: "P-10281", name: "Maria Garcia", age: 32, sex: "Female", phone: "01712345679", department: "Orthopedics" },
    { id: "P-10282", name: "John Williams", age: 58, sex: "Male", phone: "01712345680", department: "Neurology" },
  ];

  const filteredBeds = selectedWard === "All Wards"
    ? beds
    : beds.filter((bed) => bed.ward === selectedWard);

  const stats = {
    total: filteredBeds.length,
    vacant: filteredBeds.filter((b) => b.status === "vacant").length,
    occupied: filteredBeds.filter((b) => b.status === "occupied").length,
    reserved: filteredBeds.filter((b) => b.status === "reserved").length,
    outOfService: filteredBeds.filter((b) => b.status === "out-of-service").length,
  };

  const getBedColor = (status: string) => {
    switch (status) {
      case "vacant":
        return "border-green-500 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30";
      case "occupied":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30";
      case "reserved":
        return "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30";
      case "out-of-service":
        return "border-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700";
      default:
        return "border-gray-200 bg-white dark:bg-gray-800";
    }
  };

  const getBedStatusText = (status: string) => {
    switch (status) {
      case "vacant":
        return "Vacant";
      case "occupied":
        return "Occupied";
      case "reserved":
        return "Reserved";
      case "out-of-service":
        return "Out of Service";
      default:
        return "Unknown";
    }
  };

  const handleBedClick = (bed: Bed) => {
    if (bed.status === "vacant") {
      setSelectedBed(bed);
      setShowBedAssignmentModal(true);
    } else if (bed.status === "occupied") {
      // Show patient details
      alert(`Bed ${bed.bedNo} is occupied by:\nPatient: ${bed.patientName}\nID: ${bed.patientId}\nAdmission Date: ${bed.admissionDate}`);
    }
  };

  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!selectedBed) {
      alert("Please select a bed");
      return;
    }

    console.log("Admission Data:", {
      patient: selectedPatient,
      bed: selectedBed,
      admissionForm,
    });

    alert(`Patient ${selectedPatient.name} admitted to bed ${selectedBed.bedNo} successfully!`);
    setShowAdmissionModal(false);
    setShowBedAssignmentModal(false);
    setSelectedPatient(null);
    setSelectedBed(null);
    setPatientSearch("");
  };

  const handleBedAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (!selectedBed) {
      alert("Please select a bed");
      return;
    }

    console.log("Bed Assignment Data:", {
      patient: selectedPatient,
      bed: selectedBed,
      admissionForm,
    });

    alert(`Patient ${selectedPatient.name} assigned to bed ${selectedBed.bedNo} successfully!`);
    setShowBedAssignmentModal(false);
    setSelectedPatient(null);
    setSelectedBed(null);
    setPatientSearch("");
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
              <span className="text-sm font-medium text-[#111816] dark:text-white">Wards</span>
            </div>

            {/* Page Heading */}
            <header className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                  WARDS & BED MANAGEMENT
                </h1>
                <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                  Manage hospital wards, beds, and patient admissions.
                </p>
              </div>
              <button
                onClick={() => setShowAdmissionModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                <span className="material-symbols-outlined">person_add</span>
                <span>New Admission</span>
              </button>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Total Beds</p>
                <p className="text-2xl font-bold text-[#111816] dark:text-white">{stats.total}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Vacant</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.vacant}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Occupied</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.occupied}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Reserved</p>
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.reserved}</p>
              </div>
              <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                <p className="text-sm text-[#61897c] dark:text-gray-400 mb-1">Out of Service</p>
                <p className="text-2xl font-bold text-gray-600 dark:text-gray-400">{stats.outOfService}</p>
              </div>
            </div>

            {/* Ward Filter */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4 mb-6">
              <div className="flex flex-wrap gap-2">
                {wards.map((ward) => (
                  <button
                    key={ward}
                    onClick={() => setSelectedWard(ward)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedWard === ward
                        ? "bg-primary text-background-dark"
                        : "bg-[#f0f4f3] dark:bg-[#2a3f38] text-[#111816] dark:text-white hover:bg-primary/10"
                    }`}
                  >
                    {ward}
                  </button>
                ))}
              </div>
            </div>

            {/* Beds Grid */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
              <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                {selectedWard} - Bed Availability
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredBeds.map((bed) => (
                  <div
                    key={bed.id}
                    onClick={() => handleBedClick(bed)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${getBedColor(bed.status)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-[#111816] dark:text-white">{bed.bedNo}</span>
                      <span className="text-xs font-medium px-2 py-1 rounded bg-white/50 dark:bg-black/20">
                        {bed.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#111816] dark:text-white mb-1">
                      {getBedStatusText(bed.status)}
                    </p>
                    {bed.status === "occupied" && bed.patientName && (
                      <div className="mt-2 pt-2 border-t border-current/20">
                        <p className="text-xs font-medium text-[#111816] dark:text-white truncate">
                          {bed.patientName}
                        </p>
                        <p className="text-xs text-[#111816]/70 dark:text-white/70">
                          {bed.patientId}
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-[#111816]/70 dark:text-white/70 mt-1">
                      ৳{bed.charge}/day
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Admission Modal */}
      {showAdmissionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#111816] dark:text-white">Patient Admission</h2>
                <button
                  onClick={() => {
                    setShowAdmissionModal(false);
                    setSelectedPatient(null);
                    setPatientSearch("");
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleAdmissionSubmit} className="space-y-4">
                {/* Patient Search */}
                <div>
                  <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                    Search Patient: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
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
                            onClick={() => {
                              setSelectedPatient(patient);
                              setPatientSearch(patient.name);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors"
                          >
                            <div className="font-medium text-[#111816] dark:text-white">
                              {patient.name}
                            </div>
                            <div className="text-sm text-[#61897c] dark:text-gray-400">
                              {patient.id} • {patient.age} years • {patient.sex}
                            </div>
                          </button>
                        ))}
                    </div>
                  )}
                  {selectedPatient && (
                    <div className="mt-2 p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg">
                      <p className="font-medium text-[#111816] dark:text-white">{selectedPatient.name}</p>
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        {selectedPatient.id} • {selectedPatient.age} years • {selectedPatient.sex}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bed Selection */}
                <div>
                  <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                    Select Bed: <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={selectedBed?.id || ""}
                    onChange={(e) => {
                      const bed = beds.find((b) => b.id === e.target.value && b.status === "vacant");
                      setSelectedBed(bed || null);
                    }}
                    required
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="">Select a bed</option>
                    {beds
                      .filter((b) => b.status === "vacant")
                      .map((bed) => (
                        <option key={bed.id} value={bed.id}>
                          {bed.bedNo} - {bed.ward} ({bed.type}) - ৳{bed.charge}/day
                        </option>
                      ))}
                  </select>
                </div>

                {/* Admission Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                      Admission Date: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={admissionForm.admissionDate}
                      onChange={(e) =>
                        setAdmissionForm({ ...admissionForm, admissionDate: e.target.value })
                      }
                      required
                      className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                      Admission Time:
                    </label>
                    <input
                      type="time"
                      value={admissionForm.admissionTime}
                      onChange={(e) =>
                        setAdmissionForm({ ...admissionForm, admissionTime: e.target.value })
                      }
                      className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                      Department:
                    </label>
                    <input
                      type="text"
                      value={admissionForm.department}
                      onChange={(e) =>
                        setAdmissionForm({ ...admissionForm, department: e.target.value })
                      }
                      placeholder="Enter department"
                      className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                      Consultant:
                    </label>
                    <input
                      type="text"
                      value={admissionForm.consultant}
                      onChange={(e) =>
                        setAdmissionForm({ ...admissionForm, consultant: e.target.value })
                      }
                      placeholder="Enter consultant name"
                      className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                    Remarks:
                  </label>
                  <textarea
                    value={admissionForm.remarks}
                    onChange={(e) =>
                      setAdmissionForm({ ...admissionForm, remarks: e.target.value })
                    }
                    rows={3}
                    placeholder="Enter any remarks..."
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Admit Patient
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdmissionModal(false);
                      setSelectedPatient(null);
                      setPatientSearch("");
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-[#111816] dark:text-white text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Bed Assignment Modal */}
      {showBedAssignmentModal && selectedBed && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-lg max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#111816] dark:text-white">
                  Assign Bed: {selectedBed.bedNo}
                </h2>
                <button
                  onClick={() => {
                    setShowBedAssignmentModal(false);
                    setSelectedBed(null);
                    setSelectedPatient(null);
                    setPatientSearch("");
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleBedAssignment} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#111816] dark:text-white mb-2">
                    Search Patient: <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
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
                            onClick={() => {
                              setSelectedPatient(patient);
                              setPatientSearch(patient.name);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors"
                          >
                            <div className="font-medium text-[#111816] dark:text-white">
                              {patient.name}
                            </div>
                            <div className="text-sm text-[#61897c] dark:text-gray-400">
                              {patient.id} • {patient.age} years • {patient.sex}
                            </div>
                          </button>
                        ))}
                    </div>
                  )}
                  {selectedPatient && (
                    <div className="mt-2 p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg">
                      <p className="font-medium text-[#111816] dark:text-white">{selectedPatient.name}</p>
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        {selectedPatient.id} • {selectedPatient.age} years • {selectedPatient.sex}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg">
                  <p className="text-sm font-medium text-[#111816] dark:text-white mb-2">Bed Details:</p>
                  <p className="text-sm text-[#61897c] dark:text-gray-400">
                    Bed: {selectedBed.bedNo} • Ward: {selectedBed.ward} • Type: {selectedBed.type}
                  </p>
                  <p className="text-sm text-[#61897c] dark:text-gray-400">
                    Charge: ৳{selectedBed.charge}/day
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Assign Bed
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowBedAssignmentModal(false);
                      setSelectedBed(null);
                      setSelectedPatient(null);
                      setPatientSearch("");
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-[#111816] dark:text-white text-sm font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

