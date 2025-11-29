"use client";

import ModulesMenu from "./ModulesMenu";

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between gap-4 px-8 py-3 bg-white/80 dark:bg-black/20 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
      <div className="flex-1">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            search
          </span>
          <input
            className="w-full max-w-sm h-10 pl-10 pr-4 bg-background-light dark:bg-background-dark border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Search patients, doctors, appointments..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {/* Modules Menu - Left side of notifications */}
        <ModulesMenu />
        <button className="p-2 rounded-full hover:bg-primary/10 relative transition-colors">
          <span className="material-symbols-outlined text-[#111816] dark:text-gray-300">
            notifications
          </span>
          {/* Notification badge */}
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-gray-800"></span>
        </button>
        <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
          <span className="material-symbols-outlined text-[#111816] dark:text-gray-300">
            account_circle
          </span>
        </button>
      </div>
    </header>
  );
}
