"use client";

export default function TestIconsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Icon Test Page</h1>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">dashboard</span>
          <span>dashboard icon</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">group</span>
          <span>group icon</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">stethoscope</span>
          <span>stethoscope icon</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl fill">calendar_month</span>
          <span>calendar_month icon (filled)</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">receipt_long</span>
          <span>receipt_long icon</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">search</span>
          <span>search icon</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">notifications</span>
          <span>notifications icon</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-4xl">account_circle</span>
          <span>account_circle icon</span>
        </div>
      </div>
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <p className="font-bold">Font Check:</p>
        <p>
          Material Symbols Font Family:{" "}
          <span
            className="material-symbols-outlined"
            style={{ fontFamily: "Material Symbols Outlined" }}
          >
            check_circle
          </span>
        </p>
      </div>
    </div>
  );
}

