"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface HealthCheckupItem {
  id: string;
  slNo: number;
  testCode: string;
  testInformation: string;
  charge: number;
}

export default function HCInvoicePage() {
  const [patientType, setPatientType] = useState<"Indoor" | "Outdoor">("Indoor");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    corporateClient: "No",
    corporateClientSearch: "",
    referenced: "",
    consultant: "",
    patientId: "",
    phoneNumber: "",
    gender: "",
    admissionDate: "",
    companyName: "",
    referencedName: "",
    consultantDoctorName: "",
    healthCheckup: "",
    diagnosisTestInfo: "",
    charge: "",
    totalTaka: "",
    lessAmount: "0",
    lessAmountType: "TK",
    totalLessAmount: "0",
    discountFrom: "",
    netPayable: "",
    amountReceived: "0",
    dueAmount: "",
    deliveryDate: new Date().toISOString().split("T")[0],
    deliveryTime: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
    referencedBy: "",
    referencedCode: "",
    referencedNameField: "",
    remarks: "",
    urgent: false,
  });

  const [healthCheckupList, setHealthCheckupList] = useState<HealthCheckupItem[]>([]);
  const [showLessAmount, setShowLessAmount] = useState(false);

  const sampleHealthCheckups = [
    { code: "HC001", name: "Complete Health Checkup", charge: 5000 },
    { code: "HC002", name: "Executive Health Checkup", charge: 8000 },
    { code: "HC003", name: "Premium Health Checkup", charge: 12000 },
    { code: "HC004", name: "Basic Health Checkup", charge: 3000 },
    { code: "HC005", name: "Comprehensive Health Checkup", charge: 15000 },
  ];

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

  const handleAddHealthCheckup = () => {
    if (!formData.healthCheckup || !formData.charge) {
      alert("Please fill in Health Checkup and Charge");
      return;
    }

    const checkup = sampleHealthCheckups.find(
      (hc) =>
        hc.code.toLowerCase().includes(formData.healthCheckup.toLowerCase()) ||
        hc.name.toLowerCase().includes(formData.healthCheckup.toLowerCase())
    );

    const newItem: HealthCheckupItem = {
      id: Date.now().toString(),
      slNo: healthCheckupList.length + 1,
      testCode: checkup?.code || formData.healthCheckup,
      testInformation: checkup?.name || formData.diagnosisTestInfo || formData.healthCheckup,
      charge: parseFloat(formData.charge) || 0,
    };

    setHealthCheckupList([...healthCheckupList, newItem]);
    setFormData((prev) => ({
      ...prev,
      healthCheckup: "",
      diagnosisTestInfo: "",
      charge: "",
    }));

    // Calculate total
    const newTotal = [...healthCheckupList, newItem].reduce((sum, item) => sum + item.charge, 0);
    const lessAmount = parseFloat(formData.lessAmount) || 0;
    const netPayable = newTotal - lessAmount;
    setFormData((prev) => ({
      ...prev,
      totalTaka: newTotal.toString(),
      netPayable: netPayable.toString(),
      dueAmount: (netPayable - (parseFloat(prev.amountReceived) || 0)).toString(),
    }));
  };

  const handleRemoveHealthCheckup = (id: string) => {
    const updatedList = healthCheckupList.filter((item) => item.id !== id);
    const renumberedList = updatedList.map((item, index) => ({ ...item, slNo: index + 1 }));
    setHealthCheckupList(renumberedList);

    // Recalculate total
    const newTotal = renumberedList.reduce((sum, item) => sum + item.charge, 0);
    const lessAmount = parseFloat(formData.lessAmount) || 0;
    const netPayable = newTotal - lessAmount;
    setFormData((prev) => ({
      ...prev,
      totalTaka: newTotal.toString(),
      netPayable: netPayable.toString(),
      dueAmount: (netPayable - (parseFloat(prev.amountReceived) || 0)).toString(),
    }));
  };

  const handleLessAmountChange = (value: string) => {
    setFormData((prev) => {
      const lessAmount = parseFloat(value) || 0;
      const total = parseFloat(prev.totalTaka) || 0;
      const netPayable = total - lessAmount;
      const amountReceived = parseFloat(prev.amountReceived) || 0;
      return {
        ...prev,
        lessAmount: value,
        totalLessAmount: lessAmount.toString(),
        netPayable: netPayable.toString(),
        dueAmount: (netPayable - amountReceived).toString(),
      };
    });
  };

  const handleAmountReceivedChange = (value: string) => {
    setFormData((prev) => {
      const amountReceived = parseFloat(value) || 0;
      const netPayable = parseFloat(prev.netPayable) || 0;
      return {
        ...prev,
        amountReceived: value,
        dueAmount: (netPayable - amountReceived).toString(),
      };
    });
  };

  const handleSaveAndPrint = () => {
    console.log("HC Invoice Data:", { formData, healthCheckupList, patientType });
    alert("Health Checkup Invoice saved and printed successfully!");
  };

  const handleRePrint = () => {
    alert("Re-printing Health Checkup Invoice...");
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="w-full max-w-[1920px] mx-auto">
            {/* Breadcrumbs and Heading - Compact */}
            <div className="flex flex-wrap justify-between items-center mb-2">
              <div className="flex items-center gap-3">
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link
                    href="/modules/diagnosis"
                    className="font-medium text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Diagnosis
                  </Link>
                  <span className="font-medium text-gray-500 dark:text-gray-400">/</span>
                  <Link
                    href="/modules/diagnosis/billing"
                    className="font-medium text-gray-500 hover:text-primary dark:text-gray-400"
                  >
                    Billing Information
                  </Link>
                  <span className="font-medium text-gray-500 dark:text-gray-400">/</span>
                  <span className="font-medium text-[#111816] dark:text-white">
                    Diagnosis Invoice
                  </span>
                </div>
                <h1 className="text-xl font-bold text-[#111816] dark:text-white">
                  HEALTH CHECKUP INVOICE
                </h1>
              </div>
            </div>

            <form className="space-y-2">
              {/* Patient Type Toggle */}
              <div className="flex gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setPatientType("Indoor")}
                  className={`px-4 py-1 text-sm rounded-lg font-medium transition-colors ${
                    patientType === "Indoor"
                      ? "bg-primary text-background-dark"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Indoor
                </button>
                <button
                  type="button"
                  onClick={() => setPatientType("Outdoor")}
                  className={`px-4 py-1 text-sm rounded-lg font-medium transition-colors ${
                    patientType === "Outdoor"
                      ? "bg-primary text-background-dark"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Outdoor
                </button>
              </div>

              {/* Patient Information Section */}
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-3">
                <h3 className="text-sm font-semibold text-[#111816] dark:text-white mb-2">
                  Information
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {/* Left Column */}
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Patient Name"
                        required
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Age
                      </label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Corporate Client
                        </label>
                        <select
                          name="corporateClient"
                          value={formData.corporateClient}
                          onChange={handleInputChange}
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          &nbsp;
                        </label>
                        <input
                          type="text"
                          name="corporateClientSearch"
                          value={formData.corporateClientSearch}
                          onChange={handleInputChange}
                          placeholder="Search By ID or Company N"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Referenced
                        </label>
                        <div className="flex gap-1">
                          <input
                            type="text"
                            name="referenced"
                            value={formData.referenced}
                            onChange={handleInputChange}
                            className="flex-1 rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                          <button
                            type="button"
                            className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <span className="material-symbols-outlined text-sm">expand_more</span>
                          </button>
                          <button
                            type="button"
                            className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <span className="material-symbols-outlined text-sm">description</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Consultant
                      </label>
                      <div className="flex gap-1">
                        <input
                          type="text"
                          name="consultant"
                          value={formData.consultant}
                          onChange={handleInputChange}
                          className="flex-1 rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                        <button
                          type="button"
                          className="px-2 py-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          <span className="material-symbols-outlined text-sm">expand_more</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Patient Id
                      </label>
                      <select
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleInputChange}
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Search By Patient Id</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {patientType === "Indoor" && (
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Admission Date
                        </label>
                        <input
                          type="date"
                          name="admissionDate"
                          value={formData.admissionDate}
                          onChange={handleInputChange}
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    )}
                    {formData.corporateClient === "Yes" && (
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Company Name
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Corporate Client Name"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Referenced Name
                      </label>
                      <input
                        type="text"
                        name="referencedName"
                        value={formData.referencedName}
                        onChange={handleInputChange}
                        placeholder="Referenced Name"
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                        Consultant Doctor Name
                      </label>
                      <input
                        type="text"
                        name="consultantDoctorName"
                        value={formData.consultantDoctorName}
                        onChange={handleInputChange}
                        placeholder="Consultant Doctor Name"
                        className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Add Health Checkup Information Section */}
              <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                  Add Health Checkup Information
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                      Health Checkup
                    </label>
                    <select
                      name="healthCheckup"
                      value={formData.healthCheckup}
                      onChange={handleInputChange}
                      className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                    >
                      <option value="">Test code or name</option>
                      {sampleHealthCheckups.map((hc) => (
                        <option key={hc.code} value={hc.code}>
                          {hc.code} - {hc.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                      &nbsp;
                    </label>
                    <button
                      type="button"
                      className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Diagnosis Test Information
                    </button>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                      Charge
                    </label>
                    <input
                      type="number"
                      name="charge"
                      value={formData.charge}
                      onChange={handleInputChange}
                      placeholder="Charge"
                      className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-sm text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                      &nbsp;
                    </label>
                    <button
                      type="button"
                      onClick={handleAddHealthCheckup}
                      className="w-full px-3 py-1 bg-primary text-background-dark text-xs font-medium rounded hover:opacity-90 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                {/* Investigation Information Table */}
                <div className="lg:col-span-2">
                  <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm overflow-hidden">
                    <h3 className="text-xs font-semibold text-[#111816] dark:text-white p-2 border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                      Investigation Information
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead className="bg-[#f0f4f3] dark:bg-[#2a3f38]">
                          <tr>
                            <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                              SL No.
                            </th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                              Test Code
                            </th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                              Test Information
                            </th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                              Charge
                            </th>
                            <th className="px-2 py-1 text-left text-xs font-medium text-[#111816] dark:text-white uppercase">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38]">
                          {healthCheckupList.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="px-2 py-4 text-center text-[#61897c] dark:text-gray-400 text-xs">
                                No health checkup added yet
                              </td>
                            </tr>
                          ) : (
                            healthCheckupList.map((item) => (
                              <tr key={item.id} className="hover:bg-[#f0f4f3] dark:hover:bg-[#2a3f38]">
                                <td className="px-2 py-1 text-xs text-[#111816] dark:text-white">
                                  {item.slNo}
                                </td>
                                <td className="px-2 py-1 text-xs text-[#111816] dark:text-white">
                                  {item.testCode}
                                </td>
                                <td className="px-2 py-1 text-xs text-[#111816] dark:text-white">
                                  {item.testInformation}
                                </td>
                                <td className="px-2 py-1 text-xs font-semibold text-[#111816] dark:text-white">
                                  ৳{item.charge.toLocaleString()}
                                </td>
                                <td className="px-2 py-1">
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveHealthCheckup(item.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <span className="material-symbols-outlined text-xs">delete</span>
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-2">
                  <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                    <h3 className="text-xs font-semibold text-[#111816] dark:text-white mb-2">
                      Payment Details
                    </h3>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Total Taka <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="totalTaka"
                          value={formData.totalTaka}
                          onChange={handleInputChange}
                          placeholder="Total Taka"
                          readOnly
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-gray-50 dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white"
                        />
                      </div>

                      <div className="border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-1">
                        <div className="flex items-center justify-between mb-1">
                          <button
                            type="button"
                            className="text-xs font-medium text-[#111816] dark:text-white px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            Discount
                          </button>
                          <label className="flex items-center gap-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showLessAmount}
                              onChange={(e) => setShowLessAmount(e.target.checked)}
                              className="rounded border-[#dbe6e2] dark:border-[#2a3f38] w-3 h-3"
                            />
                            <span className="text-xs text-[#61897c] dark:text-gray-400">Less Amount</span>
                          </label>
                        </div>
                        {showLessAmount && (
                          <div className="space-y-1">
                            <div className="flex gap-1">
                              <input
                                type="number"
                                value={formData.lessAmount}
                                onChange={(e) => handleLessAmountChange(e.target.value)}
                                className="flex-1 rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                              />
                              <select
                                name="lessAmountType"
                                value={formData.lessAmountType}
                                onChange={handleInputChange}
                                className="rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                              >
                                <option value="TK">TK</option>
                                <option value="%">%</option>
                              </select>
                            </div>
                            <div>
                              <input
                                type="number"
                                name="totalLessAmount"
                                value={formData.totalLessAmount}
                                readOnly
                                className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-gray-50 dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white"
                              />
                            </div>
                            <div>
                              <select
                                name="discountFrom"
                                value={formData.discountFrom}
                                onChange={handleInputChange}
                                className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                              >
                                <option value="">From</option>
                                <option value="Hospital">Hospital</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Corporate">Corporate</option>
                              </select>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-[#dbe6e2] dark:border-[#2a3f38] pt-1">
                        <button
                          type="button"
                          className="text-xs font-medium text-[#111816] dark:text-white px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Collection
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Net Payable <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="netPayable"
                          value={formData.netPayable}
                          readOnly
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-gray-50 dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Amount Received <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="amountReceived"
                          value={formData.amountReceived}
                          onChange={(e) => handleAmountReceivedChange(e.target.value)}
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Due Amount <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          name="dueAmount"
                          value={formData.dueAmount}
                          readOnly
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-gray-50 dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Delivery Details */}
                  <div className="bg-white dark:bg-[#182c25] rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-2">
                    <div className="border-b border-[#dbe6e2] dark:border-[#2a3f38] pb-1 mb-2">
                      <button
                        type="button"
                        className="text-xs font-medium text-[#111816] dark:text-white px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                      >
                        Delivery
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-1">
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Delivery Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="deliveryDate"
                              value={formData.deliveryDate}
                              onChange={handleInputChange}
                              className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                            <span className="material-symbols-outlined absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                              calendar_today
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Time
                          </label>
                          <div className="relative">
                            <input
                              type="time"
                              name="deliveryTime"
                              value={formData.deliveryTime}
                              onChange={handleInputChange}
                              className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                            <span className="material-symbols-outlined absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                              schedule
                            </span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Referenced By
                        </label>
                        <input
                          type="text"
                          name="referencedBy"
                          value={formData.referencedBy}
                          onChange={handleInputChange}
                          placeholder="Referenced By"
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Referenced Code
                          </label>
                          <input
                            type="text"
                            name="referencedCode"
                            value={formData.referencedCode}
                            onChange={handleInputChange}
                            placeholder="Code"
                            className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                            Referenced Name
                          </label>
                          <input
                            type="text"
                            name="referencedNameField"
                            value={formData.referencedNameField}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[#111816] dark:text-white mb-0.5">
                          Remarks
                        </label>
                        <textarea
                          name="remarks"
                          value={formData.remarks}
                          onChange={handleInputChange}
                          rows={2}
                          className="w-full rounded border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-2 py-1 text-xs text-[#111816] dark:text-white focus:ring-1 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <input
                          type="checkbox"
                          name="urgent"
                          checked={formData.urgent}
                          onChange={handleInputChange}
                          className="rounded border-[#dbe6e2] dark:border-[#2a3f38] w-3 h-3"
                        />
                        <label className="text-xs font-medium text-[#111816] dark:text-white">
                          Urgent
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleRePrint}
                  className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">error</span>
                  <span>Re Print</span>
                </button>
                <button
                  type="button"
                  onClick={handleSaveAndPrint}
                  className="flex items-center gap-1 px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded hover:bg-green-700 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">check</span>
                  <span>Save & Print</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

