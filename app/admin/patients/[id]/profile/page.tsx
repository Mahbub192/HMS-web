"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Sample patient data - In real app, this would come from API
const getPatientData = (id: string) => {
  const patients: Record<string, any> = {
    "P-843592": {
      id: "P-843592",
      name: "Isabella Rossi",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAf9gNiZOODiRboXanpIi0-ZlnmDlmzFy-_c5HoMm8Kc7v1D6wFQlz2cUEAIUUFIL4IvpSqaMe1sS-Q_YaNf8bgsdceBs9xr5GV8DFt0C4XfFgAsdgJw2IzS5dKbuR5Zu0n2uejhSUmEqxy8hcCZN9tN9bMH6bj3VVise1RlM82dKgtJgxQzQY4PKRaRArmZgVfS9WyTLdaCkDvZUfSGMpgckA_bRl5RBq7HwGhgnstxTzvYmunPaVLl0lZRrdh3qwWrztWWUbxx0iw",
      firstName: "Isabella",
      middleName: "",
      lastName: "Rossi",
      dateOfBirth: "1990-05-15",
      gender: "Female",
      bloodType: "O+",
      maritalStatus: "Married",
      email: "isabella.rossi@example.com",
      phone: "+1 (555) 123-4567",
      alternatePhone: "+1 (555) 987-6543",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      insuranceProvider: "Blue Cross Blue Shield",
      insurancePolicyNumber: "BCBS-123456789",
      insuranceGroupNumber: "GRP-987654",
      insuranceEffectiveDate: "2023-01-01",
      insuranceExpiryDate: "2024-12-31",
      insuranceType: "Primary",
      emergencyContact1Name: "Marco Rossi",
      emergencyContact1Relationship: "Spouse",
      emergencyContact1Phone: "+1 (555) 234-5678",
      emergencyContact1Address: "123 Main Street, New York, NY 10001",
      emergencyContact2Name: "Sophia Rossi",
      emergencyContact2Relationship: "Daughter",
      emergencyContact2Phone: "+1 (555) 345-6789",
      emergencyContact2Address: "456 Oak Avenue, New York, NY 10002",
      status: "Active, In-Patient",
    },
    "P-789012": {
      id: "P-789012",
      name: "Jameson Smith",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwDz8fMTdNfZOoOrBHpwGRWu8Hr0Qqb8epOnqcqiUp4vdQvW-lNGMWmfZsG930CQvoRPVkskbhcOXqGXfh4EDGWFpdvj0S2aXklUkvasF0BpS40OK7ExKYNJHq1r038hMDKJ9Fa9xzCN81qZl1j6AwVCD0e9XP46JIDYx9RetNVaPnYKLETvjxs5dmtkYDVMCfePALXryAvLhFSxEqEszc0yx2BuXLwZZRqqC5OjFoG5Vzzv3lE1RsOYU6AjRuCif7eBNOllriUV52",
      firstName: "Jameson",
      middleName: "",
      lastName: "Smith",
      dateOfBirth: "1981-03-20",
      gender: "Male",
      bloodType: "O+",
      maritalStatus: "Married",
      email: "jameson.smith@example.com",
      phone: "+1 (555) 234-5678",
      alternatePhone: "",
      address: "456 Oak Avenue",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      insuranceProvider: "Aetna",
      insurancePolicyNumber: "AET-987654321",
      insuranceGroupNumber: "GRP-123456",
      insuranceEffectiveDate: "2023-06-01",
      insuranceExpiryDate: "2024-05-31",
      insuranceType: "Primary",
      emergencyContact1Name: "Sarah Smith",
      emergencyContact1Relationship: "Spouse",
      emergencyContact1Phone: "+1 (555) 234-5679",
      emergencyContact1Address: "456 Oak Avenue, New York, NY 10002",
      emergencyContact2Name: "John Smith",
      emergencyContact2Relationship: "Brother",
      emergencyContact2Phone: "+1 (555) 234-5680",
      emergencyContact2Address: "789 Pine Street, New York, NY 10003",
      status: "Active, Out-Patient",
    },
  };
  return patients[id] || patients["P-843592"];
};

export default function PatientProfilePage() {
  const params = useParams();
  const router = useRouter();
  const patientId = params.id as string;
  const [activeTab, setActiveTab] = useState("basic");
  const [isEditing, setIsEditing] = useState(false);
  const [patientData, setPatientData] = useState<any>(null);

  useEffect(() => {
    const data = getPatientData(patientId);
    setPatientData(data);
  }, [patientId]);

  const [formData, setFormData] = useState({
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
    insuranceEffectiveDate: "",
    insuranceExpiryDate: "",
    insuranceType: "",
    emergencyContact1Name: "",
    emergencyContact1Relationship: "",
    emergencyContact1Phone: "",
    emergencyContact1Address: "",
    emergencyContact2Name: "",
    emergencyContact2Relationship: "",
    emergencyContact2Phone: "",
    emergencyContact2Address: "",
  });

  useEffect(() => {
    if (patientData) {
      setFormData({
        firstName: patientData.firstName || "",
        middleName: patientData.middleName || "",
        lastName: patientData.lastName || "",
        dateOfBirth: patientData.dateOfBirth || "",
        gender: patientData.gender || "",
        bloodType: patientData.bloodType || "",
        maritalStatus: patientData.maritalStatus || "",
        email: patientData.email || "",
        phone: patientData.phone || "",
        alternatePhone: patientData.alternatePhone || "",
        address: patientData.address || "",
        city: patientData.city || "",
        state: patientData.state || "",
        zipCode: patientData.zipCode || "",
        country: patientData.country || "",
        insuranceProvider: patientData.insuranceProvider || "",
        insurancePolicyNumber: patientData.insurancePolicyNumber || "",
        insuranceGroupNumber: patientData.insuranceGroupNumber || "",
        insuranceEffectiveDate: patientData.insuranceEffectiveDate || "",
        insuranceExpiryDate: patientData.insuranceExpiryDate || "",
        insuranceType: patientData.insuranceType || "",
        emergencyContact1Name: patientData.emergencyContact1Name || "",
        emergencyContact1Relationship:
          patientData.emergencyContact1Relationship || "",
        emergencyContact1Phone: patientData.emergencyContact1Phone || "",
        emergencyContact1Address: patientData.emergencyContact1Address || "",
        emergencyContact2Name: patientData.emergencyContact2Name || "",
        emergencyContact2Relationship:
          patientData.emergencyContact2Relationship || "",
        emergencyContact2Phone: patientData.emergencyContact2Phone || "",
        emergencyContact2Address: patientData.emergencyContact2Address || "",
      });
    }
  }, [patientData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saving patient data:", formData);
    setIsEditing(false);
    alert("Patient information saved successfully!");
  };

  const tabs = [
    { id: "basic", label: "Basic Information" },
    { id: "contact", label: "Contact Details" },
    { id: "insurance", label: "Insurance" },
    { id: "emergency", label: "Emergency Contacts" },
  ];

  if (!patientData) {
    return (
      <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark">
        <Sidebar userType="admin" />
        <main className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 p-8 flex items-center justify-center">
            <p className="text-gray-500">Loading patient data...</p>
          </div>
        </main>
      </div>
    );
  }

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
                href="/admin/patients"
                className="text-gray-500 dark:text-gray-400 hover:text-primary text-base font-medium leading-normal"
              >
                Patients
              </Link>
              <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                {patientData.name}
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-base font-medium leading-normal">
                /
              </span>
              <span className="text-[#111816] dark:text-white text-base font-medium leading-normal">
                Profile
              </span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div className="flex flex-col">
                <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Patient Profile
                </h1>
                <p className="text-[#61897c] dark:text-[#a0b8b1] text-base font-normal leading-normal">
                  Manage and review patient information.
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/patients/${patientId}/history`}
                  className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary/20 text-[#111816] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/30 transition-colors"
                >
                  <span className="material-symbols-outlined">history</span>
                  <span className="truncate">View History</span>
                </Link>
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em]">
                  <span className="material-symbols-outlined">add</span>
                  <span className="truncate">Add New Patient</span>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a2c26] rounded-xl shadow-sm p-4 sm:p-6">
              {/* Profile Header */}
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between pb-6 border-b border-[#dbe6e2] dark:border-[#2a4038]">
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={patientData.avatar}
                      alt={patientData.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#111816] dark:text-white text-2xl font-bold leading-tight tracking-[-0.015em]">
                      {patientData.name}
                    </p>
                    <p className="text-[#61897c] dark:text-[#a0b8b1] text-base font-normal leading-normal">
                      Patient ID: {patientData.id}
                    </p>
                    <p className="text-[#61897c] dark:text-[#a0b8b1] text-base font-normal leading-normal">
                      Status: {patientData.status}
                    </p>
                  </div>
                </div>
                <div className="flex w-full gap-3 md:w-auto">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
                      >
                        <span className="truncate">Save Changes</span>
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-gray-200 dark:bg-gray-700 text-[#111816] dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        <span className="truncate">Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-background-dark text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
                    >
                      <span className="truncate">Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tabs */}
              <div className="pt-2">
                <div className="flex border-b border-[#dbe6e2] dark:border-[#2a4038] -mx-4 sm:-mx-6 px-4 sm:px-6 gap-8 overflow-x-auto">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex shrink-0 flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors ${
                        activeTab === tab.id
                          ? "border-primary text-primary"
                          : "border-b-transparent text-[#61897c] dark:text-[#a0b8b1] hover:border-primary/50 hover:text-[#111816] dark:hover:text-white"
                      }`}
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                        {tab.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Content - Same as before but using formData state */}
              <div className="pt-6">
                {/* Basic Information Tab */}
                {activeTab === "basic" && (
                  <>
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Basic Information
                    </h2>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="firstName"
                        >
                          First Name
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="middleName"
                        >
                          Middle Name
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="middleName"
                          name="middleName"
                          type="text"
                          value={formData.middleName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="lastName"
                        >
                          Last Name
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="dateOfBirth"
                        >
                          Date of Birth
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="gender"
                        >
                          Gender
                        </label>
                        <select
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option>Female</option>
                          <option>Male</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="bloodType"
                        >
                          Blood Type
                        </label>
                        <select
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="bloodType"
                          name="bloodType"
                          value={formData.bloodType}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option>A+</option>
                          <option>A-</option>
                          <option>B+</option>
                          <option>B-</option>
                          <option>O+</option>
                          <option>O-</option>
                          <option>AB+</option>
                          <option>AB-</option>
                        </select>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="maritalStatus"
                        >
                          Marital Status
                        </label>
                        <select
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="maritalStatus"
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option>Single</option>
                          <option>Married</option>
                          <option>Divorced</option>
                          <option>Widowed</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Contact Details Tab */}
                {activeTab === "contact" && (
                  <>
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Contact Details
                    </h2>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="email"
                        >
                          Email Address
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="phone"
                        >
                          Primary Phone
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="alternatePhone"
                        >
                          Alternate Phone
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="alternatePhone"
                          name="alternatePhone"
                          type="tel"
                          value={formData.alternatePhone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="address"
                        >
                          Street Address
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="address"
                          name="address"
                          type="text"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="city"
                        >
                          City
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="state"
                        >
                          State/Province
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="state"
                          name="state"
                          type="text"
                          value={formData.state}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-4">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="zipCode"
                        >
                          ZIP/Postal Code
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="zipCode"
                          name="zipCode"
                          type="text"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="country"
                        >
                          Country
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="country"
                          name="country"
                          type="text"
                          value={formData.country}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Insurance Tab */}
                {activeTab === "insurance" && (
                  <>
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Insurance Information
                    </h2>
                    <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="insuranceProvider"
                        >
                          Insurance Provider
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="insuranceProvider"
                          name="insuranceProvider"
                          type="text"
                          value={formData.insuranceProvider}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="insuranceType"
                        >
                          Insurance Type
                        </label>
                        <select
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="insuranceType"
                          name="insuranceType"
                          value={formData.insuranceType}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        >
                          <option>Primary</option>
                          <option>Secondary</option>
                          <option>Tertiary</option>
                        </select>
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="insurancePolicyNumber"
                        >
                          Policy Number
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="insurancePolicyNumber"
                          name="insurancePolicyNumber"
                          type="text"
                          value={formData.insurancePolicyNumber}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="insuranceGroupNumber"
                        >
                          Group Number
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="insuranceGroupNumber"
                          name="insuranceGroupNumber"
                          type="text"
                          value={formData.insuranceGroupNumber}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="insuranceEffectiveDate"
                        >
                          Effective Date
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="insuranceEffectiveDate"
                          name="insuranceEffectiveDate"
                          type="date"
                          value={formData.insuranceEffectiveDate}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <label
                          className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                          htmlFor="insuranceExpiryDate"
                        >
                          Expiry Date
                        </label>
                        <input
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                          id="insuranceExpiryDate"
                          name="insuranceExpiryDate"
                          type="date"
                          value={formData.insuranceExpiryDate}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Emergency Contacts Tab */}
                {activeTab === "emergency" && (
                  <>
                    <h2 className="text-[#111816] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-4">
                      Emergency Contacts
                    </h2>

                    {/* Emergency Contact 1 */}
                    <div className="mb-8">
                      <h3 className="text-[#111816] dark:text-white text-lg font-semibold mb-4">
                        Primary Emergency Contact
                      </h3>
                      <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact1Name"
                          >
                            Full Name
                          </label>
                          <input
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact1Name"
                            name="emergencyContact1Name"
                            type="text"
                            value={formData.emergencyContact1Name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact1Relationship"
                          >
                            Relationship
                          </label>
                          <select
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact1Relationship"
                            name="emergencyContact1Relationship"
                            value={formData.emergencyContact1Relationship}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          >
                            <option>Spouse</option>
                            <option>Parent</option>
                            <option>Child</option>
                            <option>Sibling</option>
                            <option>Friend</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact1Phone"
                          >
                            Phone Number
                          </label>
                          <input
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact1Phone"
                            name="emergencyContact1Phone"
                            type="tel"
                            value={formData.emergencyContact1Phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="col-span-12">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact1Address"
                          >
                            Address
                          </label>
                          <input
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact1Address"
                            name="emergencyContact1Address"
                            type="text"
                            value={formData.emergencyContact1Address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact 2 */}
                    <div>
                      <h3 className="text-[#111816] dark:text-white text-lg font-semibold mb-4">
                        Secondary Emergency Contact
                      </h3>
                      <div className="grid grid-cols-12 gap-x-6 gap-y-5">
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact2Name"
                          >
                            Full Name
                          </label>
                          <input
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact2Name"
                            name="emergencyContact2Name"
                            type="text"
                            value={formData.emergencyContact2Name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact2Relationship"
                          >
                            Relationship
                          </label>
                          <select
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact2Relationship"
                            name="emergencyContact2Relationship"
                            value={formData.emergencyContact2Relationship}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          >
                            <option>Spouse</option>
                            <option>Parent</option>
                            <option>Child</option>
                            <option>Sibling</option>
                            <option>Friend</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact2Phone"
                          >
                            Phone Number
                          </label>
                          <input
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact2Phone"
                            name="emergencyContact2Phone"
                            type="tel"
                            value={formData.emergencyContact2Phone}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="col-span-12">
                          <label
                            className="block text-sm font-medium text-[#61897c] dark:text-[#a0b8b1] mb-1"
                            htmlFor="emergencyContact2Address"
                          >
                            Address
                          </label>
                          <input
                            className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a4038] bg-background-light dark:bg-background-dark p-2 text-[#111816] dark:text-white focus:ring-primary focus:border-primary"
                            id="emergencyContact2Address"
                            name="emergencyContact2Address"
                            type="text"
                            value={formData.emergencyContact2Address}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
