"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface ProcedureItem {
  id: string;
  procedureCode: string;
  procedureName: string;
  category: string;
  charge: number;
  quantity: number;
  total: number;
}

export default function ProcedureEntryPage() {
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    age: number;
    gender: string;
    bedNo: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    procedureDate: new Date().toISOString().split("T")[0],
    procedureTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    consultant: "",
    department: "",
    procedureType: "Surgical",
    anesthesiaType: "",
    notes: "",
    status: "Scheduled",
  });

  const [procedures, setProcedures] = useState<ProcedureItem[]>([]);
  const [selectedProcedure, setSelectedProcedure] = useState("");

  // Sample patient data
  const samplePatients = [
    {
      id: "P-10254",
      name: "Liam Johnson",
      age: 35,
      gender: "Male",
      bedNo: "B-101",
    },
    {
      id: "P-10255",
      name: "Olivia Smith",
      age: 28,
      gender: "Female",
      bedNo: "B-102",
    },
    {
      id: "P-10256",
      name: "Noah Williams",
      age: 42,
      gender: "Male",
      bedNo: "B-103",
    },
  ];

  // Available procedures
  const availableProcedures = [
    {
      id: "PROC-001",
      code: "SUR-001",
      name: "Appendectomy",
      category: "Surgical",
      charge: 5000,
    },
    {
      id: "PROC-002",
      code: "SUR-002",
      name: "Cholecystectomy",
      category: "Surgical",
      charge: 8000,
    },
    {
      id: "PROC-003",
      code: "SUR-003",
      name: "Hernia Repair",
      category: "Surgical",
      charge: 6000,
    },
    {
      id: "PROC-004",
      code: "DIAG-001",
      name: "Endoscopy",
      category: "Diagnostic",
      charge: 3000,
    },
    {
      id: "PROC-005",
      code: "DIAG-002",
      name: "Colonoscopy",
      category: "Diagnostic",
      charge: 4000,
    },
    {
      id: "PROC-006",
      code: "MIN-001",
      name: "Laparoscopic Surgery",
      category: "Minimally Invasive",
      charge: 10000,
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

  const handleAddProcedure = () => {
    if (!selectedProcedure) {
      alert("Please select a procedure");
      return;
    }

    const procedure = availableProcedures.find((p) => p.id === selectedProcedure);
    if (procedure) {
      const newProcedure: ProcedureItem = {
        id: Date.now().toString(),
        procedureCode: procedure.code,
        procedureName: procedure.name,
        category: procedure.category,
        charge: procedure.charge,
        quantity: 1,
        total: procedure.charge,
      };
      setProcedures([...procedures, newProcedure]);
      setSelectedProcedure("");
    }
  };

  const handleRemoveProcedure = (id: string) => {
    setProcedures(procedures.filter((p) => p.id !== id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setProcedures(
      procedures.map((p) => {
        if (p.id === id) {
          return { ...p, quantity, total: p.charge * quantity };
        }
        return p;
      })
    );
  };

  const totalAmount = procedures.reduce((sum, p) => sum + p.total, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) {
      alert("Please select a patient");
      return;
    }
    if (procedures.length === 0) {
      alert("Please add at least one procedure");
      return;
    }

    console.log("Procedure Entry Data:", {
      patient: selectedPatient,
      formData,
      procedures,
      totalAmount,
    });

    alert("Procedure entry submitted successfully!");
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
                Procedure Entry
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                PROCEDURE ENTRY FORM
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Enter and manage patient procedures for IPD.
              </p>
            </header>

            {/* Form Container */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Patient Selection Section */}
                <div className="bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg p-4">
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
                      <div className="mt-4 p-4 bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-[#111816] dark:text-white">
                              {selectedPatient.name}
                            </p>
                            <p className="text-sm text-[#61897c] dark:text-gray-400">
                              ID: {selectedPatient.id} • Age: {selectedPatient.age} • {selectedPatient.gender} • Bed: {selectedPatient.bedNo}
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

                {/* Procedure Details Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Procedure Date: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="procedureDate"
                        value={formData.procedureDate}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Procedure Time: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="time"
                        name="procedureTime"
                        value={formData.procedureTime}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Consultant: <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="consultant"
                          value={formData.consultant}
                          onChange={handleInputChange}
                          required
                          placeholder="Search Consultant by Name or Code"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-16 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-gray-400 text-sm">
                            close
                          </span>
                          <button
                            type="button"
                            className="px-2 py-1 text-xs bg-primary/20 text-primary rounded"
                          >
                            Code
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Department: <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Department</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Gastroenterology">Gastroenterology</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Procedure Type: <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="procedureType"
                        value={formData.procedureType}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="Surgical">Surgical</option>
                        <option value="Diagnostic">Diagnostic</option>
                        <option value="Therapeutic">Therapeutic</option>
                        <option value="Minimally Invasive">Minimally Invasive</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Anesthesia Type:
                      </label>
                      <select
                        name="anesthesiaType"
                        value={formData.anesthesiaType}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select Anesthesia</option>
                        <option value="General">General Anesthesia</option>
                        <option value="Local">Local Anesthesia</option>
                        <option value="Regional">Regional Anesthesia</option>
                        <option value="Sedation">Sedation</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Status: <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Procedure Selection Section */}
                <div className="border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-6">
                  <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                    Select Procedures
                  </h3>
                  <div className="flex gap-4 mb-4">
                    <div className="flex-1 relative">
                      <select
                        value={selectedProcedure}
                        onChange={(e) => setSelectedProcedure(e.target.value)}
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select Procedure...</option>
                        {availableProcedures.map((proc) => (
                          <option key={proc.id} value={proc.id}>
                            {proc.code} - {proc.name} ({proc.category}) - ${proc.charge}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddProcedure}
                      className="flex items-center justify-center gap-2 px-6 py-2 bg-primary text-background-dark rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <span className="material-symbols-outlined">add</span>
                      <span>Add Procedure</span>
                    </button>
                  </div>

                  {/* Procedures Table */}
                  {procedures.length > 0 && (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                          <tr>
                            <th className="px-4 py-3 text-left text-[#111816] dark:text-white">
                              Procedure Code
                            </th>
                            <th className="px-4 py-3 text-left text-[#111816] dark:text-white">
                              Procedure Name
                            </th>
                            <th className="px-4 py-3 text-left text-[#111816] dark:text-white">
                              Category
                            </th>
                            <th className="px-4 py-3 text-center text-[#111816] dark:text-white">
                              Quantity
                            </th>
                            <th className="px-4 py-3 text-right text-[#111816] dark:text-white">
                              Unit Charge
                            </th>
                            <th className="px-4 py-3 text-right text-[#111816] dark:text-white">
                              Total
                            </th>
                            <th className="px-4 py-3 text-center text-[#111816] dark:text-white">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                          {procedures.map((procedure) => (
                            <tr key={procedure.id}>
                              <td className="px-4 py-3 font-mono text-[#111816] dark:text-white">
                                {procedure.procedureCode}
                              </td>
                              <td className="px-4 py-3 text-[#111816] dark:text-white">
                                {procedure.procedureName}
                              </td>
                              <td className="px-4 py-3 text-[#61897c] dark:text-gray-400">
                                {procedure.category}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <input
                                  type="number"
                                  min="1"
                                  value={procedure.quantity}
                                  onChange={(e) =>
                                    handleUpdateQuantity(
                                      procedure.id,
                                      parseInt(e.target.value) || 1
                                    )
                                  }
                                  className="w-16 rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-center text-[#111816] dark:text-white"
                                />
                              </td>
                              <td className="px-4 py-3 text-right text-[#111816] dark:text-white">
                                ${procedure.charge.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-right font-semibold text-[#111816] dark:text-white">
                                ${procedure.total.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProcedure(procedure.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span className="material-symbols-outlined">delete</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                          <tr>
                            <td colSpan={5} className="px-4 py-3 text-right font-bold text-[#111816] dark:text-white">
                              Total Amount:
                            </td>
                            <td className="px-4 py-3 text-right font-bold text-primary">
                              ${totalAmount.toFixed(2)}
                            </td>
                            <td></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                <div className="border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-6">
                  <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                    Notes / Observations:
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Enter any notes or observations about the procedure..."
                    className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Save Procedure Entry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
