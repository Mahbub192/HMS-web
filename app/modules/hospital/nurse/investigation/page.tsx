"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface InvestigationItem {
  id: string;
  name: string;
  category: string;
  requestedBy: string;
  requestDate: string;
  status: "Pending" | "Approved" | "Completed" | "Rejected";
}

export default function InvestigationPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    bedNo?: string;
    ward?: string;
    department?: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    requestDate: new Date().toISOString().split("T")[0],
    investigationName: "",
    category: "Lab Test",
    priority: "Normal",
    remarks: "",
    requestedBy: "",
  });

  const [investigations, setInvestigations] = useState<InvestigationItem[]>([]);

  const samplePatients = [
    { id: "P-10254", name: "Liam Johnson", bedNo: "ICU-05", ward: "ICU" },
    { id: "P-10260", name: "Robert Taylor", department: "Cardiology" },
  ];

  const investigationCategories = [
    "Lab Test",
    "Radiology",
    "Ultrasound",
    "CT Scan",
    "MRI",
    "ECG",
    "Echocardiography",
    "Endoscopy",
    "Biopsy",
    "Other",
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

  const handleAddInvestigation = () => {
    if (!formData.investigationName) {
      alert("Please enter investigation name");
      return;
    }

    const newItem: InvestigationItem = {
      id: `INV-${Date.now()}`,
      name: formData.investigationName,
      category: formData.category,
      requestedBy: formData.requestedBy || "Current User",
      requestDate: formData.requestDate,
      status: "Pending",
    };

    setInvestigations([...investigations, newItem]);
    setFormData({
      ...formData,
      investigationName: "",
      remarks: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (investigations.length === 0) {
      alert("Please add at least one investigation");
      return;
    }

    console.log("Investigation Request Data:", {
      patient: selectedPatient,
      investigations,
      formData,
    });

    alert(`Investigation request submitted successfully!\nPatient: ${selectedPatient.name}\nItems: ${investigations.length}`);
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
              <Link
                href="/modules/hospital/nurse"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Nurse Section
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Investigation
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                INVESTIGATION REQUEST
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Request investigations for patients.
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
                                {patient.id}
                                {patient.bedNo && ` • Bed: ${patient.bedNo} • ${patient.ward}`}
                                {patient.department && ` • ${patient.department}`}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                    {selectedPatient && (
                      <div className="mt-4 p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[#111816] dark:text-white">
                              {selectedPatient.name}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              ID: {selectedPatient.id}
                              {selectedPatient.bedNo && ` • Bed: ${selectedPatient.bedNo} • ${selectedPatient.ward}`}
                              {selectedPatient.department && ` • ${selectedPatient.department}`}
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

                {/* Investigation Request Form */}
                {selectedPatient && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Add Investigation
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Request Date: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="requestDate"
                            value={formData.requestDate}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Category: <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            {investigationCategories.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Investigation Name: <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="investigationName"
                          value={formData.investigationName}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter investigation name"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Priority: <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="Normal">Normal</option>
                          <option value="Urgent">Urgent</option>
                          <option value="Emergency">Emergency</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Requested By:
                        </label>
                        <input
                          type="text"
                          name="requestedBy"
                          value={formData.requestedBy}
                          onChange={handleInputChange}
                          placeholder="Enter nurse/staff name"
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
                          placeholder="Enter any remarks or special instructions..."
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleAddInvestigation}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-lg hover:bg-primary/20 transition-colors"
                      >
                        <span className="material-symbols-outlined">add</span>
                        <span>Add Investigation</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Investigations List */}
                {investigations.length > 0 && (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Investigation Requests
                    </h3>
                    <div className="space-y-3">
                      {investigations.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold text-[#111816] dark:text-white">
                                {item.name}
                              </p>
                              <p className="text-sm text-[#61897c] dark:text-gray-400">
                                Category: {item.category}
                              </p>
                              <p className="text-xs text-[#61897c] dark:text-gray-400">
                                Requested by: {item.requestedBy} • {new Date(item.requestDate).toLocaleDateString()}
                              </p>
                            </div>
                            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4 pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                      >
                        <span className="material-symbols-outlined">send</span>
                        <span>Submit Investigation Request</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Right Column - Recent Investigations */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                    Recent Investigations
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                      <p className="text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Complete Blood Count (CBC)
                      </p>
                      <p className="text-xs text-[#61897c] dark:text-gray-400">
                        P-10254 • Lab Test • Completed
                      </p>
                    </div>
                    <div className="p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                      <p className="text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Chest X-Ray
                      </p>
                      <p className="text-xs text-[#61897c] dark:text-gray-400">
                        P-10260 • Radiology • Approved
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

