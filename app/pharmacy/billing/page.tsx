"use client";

import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { useState } from "react";

export default function PharmacyBillingPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Paracetamol 500mg",
      batchNo: "AB12345",
      expiry: "12/2025",
      quantity: 2,
      unitPrice: 15.0,
      totalPrice: 30.0,
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      batchNo: "CD67890",
      expiry: "06/2026",
      quantity: 1,
      unitPrice: 45.0,
      totalPrice: 45.0,
    },
    {
      id: 3,
      name: "Ibuprofen 200mg",
      batchNo: "EF11223",
      expiry: "09/2024",
      quantity: 3,
      unitPrice: 20.0,
      totalPrice: 60.0,
    },
  ]);

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <div className="relative flex min-h-screen w-full bg-background-light dark:bg-background-dark text-[#111816] dark:text-gray-200">
      <Sidebar userType="admin" />
      <main className="flex-1 p-8 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
          {/* Page Heading & Patient Card */}
          <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap justify-between items-start gap-3 mb-6">
              <h1 className="text-[#111816] dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                Pharmacy Billing
              </h1>
            </div>
            <div className="flex items-stretch justify-between gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-[#111816] dark:text-white text-base font-bold leading-tight">
                    Patient: John Doe (ID: P789012)
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    Prescribed by: Dr. Alan Grant
                  </p>
                </div>
                <button className="flex w-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg h-8 px-3 gap-2 bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white text-sm font-medium leading-normal hover:bg-gray-200 dark:hover:bg-gray-700">
                  <span className="material-symbols-outlined text-base">
                    search
                  </span>
                  <span className="truncate">Change Patient</span>
                </button>
              </div>
              <div className="w-24 h-24 bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex-shrink-0 relative overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVUxU0rkf0iRO71AhiLfB39i6yG4S1RKnWsXOmjuIg-j_gubC1bTMumL5cGnjgJDgkAbNoiSLBIzcvP8ly3EXCL0KwtCwIMvryxW4pa1BIhjdwboq69BtOw9MHGtzaLBpFJ0hkLStCiF4GuzYk4FvkIqWgTpX6vBX9n1GfqdUk-gBKOz1s4B3AoI4BmQcQ7vGfeq_Fkh0IcoQtTpKWOrbWitN1IQ8YcHjxhNLq6pbbS1DKP_Ljyj_FKqpK2-TKap9tMQ6fMzaL162h"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Search and Table */}
          <div className="flex flex-col flex-1 bg-white dark:bg-background-dark rounded-lg border border-gray-200 dark:border-gray-800">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <label className="flex flex-col min-w-40 h-12 w-full">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-gray-500 dark:text-gray-400 flex bg-gray-100 dark:bg-gray-800 items-center justify-center pl-4 rounded-l-lg">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111816] dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-gray-800 h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                    placeholder="Search and add medicine by name or batch no."
                  />
                </div>
              </label>
            </div>
            <div className="px-4 py-3 flex-1 overflow-x-auto">
              <div className="flex overflow-hidden bg-white dark:bg-background-dark min-w-[700px]">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white dark:bg-background-dark">
                      <th className="px-4 py-3 text-left text-[#111816] dark:text-white w-[30%] text-sm font-medium leading-normal">
                        Item Name
                      </th>
                      <th className="px-4 py-3 text-left text-[#111816] dark:text-white w-[15%] text-sm font-medium leading-normal">
                        Batch No.
                      </th>
                      <th className="px-4 py-3 text-left text-[#111816] dark:text-white w-[15%] text-sm font-medium leading-normal">
                        Expiry
                      </th>
                      <th className="px-4 py-3 text-center text-[#111816] dark:text-white w-[15%] text-sm font-medium leading-normal">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-right text-[#111816] dark:text-white w-[12.5%] text-sm font-medium leading-normal">
                        Unit Price
                      </th>
                      <th className="px-4 py-3 text-right text-[#111816] dark:text-white w-[12.5%] text-sm font-medium leading-normal">
                        Total Price
                      </th>
                      <th className="px-4 py-3 text-center text-gray-500 dark:text-gray-400 w-16 text-sm font-medium leading-normal"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-t-gray-200 dark:border-t-gray-800"
                      >
                        <td className="h-[72px] px-4 py-2 w-[30%] text-[#111816] dark:text-white text-sm font-normal leading-normal">
                          {item.name}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[15%] text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                          {item.batchNo}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[15%] text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                          {item.expiry}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[15%] text-sm font-normal leading-normal">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="size-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-[#111816] dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="size-7 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[12.5%] text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal text-right">
                          ₹{item.unitPrice.toFixed(2)}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-[12.5%] text-[#111816] dark:text-white text-sm font-medium leading-normal text-right">
                          ₹{item.totalPrice.toFixed(2)}
                        </td>
                        <td className="h-[72px] px-4 py-2 w-16 text-center">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Summary */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white dark:bg-background-dark p-6 rounded-lg border border-gray-200 dark:border-gray-800 flex-grow">
            <h2 className="text-xl font-bold text-[#111816] dark:text-white mb-6">
              Payment Summary
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Subtotal</p>
                <p className="text-[#111816] dark:text-white font-medium">
                  ₹{subtotal.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-500 dark:text-gray-400">Tax (5%)</p>
                <p className="text-[#111816] dark:text-white font-medium">
                  ₹{tax.toFixed(2)}
                </p>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center">
                <p className="text-[#111816] dark:text-white font-bold text-lg">
                  Total
                </p>
                <p className="text-[#111816] dark:text-white font-bold text-lg">
                  ₹{total.toFixed(2)}
                </p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-primary text-[#111816] font-bold py-3 rounded-lg hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined">payment</span>
              <span>Process Payment</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
