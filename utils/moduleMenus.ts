// Module-specific sidebar menu configurations

export interface MenuItem {
  icon: string;
  label: string;
  href: string;
}

export const moduleMenus: Record<string, MenuItem[]> = {
  registration: [
    { icon: "dashboard", label: "Overview", href: "/modules/registration" },
    { icon: "person_add", label: "New Registration", href: "/modules/registration/new" },
    { icon: "groups", label: "Registered Patients", href: "/modules/registration/patients" },
    { icon: "history", label: "Registration History", href: "/modules/registration/history" },
    { icon: "description", label: "Forms", href: "/modules/registration/forms" },
  ],
  hospital: [
    { icon: "dashboard", label: "Overview", href: "/modules/hospital" },
    { icon: "local_hospital", label: "Departments", href: "/modules/hospital/departments" },
    { icon: "bed", label: "Wards", href: "/modules/hospital/wards" },
    { icon: "science", label: "Lab Reports", href: "/modules/hospital/lab-reports" },
    { icon: "settings", label: "Hospital Settings", href: "/modules/hospital/settings" },
    { icon: "info", label: "Hospital Info", href: "/modules/hospital/info" },
  ],
  diagnosis: [
    { icon: "dashboard", label: "Overview", href: "/modules/diagnosis" },
    { icon: "medical_services", label: "New Diagnosis", href: "/modules/diagnosis/new" },
    { icon: "history", label: "Diagnosis History", href: "/modules/diagnosis/history" },
    { icon: "folder", label: "Diagnosis Records", href: "/modules/diagnosis/records" },
    { icon: "assessment", label: "Reports", href: "/modules/diagnosis/reports" },
  ],
  emergency: [
    { icon: "dashboard", label: "Overview", href: "/modules/emergency" },
    { icon: "emergency", label: "Active Cases", href: "/modules/emergency/active" },
    { icon: "add_circle", label: "New Emergency", href: "/modules/emergency/new" },
    { icon: "schedule", label: "Triage Queue", href: "/modules/emergency/triage" },
    { icon: "history", label: "Emergency History", href: "/modules/emergency/history" },
  ],
  "opd-service": [
    { icon: "dashboard", label: "Overview", href: "/modules/opd-service" },
    { icon: "medical_information", label: "OPD Services", href: "/modules/opd-service/services" },
    { icon: "schedule", label: "Schedule", href: "/modules/opd-service/schedule" },
    { icon: "receipt", label: "Billing", href: "/modules/opd-service/billing" },
    { icon: "assessment", label: "Reports", href: "/modules/opd-service/reports" },
  ],
  dialysis: [
    { icon: "dashboard", label: "Overview", href: "/modules/dialysis" },
    { icon: "healing", label: "Active Sessions", href: "/modules/dialysis/sessions" },
    { icon: "schedule", label: "Schedule", href: "/modules/dialysis/schedule" },
    { icon: "history", label: "History", href: "/modules/dialysis/history" },
    { icon: "equipment", label: "Equipment", href: "/modules/dialysis/equipment" },
  ],
  "hr-management": [
    { icon: "dashboard", label: "Overview", href: "/modules/hr-management" },
    { icon: "groups", label: "Employees", href: "/modules/hr-management/employees" },
    { icon: "work", label: "Departments", href: "/modules/hr-management/departments" },
    { icon: "schedule", label: "Attendance", href: "/modules/hr-management/attendance" },
    { icon: "payments", label: "Payroll", href: "/modules/hr-management/payroll" },
  ],
  settings: [
    { icon: "dashboard", label: "Overview", href: "/modules/settings" },
    { icon: "settings", label: "General", href: "/modules/settings/general" },
    { icon: "security", label: "Security", href: "/modules/settings/security" },
    { icon: "notifications", label: "Notifications", href: "/modules/settings/notifications" },
    { icon: "backup", label: "Backup", href: "/modules/settings/backup" },
  ],
  "doctor-management": [
    { icon: "dashboard", label: "Overview", href: "/admin/doctors" },
    { icon: "person", label: "All Doctors", href: "/admin/doctors" },
    { icon: "person_add", label: "Add Doctor", href: "/admin/doctors/new" },
    { icon: "schedule", label: "Schedules", href: "/admin/doctors/schedules" },
    { icon: "assessment", label: "Performance", href: "/admin/doctors/performance" },
  ],
  "asset-management": [
    { icon: "dashboard", label: "Overview", href: "/modules/asset-management" },
    { icon: "inventory_2", label: "Assets", href: "/modules/asset-management/assets" },
    { icon: "category", label: "Categories", href: "/modules/asset-management/categories" },
    { icon: "history", label: "Maintenance", href: "/modules/asset-management/maintenance" },
    { icon: "assessment", label: "Reports", href: "/modules/asset-management/reports" },
  ],
  "security-option": [
    { icon: "dashboard", label: "Overview", href: "/modules/security" },
    { icon: "security", label: "Access Control", href: "/modules/security/access" },
    { icon: "admin_panel_settings", label: "Roles", href: "/modules/security/roles" },
    { icon: "history", label: "Audit Log", href: "/modules/security/audit" },
    { icon: "vpn_key", label: "Permissions", href: "/modules/security/permissions" },
  ],
};

// Detect active module from pathname
export function getActiveModule(pathname: string): string | null {
  if (pathname.startsWith("/modules/registration")) return "registration";
  if (pathname.startsWith("/modules/hospital")) return "hospital";
  if (pathname.startsWith("/modules/diagnosis")) return "diagnosis";
  if (pathname.startsWith("/modules/emergency")) return "emergency";
  if (pathname.startsWith("/modules/opd-service")) return "opd-service";
  if (pathname.startsWith("/modules/dialysis")) return "dialysis";
  if (pathname.startsWith("/modules/hr-management")) return "hr-management";
  if (pathname.startsWith("/modules/settings")) return "settings";
  if (pathname.startsWith("/admin/doctors")) return "doctor-management";
  if (pathname.startsWith("/modules/asset-management")) return "asset-management";
  if (pathname.startsWith("/modules/security")) return "security-option";
  return null;
}

