"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

// Sample invoice data
const invoiceData = {
  invoiceNumber: "INV-00123",
  status: "Paid",
  patientName: "John Appleseed",
  patientId: "PID-45678",
  issueDate: "15 Oct 2023",
  dueDate: "30 Oct 2023",
  address: "123 Health St, Wellness City, 12345",
  items: [
    {
      description: "Emergency Room Visit",
      dateOfService: "01 Oct 2023",
      quantity: 1,
      unitPrice: 500.0,
      total: 500.0,
    },
    {
      description: "X-Ray, Chest",
      dateOfService: "01 Oct 2023",
      quantity: 1,
      unitPrice: 250.0,
      total: 250.0,
    },
    {
      description: "Ibuprofen 600mg",
      dateOfService: "01 Oct 2023",
      quantity: 10,
      unitPrice: 1.5,
      total: 15.0,
    },
    {
      description: "Consultation with Dr. Emily Carter",
      dateOfService: "02 Oct 2023",
      quantity: 1,
      unitPrice: 150.0,
      total: 150.0,
    },
  ],
  subtotal: 915.0,
  taxes: 73.2,
  grandTotal: 988.2,
};

export default function ViewInvoicePage() {
  const params = useParams();
  const invoiceId = params.id as string;
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    window.print();
    setTimeout(() => setIsPrinting(false), 1000);
  };

  const handleDownloadPDF = () => {
    // In real app, this would generate and download PDF
    alert("PDF download functionality would be implemented here");
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-4 sm:p-6 lg:p-8 xl:p-20 overflow-y-auto">
          <div className="flex flex-col w-full max-w-6xl mx-auto flex-1">
            {/* Header Actions */}
            <div
              className={`flex flex-col sm:flex-row flex-wrap justify-between items-start sm:items-center gap-4 p-4 ${
                isPrinting ? "hidden" : ""
              }`}
            >
              <div>
                <p className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                  Invoice {invoiceData.invoiceNumber}
                </p>
                <Link
                  href="/admin/billing"
                  className="text-sm text-primary hover:underline mt-1 inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined !text-base">arrow_back</span>
                  Back to Billing Dashboard
                </Link>
              </div>
              <div className="inline-flex items-center justify-center rounded-lg bg-green-500/20 px-3 py-1.5 text-sm font-semibold text-green-700 dark:text-green-400">
                {invoiceData.status}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`flex justify-between gap-2 px-4 py-3 border-y border-solid border-[#f0f4f3] dark:border-gray-800 ${
                isPrinting ? "hidden" : ""
              }`}
            >
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary/20 dark:bg-primary/30 text-primary dark:text-primary gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
                >
                  <span className="material-symbols-outlined !text-xl">print</span>
                  <span className="truncate">Print Invoice</span>
                </button>
              </div>
              <button
                onClick={handleDownloadPDF}
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-primary text-[#111816] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-4"
              >
                <span
                  className="material-symbols-outlined !text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  download
                </span>
                <span className="truncate">Download as PDF</span>
              </button>
            </div>

            {/* Invoice Container */}
            <div
              className="bg-white dark:bg-background-dark shadow-lg rounded-xl mt-6 p-6 sm:p-8 lg:p-12"
              id="invoice-container"
            >
              {/* Header Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-primary text-2xl">
                      <span className="material-symbols-outlined !text-4xl">local_hospital</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#111816] dark:text-white">
                      Wellness General Hospital
                    </h3>
                  </div>
                  <p className="text-sm text-[#61897c] dark:text-gray-400">
                    123 Health St, Wellness City, 12345
                  </p>
                  <p className="text-sm text-[#61897c] dark:text-gray-400">
                    contact@wellnessgeneral.com
                  </p>
                  <p className="text-sm text-[#61897c] dark:text-gray-400">(123) 456-7890</p>
                </div>
                <div className="text-left md:text-right">
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#111816] dark:text-white uppercase tracking-wider">
                    Invoice
                  </h1>
                  <p className="text-sm text-[#61897c] dark:text-gray-400 mt-2">
                    Invoice #: {invoiceData.invoiceNumber}
                  </p>
                </div>
              </div>

              {/* Patient Details */}
              <div className="p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col gap-1 py-4 pr-2">
                  <p className="text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                    Patient Name
                  </p>
                  <p className="text-[#111816] dark:text-white text-sm font-medium leading-normal">
                    {invoiceData.patientName}
                  </p>
                </div>
                <div className="flex flex-col gap-1 py-4 pl-0 md:pl-2">
                  <p className="text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                    Date of Issue
                  </p>
                  <p className="text-[#111816] dark:text-white text-sm font-medium leading-normal">
                    {invoiceData.issueDate}
                  </p>
                </div>
                <div className="flex flex-col gap-1 py-4 pl-0 lg:pl-2">
                  <p className="text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                    Due Date
                  </p>
                  <p className="text-[#111816] dark:text-white text-sm font-medium leading-normal">
                    {invoiceData.dueDate}
                  </p>
                </div>
                <div className="flex flex-col gap-1 py-4 pr-2">
                  <p className="text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                    Patient ID
                  </p>
                  <p className="text-[#111816] dark:text-white text-sm font-medium leading-normal">
                    {invoiceData.patientId}
                  </p>
                </div>
                <div className="flex flex-col gap-1 py-4 pl-0 md:pl-2 col-span-1 lg:col-span-2">
                  <p className="text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                    Address
                  </p>
                  <p className="text-[#111816] dark:text-white text-sm font-medium leading-normal">
                    {invoiceData.address}
                  </p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mt-8 @container">
                <div className="flex overflow-hidden rounded-lg border border-[#dbe6e2] dark:border-gray-700 bg-white dark:bg-background-dark">
                  <table className="flex-1 w-full">
                    <thead>
                      <tr className="bg-background-light dark:bg-gray-800">
                        <th className="px-4 py-3 text-left text-[#111816] dark:text-gray-300 w-2/5 text-sm font-medium leading-normal">
                          Item Description
                        </th>
                        <th className="px-4 py-3 text-left text-[#111816] dark:text-gray-300 w-1/5 text-sm font-medium leading-normal">
                          Date of Service
                        </th>
                        <th className="px-4 py-3 text-right text-[#111816] dark:text-gray-300 w-1/5 text-sm font-medium leading-normal">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-right text-[#111816] dark:text-gray-300 w-1/5 text-sm font-medium leading-normal">
                          Unit Price
                        </th>
                        <th className="px-4 py-3 text-right text-[#111816] dark:text-gray-300 w-1/5 text-sm font-medium leading-normal">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoiceData.items.map((item, index) => (
                        <tr
                          key={index}
                          className="border-t border-t-[#dbe6e2] dark:border-t-gray-700"
                        >
                          <td className="h-[72px] px-4 py-2 text-[#111816] dark:text-white text-sm font-normal leading-normal">
                            {item.description}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                            {item.dateOfService}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-right text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                            {item.quantity}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-right text-[#61897c] dark:text-gray-400 text-sm font-normal leading-normal">
                            ${item.unitPrice.toFixed(2)}
                          </td>
                          <td className="h-[72px] px-4 py-2 text-right text-[#111816] dark:text-white text-sm font-medium leading-normal">
                            ${item.total.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Summary */}
              <div className="mt-8 flex justify-end">
                <div className="w-full max-w-sm">
                  <div className="flex justify-between py-2 border-b border-dashed border-[#dbe6e2] dark:border-gray-700">
                    <span className="text-[#61897c] dark:text-gray-400">Subtotal</span>
                    <span className="text-[#111816] dark:text-white font-medium">
                      ${invoiceData.subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-dashed border-[#dbe6e2] dark:border-gray-700">
                    <span className="text-[#61897c] dark:text-gray-400">Taxes (8%)</span>
                    <span className="text-[#111816] dark:text-white font-medium">
                      ${invoiceData.taxes.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between py-4 mt-2 bg-primary/10 dark:bg-primary/20 rounded-lg px-4">
                    <span className="text-[#111816] dark:text-white text-lg font-bold">
                      Grand Total
                    </span>
                    <span className="text-primary dark:text-primary text-lg font-bold">
                      ${invoiceData.grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 pt-8 border-t border-[#dbe6e2] dark:border-gray-700">
                <p className="text-xs text-[#61897c] dark:text-gray-400 text-center">
                  Thank you for choosing Wellness General Hospital. For any queries, please contact
                  our billing department.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


