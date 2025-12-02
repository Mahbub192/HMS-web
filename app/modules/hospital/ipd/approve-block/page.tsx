"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Link from "next/link";
import { useState } from "react";

interface BlockedPatientRequest {
  id: string;
  patientId: string;
  patientName: string;
  age: number;
  gender: string;
  bedNo: string;
  ward: string;
  admissionDate: string;
  blockedDate: string;
  blockedBy: string;
  reason: string;
  remarks: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedBy: string;
}

export default function ApproveBlockPatientPage() {
  const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Approved" | "Rejected">("All");
  const [selectedRequest, setSelectedRequest] = useState<BlockedPatientRequest | null>(null);
  const [approvalRemarks, setApprovalRemarks] = useState("");

  const [blockedRequests, setBlockedRequests] = useState<BlockedPatientRequest[]>([
    {
      id: "BLK-001",
      patientId: "P-10250",
      patientName: "Emma Wilson",
      age: 45,
      gender: "Female",
      bedNo: "GEN-105",
      ward: "General Ward",
      admissionDate: "2024-01-10",
      blockedDate: "2024-01-20",
      blockedBy: "Dr. Sarah Johnson",
      reason: "Non-payment of dues",
      remarks: "Patient has outstanding balance of $25,000. Multiple payment reminders sent.",
      status: "Pending",
      requestedBy: "Dr. Sarah Johnson",
    },
    {
      id: "BLK-002",
      patientId: "P-10251",
      patientName: "Michael Brown",
      age: 38,
      gender: "Male",
      bedNo: "ICU-03",
      ward: "ICU",
      admissionDate: "2024-01-12",
      blockedDate: "2024-01-18",
      blockedBy: "Admin",
      reason: "Insurance claim rejected",
      remarks: "Insurance company denied coverage. Patient needs to arrange alternative payment.",
      status: "Pending",
      requestedBy: "Admin",
    },
    {
      id: "BLK-003",
      patientId: "P-10252",
      patientName: "Sophia Davis",
      age: 52,
      gender: "Female",
      bedNo: "GEN-201",
      ward: "General Ward",
      admissionDate: "2024-01-08",
      blockedDate: "2024-01-15",
      blockedBy: "Dr. John Smith",
      reason: "Violation of hospital policy",
      remarks: "Patient repeatedly violated visiting hours and caused disturbance.",
      status: "Approved",
      requestedBy: "Dr. John Smith",
    },
    {
      id: "BLK-004",
      patientId: "P-10253",
      patientName: "James Miller",
      age: 29,
      gender: "Male",
      bedNo: "EMG-02",
      ward: "Emergency",
      admissionDate: "2024-01-19",
      blockedDate: "2024-01-21",
      blockedBy: "Nurse Manager",
      reason: "Requested by patient",
      remarks: "Patient requested temporary block due to personal reasons.",
      status: "Rejected",
      requestedBy: "Nurse Manager",
    },
  ]);

  const filteredRequests =
    filterStatus === "All"
      ? blockedRequests
      : blockedRequests.filter((req) => req.status === filterStatus);

  const handleApprove = (request: BlockedPatientRequest) => {
    if (!approvalRemarks.trim()) {
      alert("Please provide approval remarks");
      return;
    }

    setBlockedRequests(
      blockedRequests.map((req) =>
        req.id === request.id
          ? { ...req, status: "Approved" as const, remarks: `${req.remarks}\n\nApproval: ${approvalRemarks}` }
          : req
      )
    );

    console.log("Block Approved:", {
      request,
      approvalRemarks,
      approvedBy: "Current User",
    });

    alert(`Block request approved!\nPatient: ${request.patientName}\nBlock ID: ${request.id}`);
    setSelectedRequest(null);
    setApprovalRemarks("");
  };

  const handleReject = (request: BlockedPatientRequest) => {
    if (!approvalRemarks.trim()) {
      alert("Please provide rejection reason");
      return;
    }

    setBlockedRequests(
      blockedRequests.map((req) =>
        req.id === request.id
          ? { ...req, status: "Rejected" as const, remarks: `${req.remarks}\n\nRejection: ${approvalRemarks}` }
          : req
      )
    );

    console.log("Block Rejected:", {
      request,
      rejectionReason: approvalRemarks,
      rejectedBy: "Current User",
    });

    alert(`Block request rejected!\nPatient: ${request.patientName}\nBlock ID: ${request.id}`);
    setSelectedRequest(null);
    setApprovalRemarks("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700";
      case "Approved":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-300 dark:border-green-700";
      case "Rejected":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-300 dark:border-red-700";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return "schedule";
      case "Approved":
        return "check_circle";
      case "Rejected":
        return "cancel";
      default:
        return "info";
    }
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
                Approve Block Patient
              </span>
            </div>

            {/* Page Heading */}
            <header className="mb-6">
              <h1 className="text-[#111816] dark:text-white text-3xl font-bold tracking-tight mb-2">
                APPROVE BLOCK PATIENT
              </h1>
              <p className="text-[#61897c] dark:text-gray-400 text-base font-normal leading-normal">
                Review and approve/reject patient block requests.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Requests List */}
              <div className="lg:col-span-2 space-y-6">
                {/* Filter */}
                <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-4">
                  <div className="flex gap-3 overflow-x-auto">
                    {(["All", "Pending", "Approved", "Rejected"] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFilterStatus(status)}
                        className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-sm font-medium ${
                          filterStatus === status
                            ? "bg-primary/20 text-primary ring-2 ring-primary"
                            : "bg-gray-100 dark:bg-gray-800 text-[#111816] dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                      >
                        {status}
                        {status !== "All" && (
                          <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white dark:bg-gray-700">
                            {blockedRequests.filter((r) => r.status === status).length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Requests List */}
                <div className="space-y-4">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <div
                        key={request.id}
                        className={`bg-white dark:bg-[#182c25] rounded-xl border-2 shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
                          selectedRequest?.id === request.id
                            ? "border-primary ring-2 ring-primary"
                            : "border-[#dbe6e2] dark:border-[#2a3f38]"
                        }`}
                        onClick={() => setSelectedRequest(request)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-[#111816] dark:text-white">
                                {request.patientName}
                              </h3>
                              <span
                                className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(request.status)}`}
                              >
                                {request.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-sm text-[#61897c] dark:text-gray-400 mb-3">
                              <div>
                                <span className="font-medium">Patient ID:</span> {request.patientId}
                              </div>
                              <div>
                                <span className="font-medium">Age:</span> {request.age} years • {request.gender}
                              </div>
                              <div>
                                <span className="font-medium">Bed:</span> {request.bedNo}
                              </div>
                              <div>
                                <span className="font-medium">Ward:</span> {request.ward}
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm font-medium text-[#111816] dark:text-white mb-1">
                                Reason:
                              </p>
                              <p className="text-sm text-[#61897c] dark:text-gray-400">{request.reason}</p>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm font-medium text-[#111816] dark:text-white mb-1">
                                Remarks:
                              </p>
                              <p className="text-sm text-[#61897c] dark:text-gray-400">{request.remarks}</p>
                            </div>
                            <div className="flex items-center justify-between text-xs text-[#61897c] dark:text-gray-400 pt-3 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                              <div>
                                <span className="font-medium">Blocked By:</span> {request.blockedBy}
                              </div>
                              <div>
                                <span className="font-medium">Date:</span> {new Date(request.blockedDate).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-2xl text-gray-400 ml-4">
                            {getStatusIcon(request.status)}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
            <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] p-8 text-center">
                      <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                        check_circle
                      </span>
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        No {filterStatus === "All" ? "" : filterStatus.toLowerCase()} requests found
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Approval Form */}
              <div className="lg:col-span-1">
                {selectedRequest && selectedRequest.status === "Pending" ? (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Review Request
                    </h3>
                    <div className="mb-4 p-3 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg">
                      <p className="text-sm font-medium text-[#111816] dark:text-white mb-1">
                        Block ID: {selectedRequest.id}
                      </p>
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        Patient: {selectedRequest.patientName}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-[#111816] dark:text-white mb-1">
                          Approval/Rejection Remarks: <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          value={approvalRemarks}
                          onChange={(e) => setApprovalRemarks(e.target.value)}
                          rows={4}
                          placeholder="Enter your remarks for approval or rejection..."
                          required
                          className="w-full rounded-lg border border-[#dbe6e2] dark:border-[#2a3f38] bg-white dark:bg-[#2a3f38] px-3 py-2 text-[#111816] dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="flex flex-col gap-3 pt-4 border-t border-[#dbe6e2] dark:border-[#2a3f38]">
                        <button
                          type="button"
                          onClick={() => handleApprove(selectedRequest)}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <span className="material-symbols-outlined">check_circle</span>
                          <span>Approve Block</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleReject(selectedRequest)}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <span className="material-symbols-outlined">cancel</span>
                          <span>Reject Block</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : selectedRequest ? (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <h3 className="text-lg font-semibold text-[#111816] dark:text-white mb-4">
                      Request Status
                    </h3>
                    <div className="p-4 bg-[#f0f4f3] dark:bg-[#2a3f38] rounded-lg text-center">
                      <span
                        className={`material-symbols-outlined text-4xl mb-2 ${
                          selectedRequest.status === "Approved"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {getStatusIcon(selectedRequest.status)}
                      </span>
                      <p
                        className={`font-semibold ${
                          selectedRequest.status === "Approved"
                            ? "text-green-700 dark:text-green-400"
                            : "text-red-700 dark:text-red-400"
                        }`}
                      >
                        {selectedRequest.status}
                      </p>
                      <p className="text-sm text-[#61897c] dark:text-gray-400 mt-2">
                        This request has been {selectedRequest.status.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#182c25] rounded-xl border border-[#dbe6e2] dark:border-[#2a3f38] shadow-sm p-6 sticky top-6">
                    <div className="text-center py-8">
                      <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
                        info
                      </span>
                      <p className="text-sm text-[#61897c] dark:text-gray-400">
                        Select a request to review
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
