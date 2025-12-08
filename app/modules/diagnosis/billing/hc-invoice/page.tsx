"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

interface HealthCheckupItem {
  id: string;
  slNo: number;
  testCode: string;
  testInformation: string;
  charge: number;
}

export default function HCInvoicePage() {
  const [patientType, setPatientType] = useState<"Indoor" | "Outdoor">(
    "Indoor"
  );
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

  const [healthCheckupList, setHealthCheckupList] = useState<
    HealthCheckupItem[]
  >([]);
  const [showLessAmount, setShowLessAmount] = useState(false);

  const sampleHealthCheckups = [
    { code: "HC001", name: "Complete Health Checkup", charge: 5000 },
    { code: "HC002", name: "Executive Health Checkup", charge: 8000 },
    { code: "HC003", name: "Premium Health Checkup", charge: 12000 },
    { code: "HC004", name: "Basic Health Checkup", charge: 3000 },
    { code: "HC005", name: "Comprehensive Health Checkup", charge: 15000 },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
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
      testInformation:
        checkup?.name || formData.diagnosisTestInfo || formData.healthCheckup,
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
    const newTotal = [...healthCheckupList, newItem].reduce(
      (sum, item) => sum + item.charge,
      0
    );
    const lessAmount = parseFloat(formData.lessAmount) || 0;
    const netPayable = newTotal - lessAmount;
    setFormData((prev) => ({
      ...prev,
      totalTaka: newTotal.toString(),
      netPayable: netPayable.toString(),
      dueAmount: (
        netPayable - (parseFloat(prev.amountReceived) || 0)
      ).toString(),
    }));
  };

  const handleRemoveHealthCheckup = (id: string) => {
    const updatedList = healthCheckupList.filter((item) => item.id !== id);
    const renumberedList = updatedList.map((item, index) => ({
      ...item,
      slNo: index + 1,
    }));
    setHealthCheckupList(renumberedList);

    // Recalculate total
    const newTotal = renumberedList.reduce((sum, item) => sum + item.charge, 0);
    const lessAmount = parseFloat(formData.lessAmount) || 0;
    const netPayable = newTotal - lessAmount;
    setFormData((prev) => ({
      ...prev,
      totalTaka: newTotal.toString(),
      netPayable: netPayable.toString(),
      dueAmount: (
        netPayable - (parseFloat(prev.amountReceived) || 0)
      ).toString(),
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
    console.log("HC Invoice Data:", {
      formData,
      healthCheckupList,
      patientType,
    });
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
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-[1600px] mx-auto grid grid-cols-12 gap-6">
            {/* Left Column - 8 columns */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
              {/* Information Section */}
              <section className="bg-white dark:bg-[#182c25] rounded-xl shadow-sm border border-[#dbe6e2] dark:border-[#2a3f38] p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold text-[#111816] dark:text-white border-l-4 border-primary pl-3">
                    Information
                  </h2>
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-1 border border-[#dbe6e2] dark:border-[#2a3f38]">
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="patient_type"
                        checked={patientType === "Indoor"}
                        onChange={() => setPatientType("Indoor")}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm ${
                          patientType === "Indoor"
                            ? "bg-primary text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          apartment
                        </span>
                        Indoor
                      </span>
                    </label>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        name="patient_type"
                        checked={patientType === "Outdoor"}
                        onChange={() => setPatientType("Outdoor")}
                        className="peer sr-only"
                      />
                      <span
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all shadow-sm ${
                          patientType === "Outdoor"
                            ? "bg-primary text-white"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          deck
                        </span>
                        Outdoor
                      </span>
                    </label>
                  </div>
                </div>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter Patient Name"
                        required
                        className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white transition-shadow"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Age
                      </label>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                        className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Corp. Client
                      </label>
                      <div className="col-span-2 flex gap-2">
                        <select
                          name="corporateClient"
                          value={formData.corporateClient}
                          onChange={handleInputChange}
                          className="w-1/3 rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                        <input
                          type="text"
                          name="corporateClientSearch"
                          value={formData.corporateClientSearch}
                          onChange={handleInputChange}
                          placeholder="Search By ID or Company Name"
                          className="w-2/3 rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Referenced
                      </label>
                      <div className="col-span-2 flex gap-2">
                        <select
                          name="referenced"
                          value={formData.referenced}
                          onChange={handleInputChange}
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                        >
                          <option value="">Select Referrer</option>
                        </select>
                        <button
                          type="button"
                          className="p-2 text-primary hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-md transition-colors"
                        >
                          <span className="material-symbols-outlined text-lg">
                            edit_note
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Consultant
                      </label>
                      <select
                        name="consultant"
                        value={formData.consultant}
                        onChange={handleInputChange}
                        className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      >
                        <option value="">Select Consultant</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Patient Id
                      </label>
                      <div className="col-span-2 relative">
                        <input
                          type="text"
                          name="patientId"
                          value={formData.patientId}
                          onChange={handleInputChange}
                          placeholder="Search By Patient Id"
                          className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white pr-8"
                        />
                        <span className="material-symbols-outlined absolute right-2 top-2 text-gray-400 text-sm">
                          search
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Phone
                      </label>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    {patientType === "Indoor" && (
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Admission Date
                        </label>
                        <input
                          type="date"
                          name="admissionDate"
                          value={formData.admissionDate}
                          onChange={handleInputChange}
                          className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                        />
                      </div>
                    )}
                    {formData.corporateClient === "Yes" && (
                      <div className="grid grid-cols-3 items-center gap-4">
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          Company
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Corporate Client Name"
                          disabled
                          className="col-span-2 w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-sm text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-3 items-center gap-4">
                      <div className="col-span-3">
                        <input
                          type="text"
                          name="referencedName"
                          value={formData.referencedName}
                          onChange={handleInputChange}
                          placeholder="Referenced Name"
                          disabled
                          className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-sm text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 items-center gap-4">
                      <div className="col-span-3">
                        <input
                          type="text"
                          name="consultantDoctorName"
                          value={formData.consultantDoctorName}
                          onChange={handleInputChange}
                          placeholder="Consultant Doctor Name"
                          disabled
                          className="w-full rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-sm text-gray-500 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </section>

              {/* Add Health Checkup Information Section */}
              <section className="bg-white dark:bg-[#182c25] rounded-xl shadow-sm border border-[#dbe6e2] dark:border-[#2a3f38] flex-grow flex flex-col overflow-hidden">
                <div className="p-6 border-b border-[#dbe6e2] dark:border-[#2a3f38] bg-gray-50/50 dark:bg-gray-800/50">
                  <h2 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                    Add Health Checkup Information
                  </h2>
                  <div className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-12 md:col-span-3">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                        Test
                      </label>
                      <select
                        name="healthCheckup"
                        value={formData.healthCheckup}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      >
                        <option value="">Test code or name</option>
                        {sampleHealthCheckups.map((hc) => (
                          <option key={hc.code} value={hc.code}>
                            {hc.code} - {hc.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-12 md:col-span-5">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                        Info
                      </label>
                      <input
                        type="text"
                        name="diagnosisTestInfo"
                        value={formData.diagnosisTestInfo}
                        onChange={handleInputChange}
                        placeholder="Diagnosis Test Information"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                      <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">
                        Charge
                      </label>
                      <input
                        type="number"
                        name="charge"
                        value={formData.charge}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white text-right"
                      />
                    </div>
                    <div className="col-span-12 md:col-span-2">
                      <button
                        type="button"
                        onClick={handleAddHealthCheckup}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                      >
                        <span className="material-symbols-outlined text-sm">
                          add
                        </span>
                        Add
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-0 flex-grow flex flex-col">
                  <div className="px-6 py-3 border-b border-[#dbe6e2] dark:border-[#2a3f38]">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200">
                      Investigation Information
                    </h3>
                  </div>
                  <div className="overflow-x-auto min-h-[200px]">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800/50 border-b border-[#dbe6e2] dark:border-[#2a3f38] text-xs uppercase text-gray-500 dark:text-gray-400">
                          <th className="px-6 py-3 font-semibold">SL No.</th>
                          <th className="px-6 py-3 font-semibold">Test Code</th>
                          <th className="px-6 py-3 font-semibold w-1/2">
                            Test Information
                          </th>
                          <th className="px-6 py-3 font-semibold text-right">
                            Charge
                          </th>
                          <th className="px-6 py-3 font-semibold text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#dbe6e2] dark:divide-[#2a3f38] text-sm">
                        {healthCheckupList.length === 0 ? (
                          <tr>
                            <td
                              className="py-12 text-center text-gray-400 dark:text-gray-600"
                              colSpan={5}
                            >
                              <div className="flex flex-col items-center justify-center">
                                <span className="material-symbols-outlined text-4xl mb-2 opacity-30">
                                  science
                                </span>
                                <p>No investigations added yet.</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          healthCheckupList.map((item) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            >
                              <td className="px-6 py-3 text-[#111816] dark:text-white">
                                {item.slNo}
                              </td>
                              <td className="px-6 py-3 text-[#111816] dark:text-white">
                                {item.testCode}
                              </td>
                              <td className="px-6 py-3 text-[#111816] dark:text-white">
                                {item.testInformation}
                              </td>
                              <td className="px-6 py-3 text-right font-semibold text-[#111816] dark:text-white">
                                ৳{item.charge.toLocaleString()}
                              </td>
                              <td className="px-6 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleRemoveHealthCheckup(item.id)
                                  }
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <span className="material-symbols-outlined text-sm">
                                    delete
                                  </span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Column - 4 columns */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
              <section className="bg-white dark:bg-[#182c25] rounded-xl shadow-sm border border-[#dbe6e2] dark:border-[#2a3f38] p-6 h-full flex flex-col">
                <h2 className="text-lg font-semibold text-[#111816] dark:text-white border-l-4 border-green-500 pl-3 mb-6">
                  Payment
                </h2>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Total Taka <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="totalTaka"
                      value={formData.totalTaka || "0.00"}
                      readOnly
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-lg font-bold text-gray-800 dark:text-white text-right pr-4"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
                      BDT
                    </span>
                  </div>
                </div>

                {/* Discount Separator */}
                <div className="relative py-4 flex items-center justify-center mb-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-[#182c25] text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full py-1 shadow-sm">
                      Discount
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Less Amount
                    </label>
                    <div className="col-span-2 flex gap-2">
                      <input
                        type="number"
                        value={formData.lessAmount}
                        onChange={(e) => handleLessAmountChange(e.target.value)}
                        className="w-2/3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-right focus:border-primary focus:ring-primary dark:text-white"
                      />
                      <select
                        name="lessAmountType"
                        value={formData.lessAmountType}
                        onChange={handleInputChange}
                        className="w-1/3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      >
                        <option value="TK">TK</option>
                        <option value="%">%</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      Total Less
                    </label>
                    <input
                      type="number"
                      name="totalLessAmount"
                      value={formData.totalLessAmount}
                      readOnly
                      disabled
                      className="col-span-2 rounded-md border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-sm text-right text-gray-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm text-gray-600 dark:text-gray-400">
                      From
                    </label>
                    <select
                      name="discountFrom"
                      value={formData.discountFrom}
                      onChange={handleInputChange}
                      className="col-span-2 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                    >
                      <option value="">Select Authorizer</option>
                      <option value="Hospital">Hospital</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                </div>

                {/* Collection Separator */}
                <div className="relative py-4 flex items-center justify-center mb-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-[#182c25] text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full py-1 shadow-sm">
                      Collection
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Net Payable <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="netPayable"
                      value={formData.netPayable || "0.00"}
                      readOnly
                      disabled
                      className="col-span-2 rounded-md border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20 text-sm text-right font-semibold text-gray-800 dark:text-blue-100"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Received <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="amountReceived"
                      value={formData.amountReceived}
                      onChange={(e) =>
                        handleAmountReceivedChange(e.target.value)
                      }
                      className="col-span-2 rounded-md border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10 text-sm text-right font-bold text-green-700 dark:text-green-400 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Due Amount <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="dueAmount"
                      value={formData.dueAmount || "0.00"}
                      readOnly
                      disabled
                      className="col-span-2 rounded-md border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 text-sm text-right font-semibold text-red-600 dark:text-red-400"
                    />
                  </div>
                </div>

                {/* Delivery Separator */}
                <div className="relative py-4 flex items-center justify-center mb-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center"
                  >
                    <div className="w-full border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-white dark:bg-[#182c25] text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full py-1 shadow-sm">
                      Delivery
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex gap-2">
                    <div className="w-1/2">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        name="deliveryDate"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Time
                      </label>
                      <input
                        type="time"
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleInputChange}
                        className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <input
                      type="text"
                      name="referencedBy"
                      value={formData.referencedBy}
                      onChange={handleInputChange}
                      placeholder="Referenced By"
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white mb-2"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="referencedCode"
                        value={formData.referencedCode}
                        onChange={handleInputChange}
                        placeholder="Ref. Code"
                        className="w-1/3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                      <input
                        type="text"
                        name="referencedNameField"
                        value={formData.referencedNameField}
                        onChange={handleInputChange}
                        placeholder="Referenced Name"
                        className="w-2/3 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Remarks
                    </label>
                    <textarea
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:border-primary focus:ring-primary dark:text-white resize-none"
                    />
                  </div>
                </div>

                <div className="mt-auto space-y-4 pt-4 border-t border-dashed border-gray-300 dark:border-gray-600">
                  <div className="flex items-center">
                    <label className="inline-flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          name="urgent"
                          checked={formData.urgent}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                      </div>
                      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Mark as Urgent
                      </span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={handleRePrint}
                      className="flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        print
                      </span>
                      Re Print
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveAndPrint}
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg shadow-md shadow-green-500/20 transition-all"
                    >
                      <span className="material-symbols-outlined text-sm">
                        save
                      </span>
                      Save & Print
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
