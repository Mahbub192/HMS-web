"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  // Basic Information
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  maritalStatus: string;
  // Contact Details
  email: string;
  phone: string;
  alternatePhone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  // Insurance
  insuranceProvider: string;
  insurancePolicyNumber: string;
  insuranceGroupNumber: string;
  insuranceExpiryDate: string;
  // Emergency Contact 1
  emergencyContact1Name: string;
  emergencyContact1Relationship: string;
  emergencyContact1Phone: string;
  emergencyContact1Address: string;
  // Emergency Contact 2
  emergencyContact2Name: string;
  emergencyContact2Relationship: string;
  emergencyContact2Phone: string;
  emergencyContact2Address: string;
}

export default function NewRegistrationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "basic" | "contact" | "insurance" | "emergency"
  >("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    maritalStatus: "",
    email: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    insuranceGroupNumber: "",
    insuranceExpiryDate: "",
    emergencyContact1Name: "",
    emergencyContact1Relationship: "",
    emergencyContact1Phone: "",
    emergencyContact1Address: "",
    emergencyContact2Name: "",
    emergencyContact2Relationship: "",
    emergencyContact2Phone: "",
    emergencyContact2Address: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate patient ID (in real app, this would come from backend)
    const patientId = `P-${Date.now().toString().slice(-6)}`;

    console.log("Registration submitted:", { ...formData, patientId });

    // Show success message and redirect
    alert(`Patient registered successfully! Patient ID: ${patientId}`);
    router.push(`/admin/patients/${patientId}/profile`);
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="w-full max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/modules/registration"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Registration
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-[#111816] dark:text-white">
                New Registration
              </span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div className="flex flex-col">
                <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  New Patient Registration
                </h1>
                <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                  Register a new patient in the system.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/modules/registration"
                  className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 px-4 text-sm font-bold text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <span className="truncate">Cancel</span>
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary text-background-dark px-4 text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">save</span>
                  <span className="truncate">
                    {isSubmitting ? "Registering..." : "Register Patient"}
                  </span>
                </button>
              </div>
            </div>

            {/* Main Form Card */}
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm">
              {/* Tabs */}
              <div className="pt-2">
                <div className="flex border-b border-[#dbe6e2] dark:border-[#2a3f38] -mx-4 sm:-mx-6 px-4 sm:px-6 gap-8 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab("basic")}
                    className={`flex shrink-0 flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === "basic"
                        ? "border-primary"
                        : "border-b-transparent text-[#61897c] dark:text-gray-400 hover:border-primary/50 hover:text-[#111816] dark:hover:text-white"
                    }`}
                  >
                    <p
                      className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                        activeTab === "basic"
                          ? "text-primary"
                          : "text-[#61897c] dark:text-gray-400"
                      }`}
                    >
                      Basic Information
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("contact")}
                    className={`flex shrink-0 flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === "contact"
                        ? "border-primary"
                        : "border-b-transparent text-[#61897c] dark:text-gray-400 hover:border-primary/50 hover:text-[#111816] dark:hover:text-white"
                    }`}
                  >
                    <p
                      className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                        activeTab === "contact"
                          ? "text-primary"
                          : "text-[#61897c] dark:text-gray-400"
                      }`}
                    >
                      Contact Details
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("insurance")}
                    className={`flex shrink-0 flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === "insurance"
                        ? "border-primary"
                        : "border-b-transparent text-[#61897c] dark:text-gray-400 hover:border-primary/50 hover:text-[#111816] dark:hover:text-white"
                    }`}
                  >
                    <p
                      className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                        activeTab === "insurance"
                          ? "text-primary"
                          : "text-[#61897c] dark:text-gray-400"
                      }`}
                    >
                      Insurance
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("emergency")}
                    className={`flex shrink-0 flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === "emergency"
                        ? "border-primary"
                        : "border-b-transparent text-[#61897c] dark:text-gray-400 hover:border-primary/50 hover:text-[#111816] dark:hover:text-white"
                    }`}
                  >
                    <p
                      className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                        activeTab === "emergency"
                          ? "text-primary"
                          : "text-[#61897c] dark:text-gray-400"
                      }`}
                    >
                      Emergency Contacts
                    </p>
                  </button>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-4 sm:p-6">
                {/* Basic Information Tab */}
                {activeTab === "basic" && (
                  <div className="pt-6">
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Basic Information
                    </h2>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="firstName"
                        >
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="middleName"
                        >
                          Middle Name
                        </label>
                        <input
                          id="middleName"
                          name="middleName"
                          type="text"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="Enter middle name"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="lastName"
                        >
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="dateOfBirth"
                        >
                          Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="gender"
                        >
                          Gender <span className="text-red-500">*</span>
                        </label>
                        <select
                          required
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="bloodType"
                        >
                          Blood Type
                        </label>
                        <select
                          id="bloodType"
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Blood Type</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="maritalStatus"
                        >
                          Marital Status
                        </label>
                        <select
                          id="maritalStatus"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                        >
                          <option value="">Select Marital Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact Details Tab */}
                {activeTab === "contact" && (
                  <div className="pt-6">
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Contact Details
                    </h2>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="email"
                        >
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="patient@example.com"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="phone"
                        >
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="alternatePhone"
                        >
                          Alternate Phone
                        </label>
                        <input
                          id="alternatePhone"
                          name="alternatePhone"
                          type="tel"
                          value={formData.alternatePhone}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div className="col-span-12">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="address"
                        >
                          Street Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="address"
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="123 Main Street"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="city"
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="City"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="state"
                        >
                          State/Province <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="state"
                          name="state"
                          type="text"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="State"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="zipCode"
                        >
                          ZIP/Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="12345"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="country"
                        >
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          id="country"
                          name="country"
                          type="text"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="Country"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Insurance Tab */}
                {activeTab === "insurance" && (
                  <div className="pt-6">
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Insurance Information
                    </h2>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="insuranceProvider"
                        >
                          Insurance Provider
                        </label>
                        <input
                          id="insuranceProvider"
                          name="insuranceProvider"
                          type="text"
                          value={formData.insuranceProvider}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="e.g., Aetna Health, Blue Cross"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="insurancePolicyNumber"
                        >
                          Policy Number
                        </label>
                        <input
                          id="insurancePolicyNumber"
                          name="insurancePolicyNumber"
                          type="text"
                          value={formData.insurancePolicyNumber}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="Policy number"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="insuranceGroupNumber"
                        >
                          Group Number
                        </label>
                        <input
                          id="insuranceGroupNumber"
                          name="insuranceGroupNumber"
                          type="text"
                          value={formData.insuranceGroupNumber}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          placeholder="Group number"
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                          htmlFor="insuranceExpiryDate"
                        >
                          Expiry Date
                        </label>
                        <input
                          id="insuranceExpiryDate"
                          name="insuranceExpiryDate"
                          type="date"
                          value={formData.insuranceExpiryDate}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Emergency Contacts Tab */}
                {activeTab === "emergency" && (
                  <div className="pt-6">
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Emergency Contacts
                    </h2>
                    <div className="space-y-8">
                      {/* Emergency Contact 1 */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                          Emergency Contact 1
                        </h3>
                        <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact1Name"
                            >
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              required
                              id="emergencyContact1Name"
                              name="emergencyContact1Name"
                              type="text"
                              value={formData.emergencyContact1Name}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                              placeholder="Full name"
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact1Relationship"
                            >
                              Relationship <span className="text-red-500">*</span>
                            </label>
                            <select
                              required
                              id="emergencyContact1Relationship"
                              name="emergencyContact1Relationship"
                              value={formData.emergencyContact1Relationship}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            >
                              <option value="">Select Relationship</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Parent">Parent</option>
                              <option value="Child">Child</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Friend">Friend</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact1Phone"
                            >
                              Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                              required
                              id="emergencyContact1Phone"
                              name="emergencyContact1Phone"
                              type="tel"
                              value={formData.emergencyContact1Phone}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact1Address"
                            >
                              Address
                            </label>
                            <input
                              id="emergencyContact1Address"
                              name="emergencyContact1Address"
                              type="text"
                              value={formData.emergencyContact1Address}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact 2 */}
                      <div>
                        <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                          Emergency Contact 2 (Optional)
                        </h3>
                        <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact2Name"
                            >
                              Full Name
                            </label>
                            <input
                              id="emergencyContact2Name"
                              name="emergencyContact2Name"
                              type="text"
                              value={formData.emergencyContact2Name}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                              placeholder="Full name"
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact2Relationship"
                            >
                              Relationship
                            </label>
                            <select
                              id="emergencyContact2Relationship"
                              name="emergencyContact2Relationship"
                              value={formData.emergencyContact2Relationship}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            >
                              <option value="">Select Relationship</option>
                              <option value="Spouse">Spouse</option>
                              <option value="Parent">Parent</option>
                              <option value="Child">Child</option>
                              <option value="Sibling">Sibling</option>
                              <option value="Friend">Friend</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact2Phone"
                            >
                              Phone Number
                            </label>
                            <input
                              id="emergencyContact2Phone"
                              name="emergencyContact2Phone"
                              type="tel"
                              value={formData.emergencyContact2Phone}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                              placeholder="+1 (555) 123-4567"
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-6">
                            <label
                              className="block text-sm font-medium text-[#61897c] dark:text-gray-400 mb-1"
                              htmlFor="emergencyContact2Address"
                            >
                              Address
                            </label>
                            <input
                              id="emergencyContact2Address"
                              name="emergencyContact2Address"
                              type="text"
                              value={formData.emergencyContact2Address}
                              onChange={handleInputChange}
                              className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                              placeholder="Address"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === "basic") return;
                      if (activeTab === "contact") setActiveTab("basic");
                      if (activeTab === "insurance") setActiveTab("contact");
                      if (activeTab === "emergency") setActiveTab("insurance");
                    }}
                    disabled={activeTab === "basic"}
                    className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 px-4 text-sm font-bold text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="material-symbols-outlined">arrow_back</span>
                    <span className="truncate">Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === "basic") setActiveTab("contact");
                      if (activeTab === "contact") setActiveTab("insurance");
                      if (activeTab === "insurance") setActiveTab("emergency");
                      if (activeTab === "emergency") return;
                    }}
                    disabled={activeTab === "emergency"}
                    className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary/20 dark:bg-primary/30 px-4 text-sm font-bold text-[#111816] dark:text-white hover:bg-primary/30 dark:hover:bg-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">Next</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
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

