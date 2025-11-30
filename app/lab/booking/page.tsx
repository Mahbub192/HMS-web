"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface LabTest {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
}

interface SelectedTest extends LabTest {
  selected: boolean;
}

const availableTests: LabTest[] = [
  {
    id: "1",
    name: "Complete Blood Count (CBC)",
    code: "HEM001",
    category: "Hematology",
    price: 25.0,
  },
  {
    id: "2",
    name: "Lipid Profile",
    code: "BIO004",
    category: "Biochemistry",
    price: 40.0,
  },
  {
    id: "3",
    name: "Thyroid Stimulating Hormone (TSH)",
    code: "BIO012",
    category: "Biochemistry",
    price: 35.0,
  },
  {
    id: "4",
    name: "Urine Culture",
    code: "MIC002",
    category: "Microbiology",
    price: 30.0,
  },
  {
    id: "5",
    name: "Blood Glucose Test",
    code: "BIO003",
    category: "Biochemistry",
    price: 20.0,
  },
  {
    id: "6",
    name: "Liver Function Test",
    code: "BIO005",
    category: "Biochemistry",
    price: 45.0,
  },
  {
    id: "7",
    name: "Hemoglobin A1C",
    code: "HEM002",
    category: "Hematology",
    price: 30.0,
  },
  {
    id: "8",
    name: "Chest X-Ray",
    code: "RAD001",
    category: "Radiology",
    price: 50.0,
  },
];

export default function LabBookingPage() {
  const router = useRouter();
  const [patientSearch, setPatientSearch] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<{
    id: string;
    name: string;
    dob: string;
    gender: string;
  } | null>(null);
  const [testSearch, setTestSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTests, setSelectedTests] = useState<SelectedTest[]>(
    availableTests.map((test) => ({ ...test, selected: false }))
  );
  const [referringDoctor, setReferringDoctor] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [collectionType, setCollectionType] = useState("Walk-in");

  // Sample patient data
  const samplePatients = [
    {
      id: "P-10254",
      name: "Liam Johnson",
      dob: "1988-05-15",
      gender: "Male",
    },
    {
      id: "P-10255",
      name: "Olivia Smith",
      dob: "1990-08-22",
      gender: "Female",
    },
    {
      id: "P-10256",
      name: "Noah Williams",
      dob: "1985-03-10",
      gender: "Male",
    },
  ];

  const handlePatientSelect = (patient: typeof samplePatients[0]) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
  };

  const toggleTestSelection = (testId: string) => {
    setSelectedTests(
      selectedTests.map((test) =>
        test.id === testId ? { ...test, selected: !test.selected } : test
      )
    );
  };

  const filteredTests = selectedTests.filter((test) => {
    const matchesSearch =
      test.name.toLowerCase().includes(testSearch.toLowerCase()) ||
      test.code.toLowerCase().includes(testSearch.toLowerCase());
    const matchesCategory = selectedCategory === "All" || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const selectedTestsList = selectedTests.filter((test) => test.selected);
  const totalCost = selectedTestsList.reduce((sum, test) => sum + test.price, 0);

  const handleConfirm = () => {
    if (!selectedPatient) {
      alert("Please select a patient first");
      return;
    }
    if (selectedTestsList.length === 0) {
      alert("Please select at least one test");
      return;
    }
    if (!collectionDate) {
      alert("Please select a collection date");
      return;
    }

    // In real app, this would submit to backend
    console.log("Lab Test Booking:", {
      patient: selectedPatient,
      tests: selectedTestsList,
      referringDoctor,
      collectionDate,
      collectionType,
      totalCost,
    });

    alert(
      `Lab test order confirmed!\nPatient: ${selectedPatient.name}\nTests: ${selectedTestsList.length}\nTotal: $${totalCost.toFixed(2)}`
    );
    router.push("/lab/dashboard");
  };

  const handleClearAll = () => {
    setSelectedTests(selectedTests.map((test) => ({ ...test, selected: false })));
    setSelectedPatient(null);
    setPatientSearch("");
    setReferringDoctor("");
    setCollectionDate("");
  };

  const categories = ["All", "Hematology", "Biochemistry", "Microbiology", "Radiology"];

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="mx-auto max-w-screen-2xl">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/lab/dashboard"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Lab Dashboard
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                Lab Test Booking
              </span>
            </div>

            {/* Page Heading */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] text-[#111816] dark:text-white">
                Lab Test Booking
              </h1>
            </div>

            {/* 12-column Grid Layout */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Panel: Patient Identification (3 columns) */}
              <div className="col-span-12 rounded-xl bg-white dark:bg-[#182c25] p-6 lg:col-span-3 border border-[#dbe6e2] dark:border-[#2a3f38]">
                <div className="flex h-full flex-col gap-6">
                  <h3 className="text-xl font-bold text-[#111816] dark:text-white">
                    Patient Information
                  </h3>
                  {/* SearchBar */}
                  <div>
                    <label className="flex h-12 w-full flex-col">
                      <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                        <div className="flex items-center justify-center rounded-l-lg border-y border-l border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] pl-4 text-[#61897c] dark:text-gray-400">
                          <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                          type="text"
                          value={patientSearch}
                          onChange={(e) => setPatientSearch(e.target.value)}
                          className="form-input h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] px-4 pl-2 text-base font-normal leading-normal text-[#111816] dark:text-white placeholder:text-[#61897c] dark:placeholder:text-gray-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Search by ID, Name..."
                        />
                      </div>
                    </label>
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
                              onClick={() => handlePatientSelect(patient)}
                              className="w-full px-4 py-2 text-left hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38] transition-colors"
                            >
                              <div className="font-medium text-[#111816] dark:text-white">
                                {patient.name}
                              </div>
                              <div className="text-sm text-[#61897c] dark:text-gray-400">
                                {patient.id}
                              </div>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                  {/* Patient Details Card */}
                  {selectedPatient && (
                    <div className="flex-1 rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 shrink-0 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-2xl">
                            person
                          </span>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-bold text-[#111816] dark:text-white">
                            {selectedPatient.name}
                          </p>
                          <p className="text-sm font-normal text-[#61897c] dark:text-gray-400">
                            Patient ID: {selectedPatient.id}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2 border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#61897c] dark:text-gray-400">DOB:</span>
                          <span className="font-medium text-[#111816] dark:text-white">
                            {new Date(selectedPatient.dob).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#61897c] dark:text-gray-400">Gender:</span>
                          <span className="font-medium text-[#111816] dark:text-white">
                            {selectedPatient.gender}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Add New Patient Button */}
                  <Link
                    href="/modules/registration/new"
                    className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary/20 text-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 transition-colors"
                  >
                    <span className="material-symbols-outlined text-xl">add</span>
                    <span className="truncate">Add New Patient</span>
                  </Link>
                </div>
              </div>

              {/* Center Panel: Test Selection (5 columns) */}
              <div className="col-span-12 rounded-xl bg-white dark:bg-[#182c25] p-6 lg:col-span-5 border border-[#dbe6e2] dark:border-[#2a3f38]">
                <div className="flex h-full flex-col gap-6">
                  <h3 className="text-xl font-bold text-[#111816] dark:text-white">
                    Select Lab Tests
                  </h3>
                  {/* Search & Filters */}
                  <div className="flex flex-col gap-4">
                    <label className="flex h-12 w-full flex-col">
                      <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                        <div className="flex items-center justify-center rounded-l-lg border-y border-l border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] pl-4 text-[#61897c] dark:text-gray-400">
                          <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                          type="text"
                          value={testSearch}
                          onChange={(e) => setTestSearch(e.target.value)}
                          className="form-input h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] px-4 pl-2 text-base font-normal leading-normal text-[#111816] dark:text-white placeholder:text-[#61897c] dark:placeholder:text-gray-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Search by test name or code..."
                        />
                      </div>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                            selectedCategory === category
                              ? "bg-primary/20 text-primary"
                              : "bg-[#f0f4f3] dark:bg-[#2a3f38] text-[#61897c] dark:text-gray-400 hover:bg-primary/10"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Test List */}
                  <div className="flex-1 space-y-3 overflow-y-auto pr-2 max-h-[500px]">
                    {filteredTests.map((test) => (
                      <div
                        key={test.id}
                        className="flex items-center gap-4 rounded-lg bg-[#f0f4f3] dark:bg-[#2a3f38] p-3 hover:bg-primary/5 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={test.selected}
                          onChange={() => toggleTestSelection(test.id)}
                          className="form-checkbox h-5 w-5 rounded border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#182c25] text-primary focus:ring-primary/50"
                        />
                        <div className="flex-1">
                          <p className="font-bold text-[#111816] dark:text-white">{test.name}</p>
                          <p className="text-sm text-[#61897c] dark:text-gray-400">
                            Test Code: {test.code}
                          </p>
                        </div>
                        <p className="font-bold text-[#111816] dark:text-white">
                          ${test.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Panel: Booking Summary (4 columns) */}
              <div className="col-span-12 rounded-xl bg-white dark:bg-[#182c25] p-6 lg:col-span-4 border border-[#dbe6e2] dark:border-[#2a3f38]">
                <div className="flex h-full flex-col gap-6">
                  <h3 className="text-xl font-bold text-[#111816] dark:text-white">
                    Order Summary
                  </h3>
                  <div className="flex-1 space-y-4 overflow-y-auto rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] p-4 max-h-[300px]">
                    <p className="text-sm font-medium text-[#61897c] dark:text-gray-400">
                      Selected Tests ({selectedTestsList.length})
                    </p>
                    {selectedTestsList.length > 0 ? (
                      <>
                        {selectedTestsList.map((test) => (
                          <div key={test.id} className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="font-medium text-[#111816] dark:text-white text-sm">
                                {test.name}
                              </p>
                            </div>
                            <p className="font-medium text-[#111816] dark:text-white">
                              ${test.price.toFixed(2)}
                            </p>
                          </div>
                        ))}
                        <div className="border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-4">
                          <div className="flex items-center justify-between font-bold text-[#111816] dark:text-white">
                            <p>Total Cost</p>
                            <p>${totalCost.toFixed(2)}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        No tests selected
                      </p>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label
                        className="mb-2 block text-sm font-medium text-[#111816] dark:text-white"
                        htmlFor="referring-doctor"
                      >
                        Referring Doctor
                      </label>
                      <input
                        type="text"
                        id="referring-doctor"
                        value={referringDoctor}
                        onChange={(e) => setReferringDoctor(e.target.value)}
                        className="form-input h-12 w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] px-4 text-[#111816] dark:text-white placeholder:text-[#61897c] dark:placeholder:text-gray-500 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Search doctor by name..."
                      />
                    </div>
                    <div>
                      <label
                        className="mb-2 block text-sm font-medium text-[#111816] dark:text-white"
                        htmlFor="collection-date"
                      >
                        Schedule Sample Collection
                      </label>
                      <input
                        type="datetime-local"
                        id="collection-date"
                        value={collectionDate}
                        onChange={(e) => setCollectionDate(e.target.value)}
                        className="form-input h-12 w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38] px-4 text-[#111816] dark:text-white focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <p className="mb-2 block text-sm font-medium text-[#111816] dark:text-white">
                        Collection Type
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                            collectionType === "Walk-in"
                              ? "border-primary bg-primary/10"
                              : "border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="collection-type"
                            value="Walk-in"
                            checked={collectionType === "Walk-in"}
                            onChange={(e) => setCollectionType(e.target.value)}
                            className="form-radio text-primary focus:ring-primary/50"
                          />
                          <span className="text-[#111816] dark:text-white">Walk-in</span>
                        </label>
                        <label
                          className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                            collectionType === "Home Collection"
                              ? "border-primary bg-primary/10"
                              : "border-[#dbe6e2] dark:border-[#2a3f38] bg-[#f0f4f3] dark:bg-[#2a3f38]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="collection-type"
                            value="Home Collection"
                            checked={collectionType === "Home Collection"}
                            onChange={(e) => setCollectionType(e.target.value)}
                            className="form-radio text-primary focus:ring-primary/50"
                          />
                          <span className="text-[#111816] dark:text-white">Home Collection</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="mt-auto flex gap-3 pt-4">
                    <button
                      onClick={handleClearAll}
                      className="flex h-12 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#f0f4f3] dark:bg-[#2a3f38] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-[#111816] dark:text-white hover:bg-[#dbe6e2] dark:hover:bg-[#2a3f38] transition-colors"
                    >
                      <span>Clear All</span>
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="flex h-12 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-4 pl-4 text-sm font-bold leading-normal tracking-[0.015em] text-background-dark hover:opacity-90 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-xl">check_circle</span>
                      <span className="truncate">Confirm & Generate Order</span>
                    </button>
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

