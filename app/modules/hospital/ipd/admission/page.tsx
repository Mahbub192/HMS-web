"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

export default function IPDAdmissionPage() {
  const [formData, setFormData] = useState({
    projectName: "Clinical",
    admissionDate: new Date().toISOString().split("T")[0],
    patientId: "",
    patientStatus: "General",
    spouseName: "",
    address: "",
    registrationNo: "",
    admissionTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    patientName: "",
    sex: "",
    age: "",
    phoneNumber: "",
    occupation: "",
    religion: "",
    bedNo: "",
    bedCharge: "",
    department: "",
    guardian1Name: "",
    guardian1Relation: "",
    guardian1Phone: "",
    guardian2Name: "",
    guardian2Relation: "",
    guardian2Phone: "",
    reference: "",
    corporateClient: "No",
    admissionBy: "Admission By",
    remarks: "Remarks",
    consultant: "",
    refId: "",
    refName: "",
    packageEnabled: true,
    packageCode: "",
    packageName: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admission Form Data:", formData);
    alert("Patient admission form submitted successfully!");
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
                Admission Form
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                PATIENT ADMISSION FORM
              </h1>
            </header>

            {/* Form Container */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Top Section - Two Columns */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Project Name: <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="projectName"
                        value={formData.projectName}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="Clinical">Clinical</option>
                        <option value="Research">Research</option>
                        <option value="Emergency">Emergency</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Admission Date:
                      </label>
                      <input
                        type="date"
                        name="admissionDate"
                        value={formData.admissionDate}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Patient Id: <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Patient ID"
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Patient Status: <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="patientStatus"
                        value={formData.patientStatus}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="General">General</option>
                        <option value="Emergency">Emergency</option>
                        <option value="ICU">ICU</option>
                        <option value="Private">Private</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Spouse Name:
                      </label>
                      <input
                        type="text"
                        name="spouseName"
                        value={formData.spouseName}
                        onChange={handleInputChange}
                        placeholder="Enter Spouse Name"
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Address:
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter Address"
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    {/* Bed Info Section */}
                    <div className="pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                      <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                        Bed Info
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Bed No: <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="bedNo"
                              value={formData.bedNo}
                              onChange={handleInputChange}
                              required
                              placeholder="Search By Bed No"
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                              expand_more
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Bed Charge: <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                              camera
                            </span>
                            <input
                              type="number"
                              name="bedCharge"
                              value={formData.bedCharge}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter Bed Charge"
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pl-10 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Department: <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              required
                              placeholder="Select Department"
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                              <span className="material-symbols-outlined text-gray-400 text-sm">
                                close
                              </span>
                              <span className="material-symbols-outlined text-gray-400 text-sm">
                                expand_more
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Guardian Information */}
                    <div className="pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                      <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                        Guardian Information
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Guardian 1:
                          </label>
                          <input
                            type="text"
                            name="guardian1Name"
                            value={formData.guardian1Name}
                            onChange={handleInputChange}
                            placeholder="Name (Guardian 1)"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary mb-2"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                person
                              </span>
                              <input
                                type="text"
                                name="guardian1Relation"
                                value={formData.guardian1Relation}
                                onChange={handleInputChange}
                                placeholder="Relation (Guardian 1)"
                                className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pl-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                            </div>
                            <div className="relative">
                              <input
                                type="tel"
                                name="guardian1Phone"
                                value={formData.guardian1Phone}
                                onChange={handleInputChange}
                                placeholder="Phone (Guardian 1)"
                                className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                phone
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Guardian 2:
                          </label>
                          <input
                            type="text"
                            name="guardian2Name"
                            value={formData.guardian2Name}
                            onChange={handleInputChange}
                            placeholder="Name (Guardian 2)"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary mb-2"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <div className="relative">
                              <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                person
                              </span>
                              <input
                                type="text"
                                name="guardian2Relation"
                                value={formData.guardian2Relation}
                                onChange={handleInputChange}
                                placeholder="Relation (Guardian 2)"
                                className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pl-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                            </div>
                            <div className="relative">
                              <input
                                type="tel"
                                name="guardian2Phone"
                                value={formData.guardian2Phone}
                                onChange={handleInputChange}
                                placeholder="Phone (Guardian 2)"
                                className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                              />
                              <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                phone
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reference and Admission Details */}
                    <div className="pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Reference: <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="reference"
                              value={formData.reference}
                              onChange={handleInputChange}
                              required
                              placeholder="Search By Doctor Code or Doctor Name"
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-20 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                              <span className="material-symbols-outlined text-gray-400 text-sm">
                                expand_more
                              </span>
                              <span className="material-symbols-outlined text-gray-400 text-sm">
                                description
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
                            Corporate Client:
                          </label>
                          <select
                            name="corporateClient"
                            value={formData.corporateClient}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Admission By: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="admissionBy"
                            value={formData.admissionBy}
                            onChange={handleInputChange}
                            required
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Remarks:
                          </label>
                          <input
                            type="text"
                            name="remarks"
                            value={formData.remarks}
                            onChange={handleInputChange}
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Registration No: <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="registrationNo"
                          value={formData.registrationNo}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter Registration No"
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-12 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                          <span className="material-symbols-outlined text-gray-400 text-sm">
                            close
                          </span>
                          <span className="material-symbols-outlined text-gray-400 text-sm">
                            description
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Admission Time:
                      </label>
                      <input
                        type="time"
                        name="admissionTime"
                        value={formData.admissionTime}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                      />
                    </div>

                    {/* Patient Info Section */}
                    <div className="pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                      <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                        Patient Info
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Patient Name: <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            required
                            placeholder="Enter Patient Name"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                              Sex:
                            </label>
                            <select
                              name="sex"
                              value={formData.sex}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            >
                              <option value="">Select</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                              Age:
                            </label>
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleInputChange}
                              placeholder="Age"
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Phone Number: <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="tel"
                              name="phoneNumber"
                              value={formData.phoneNumber}
                              onChange={handleInputChange}
                              required
                              placeholder="Enter Phone Number"
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-10 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            />
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                              phone
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Occupation:
                          </label>
                          <input
                            type="text"
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleInputChange}
                            placeholder="Enter Occupation"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Religion:
                          </label>
                          <div className="relative">
                            <select
                              name="religion"
                              value={formData.religion}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                            >
                              <option value="">Select Religion</option>
                              <option value="Islam">Islam</option>
                              <option value="Christianity">Christianity</option>
                              <option value="Hinduism">Hinduism</option>
                              <option value="Buddhism">Buddhism</option>
                              <option value="Other">Other</option>
                            </select>
                            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                              expand_more
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Referred Info Section */}
                    <div className="pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                      <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                        Referred Info
                      </h3>
                      <div className="space-y-4">
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
                              placeholder="Search Consultant"
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
                            Ref Id:
                          </label>
                          <input
                            type="text"
                            name="refId"
                            value={formData.refId}
                            onChange={handleInputChange}
                            placeholder="Enter Ref Id"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                            Ref Name:
                          </label>
                          <input
                            type="text"
                            name="refName"
                            value={formData.refName}
                            onChange={handleInputChange}
                            placeholder="Enter Ref Name"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Package Info Section */}
                <div className="pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="packageEnabled"
                        checked={formData.packageEnabled}
                        onChange={handleInputChange}
                        className="w-4 h-4 rounded border-[#dbe6e2] dark:border-[#2a3f38] text-primary focus:ring-primary"
                      />
                      <label className="text-sm font-medium text-[#111816] dark:text-white">
                        Package:
                      </label>
                    </div>
                    {formData.packageEnabled && (
                      <>
                        <div className="relative flex-1 max-w-md">
                          <input
                            type="text"
                            name="packageCode"
                            value={formData.packageCode}
                            onChange={handleInputChange}
                            placeholder="Search By Package Code or Package Name"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 pr-8 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                            expand_more
                          </span>
                        </div>
                        <div className="flex-1 max-w-md">
                          <input
                            type="text"
                            name="packageName"
                            value={formData.packageName}
                            onChange={handleInputChange}
                            placeholder="Package Name"
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-6 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-background-dark text-sm font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>Save</span>
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
