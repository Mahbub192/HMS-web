"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface InvoiceItem {
  id: string;
  description: string;
  serviceCode: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export default function CreateInvoicePage() {
  const [patientSearch, setPatientSearch] = useState("John Appleseed");
  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "Consultation Fee",
      serviceCode: "C001",
      quantity: 1,
      unitPrice: 150.0,
      total: 150.0,
    },
    {
      id: "2",
      description: "Lab Test - Complete Blood Count",
      serviceCode: "L023",
      quantity: 1,
      unitPrice: 75.5,
      total: 75.5,
    },
    {
      id: "3",
      description: "X-Ray - Chest (2 Views)",
      serviceCode: "X112",
      quantity: 2,
      unitPrice: 120.0,
      total: 240.0,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [taxRate] = useState(5); // VAT 5%

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
  const tax = (subtotal - discount) * (taxRate / 100);
  const grandTotal = subtotal - discount + tax;

  const updateItemQuantity = (id: string, quantity: number) => {
    setInvoiceItems(
      invoiceItems.map((item) => {
        if (item.id === id) {
          const newTotal = item.unitPrice * quantity;
          return { ...item, quantity, total: newTotal };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id));
  };

  const addNewItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "New Service",
      serviceCode: "NEW",
      quantity: 1,
      unitPrice: 0,
      total: 0,
    };
    setInvoiceItems([...invoiceItems, newItem]);
  };

  const handleGenerateInvoice = () => {
    // In real app, this would save to backend and generate invoice
    console.log("Generating invoice...", {
      patient: patientSearch,
      items: invoiceItems,
      total: grandTotal,
    });
    alert("Invoice generated successfully!");
  };

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumbs */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Link
                href="/admin/billing"
                className="text-sm font-medium text-gray-500 hover:text-primary dark:text-gray-400"
              >
                Billing
              </Link>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/</span>
              <span className="text-sm font-medium text-text-dark dark:text-white">
                Create Invoice
              </span>
            </div>

            {/* Page Heading */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
              <div className="flex flex-col gap-1">
                <p className="text-3xl font-bold leading-tight tracking-tight text-text-dark dark:text-white">
                  Create Invoice
                </p>
                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                  Automatically generate invoices based on services rendered.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-secondary-gray px-4 text-sm font-bold text-text-dark hover:bg-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                  <span className="truncate">Save as Draft</span>
                </button>
                <button
                  onClick={handleGenerateInvoice}
                  className="flex h-10 min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary-blue px-4 text-sm font-bold text-white hover:opacity-90"
                >
                  <span className="truncate">Generate & Finalize Invoice</span>
                </button>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-12 gap-8">
              {/* Center Section (Invoice Details) */}
              <div className="col-span-12 lg:col-span-8">
                <div className="space-y-6">
                  {/* Search and Info */}
                  <div className="rounded-xl border border-border-color bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-bold leading-tight tracking-[-0.015em] text-text-dark dark:text-white">
                      Patient & Invoice Details
                    </h3>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      {/* SearchBar */}
                      <label className="flex h-12 w-full flex-col">
                        <div className="flex h-full w-full flex-1 items-stretch rounded-lg">
                          <div className="flex items-center justify-center rounded-l-lg border border-r-0 border-border-color bg-secondary-gray pl-4 text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400">
                            <span className="material-symbols-outlined">search</span>
                          </div>
                          <input
                            type="text"
                            value={patientSearch}
                            onChange={(e) => setPatientSearch(e.target.value)}
                            className="form-input h-full w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg border border-l-0 border-gray-300 dark:border-gray-600 bg-white px-4 text-base font-normal leading-normal text-[#111816] dark:text-white placeholder:text-gray-500 focus:border-primary-blue focus:outline-none focus:ring-1 focus:ring-primary-blue dark:bg-gray-900 dark:placeholder-gray-400"
                            placeholder="Search Patient by Name or ID..."
                          />
                        </div>
                      </label>
                      {/* Invoice Info */}
                      <div className="grid grid-cols-3 gap-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 p-3">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Invoice #</p>
                          <p className="font-semibold text-[#111816] dark:text-white">
                            AUTO-GEN
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Invoice Date</p>
                          <p className="font-semibold text-[#111816] dark:text-white">
                            {new Date().toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Due Date</p>
                          <p className="font-semibold text-[#111816] dark:text-white">
                            {new Date(
                              Date.now() + 15 * 24 * 60 * 60 * 1000
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Editable Invoice Table */}
                  <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#111816] dark:text-white">
                      Services Rendered
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="border-b border-gray-300 dark:border-gray-600 text-xs uppercase text-gray-500 dark:text-gray-400">
                          <tr>
                            <th className="px-4 py-3" scope="col">
                              Service Description
                            </th>
                            <th className="px-4 py-3" scope="col">
                              Service Code
                            </th>
                            <th className="px-4 py-3 text-center" scope="col">
                              Qty
                            </th>
                            <th className="px-4 py-3 text-right" scope="col">
                              Unit Price
                            </th>
                            <th className="px-4 py-3 text-right" scope="col">
                              Total
                            </th>
                            <th className="px-4 py-3 text-center" scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceItems.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b border-gray-300 dark:border-gray-700"
                            >
                              <td className="px-4 py-3 font-medium text-[#111816] dark:text-white">
                                {item.description}
                              </td>
                              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                                {item.serviceCode}
                              </td>
                              <td className="px-4 py-3">
                                <input
                                  type="number"
                                  min="1"
                                  value={item.quantity}
                                  onChange={(e) =>
                                    updateItemQuantity(item.id, parseInt(e.target.value) || 1)
                                  }
                                  className="form-input w-16 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-center text-sm dark:text-white"
                                />
                              </td>
                              <td className="px-4 py-3 text-right">
                                ${item.unitPrice.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-right font-semibold text-[#111816] dark:text-white">
                                ${item.total.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="text-gray-500 hover:text-accent-red dark:text-gray-400 dark:hover:text-accent-red"
                                >
                                  <span className="material-symbols-outlined !text-xl">delete</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      onClick={addNewItem}
                      className="mt-4 flex h-10 min-w-[84px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed border-primary-blue px-4 text-sm font-bold text-primary-blue hover:bg-primary-blue/10"
                    >
                      <span className="material-symbols-outlined !text-xl">add</span>
                      <span className="truncate">Add New Item</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Section (Patient & Summary) */}
              <div className="col-span-12 lg:col-span-4">
                <div className="sticky top-8 space-y-6">
                  {/* Patient Information Card */}
                  <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#111816] dark:text-white">
                      Patient Information
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Patient Name</span>
                        <span className="font-semibold text-[#111816] dark:text-white">
                          {patientSearch || "N/A"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Patient ID</span>
                        <span className="font-semibold text-[#111816] dark:text-white">
                          PID-88726
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Date of Birth</span>
                        <span className="font-semibold text-[#111816] dark:text-white">
                          15 Jun 1985
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Visit Type</span>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 text-xs font-medium text-yellow-700 dark:text-yellow-400">
                          OPD
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Insurance Provider</span>
                        <span className="font-semibold text-[#111816] dark:text-white">
                          Aetna Health
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Summary Card */}
                  <div className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white p-6 dark:bg-gray-800">
                    <h3 className="mb-4 text-lg font-bold leading-tight tracking-[-0.015em] text-[#111816] dark:text-white">
                      Invoice Summary
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                        <span className="font-medium text-[#111816] dark:text-white">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Discount</span>
                        <input
                          type="text"
                          value={`$${discount.toFixed(2)}`}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value.replace("$", "")) || 0;
                            setDiscount(value);
                          }}
                          className="form-input w-24 rounded-md border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-1 text-right text-sm dark:text-white"
                        />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Tax (VAT {taxRate}%)</span>
                        <span className="font-medium text-[#111816] dark:text-white">
                          ${tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="my-4 border-t border-dashed border-gray-300 dark:border-gray-600"></div>
                      <div className="flex justify-between text-base font-bold">
                        <span className="text-[#111816] dark:text-white">Grand Total</span>
                        <span className="text-primary-blue">${grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                      <button
                        onClick={handleGenerateInvoice}
                        className="flex h-11 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary-blue px-4 text-base font-bold text-white shadow-sm hover:opacity-90"
                      >
                        <span className="truncate">Generate & Finalize Invoice</span>
                      </button>
                      <button className="flex h-10 w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-700 px-4 text-sm font-bold text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600">
                        <span className="truncate">Preview PDF</span>
                      </button>
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

