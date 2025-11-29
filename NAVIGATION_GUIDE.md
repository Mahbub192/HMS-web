# HMS Web - Navigation Guide

## ✅ Navigation Structure

### Admin Dashboard Navigation

#### Main Menu Items:
1. **Dashboard** → `/admin/dashboard`
2. **Patients** → `/admin/patients`
   - Profile → `/admin/patients/profile`
   - Queue → `/admin/patients/queue`
   - History → `/admin/patients/history`
3. **Doctors** → `/admin/doctors`
4. **Appointments** → `/admin/appointments`
   - Create → `/admin/appointments/create`
   - Status → `/admin/appointments/status`
5. **Billing & Invoices** → `/admin/billing`
6. **Pharmacy** → `/pharmacy/billing`
7. **Lab** → `/lab/dashboard`
8. **Bed Management** → `/admin/beds/availability`

### Doctor Dashboard Navigation

1. **Dashboard** → `/doctor/dashboard`
2. **Patients** → `/doctor/patients`
3. **Calendar** → `/doctor/calendar`
4. **Messages** → `/doctor/messages`
5. **Settings** → `/doctor/settings`

### Receptionist Dashboard Navigation

1. **Dashboard** → `/receptionist/dashboard`
2. **Patients** → `/receptionist/patients`
3. **Appointments** → `/receptionist/appointments`
4. **Billing** → `/receptionist/billing`
5. **Reports** → `/receptionist/reports`

## 🔄 Module-Based Navigation

When you navigate to any module, the sidebar automatically updates to show module-specific navigation:

### Registration Module
- Overview → `/modules/registration`
- New Registration → `/modules/registration/new`
- Registered Patients → `/modules/registration/patients`
- Registration History → `/modules/registration/history`
- Forms → `/modules/registration/forms`

### Hospital Module
- Overview → `/modules/hospital`
- Departments → `/modules/hospital/departments`
- Wards → `/modules/hospital/wards`
- Hospital Settings → `/modules/hospital/settings`
- Hospital Info → `/modules/hospital/info`

### Diagnosis Module
- Overview → `/modules/diagnosis`
- New Diagnosis → `/modules/diagnosis/new`
- Diagnosis History → `/modules/diagnosis/history`
- Diagnosis Records → `/modules/diagnosis/records`
- Reports → `/modules/diagnosis/reports`

### Emergency Module
- Overview → `/modules/emergency`
- Active Cases → `/modules/emergency/active`
- New Emergency → `/modules/emergency/new`
- Triage Queue → `/modules/emergency/triage`
- Emergency History → `/modules/emergency/history`

### OPD Service Module
- Overview → `/modules/opd-service`
- OPD Services → `/modules/opd-service/services`
- Schedule → `/modules/opd-service/schedule`
- Billing → `/modules/opd-service/billing`
- Reports → `/modules/opd-service/reports`

### Dialysis Module
- Overview → `/modules/dialysis`
- Active Sessions → `/modules/dialysis/sessions`
- Schedule → `/modules/dialysis/schedule`
- History → `/modules/dialysis/history`
- Equipment → `/modules/dialysis/equipment`

### HR Management Module
- Overview → `/modules/hr-management`
- Employees → `/modules/hr-management/employees`
- Departments → `/modules/hr-management/departments`
- Attendance → `/modules/hr-management/attendance`
- Payroll → `/modules/hr-management/payroll`

### Settings Module
- Overview → `/modules/settings`
- General → `/modules/settings/general`
- Security → `/modules/settings/security`
- Notifications → `/modules/settings/notifications`
- Backup → `/modules/settings/backup`

### Doctor Management Module
- Overview → `/admin/doctors`
- All Doctors → `/admin/doctors`
- Add Doctor → `/admin/doctors/new`
- Schedules → `/admin/doctors/schedules`
- Performance → `/admin/doctors/performance`

### Asset Management Module
- Overview → `/modules/asset-management`
- Assets → `/modules/asset-management/assets`
- Categories → `/modules/asset-management/categories`
- Maintenance → `/modules/asset-management/maintenance`
- Reports → `/modules/asset-management/reports`

### Security Option Module
- Overview → `/modules/security`
- Access Control → `/modules/security/access`
- Roles → `/modules/security/roles`
- Audit Log → `/modules/security/audit`
- Permissions → `/modules/security/permissions`

## 🎯 Navigation Features

### 1. **Sub-Menu Expansion**
- When you click on a main menu item with sub-items (like "Patients" or "Appointments"), the sub-menu automatically expands
- Sub-menu items are shown with indentation and a left border
- Active sub-menu items are highlighted

### 2. **Active State Detection**
- The current page is highlighted in the sidebar
- Parent menu items are also highlighted when on a sub-page
- Icons are filled when the page is active

### 3. **Module Detection**
- When navigating to any module route, the sidebar automatically switches to module-specific navigation
- The sidebar title changes to show the module name
- Module navigation persists until you navigate to a non-module route

### 4. **Header Modules Menu**
- Click the "Modules" button in the header to see all available modules
- Modules are displayed in a 3-column grid
- Active module is highlighted
- Click any module to navigate and update the sidebar

## 📱 How to Navigate

1. **From Dashboard**: Click any menu item in the sidebar
2. **From Modules Menu**: Click "Modules" in header → Select a module
3. **Direct URL**: Type the URL directly (e.g., `/admin/patients/history`)
4. **Breadcrumbs**: Use breadcrumbs on pages to navigate back

## 🔗 Quick Links

- **Login**: `/login`
- **Admin Dashboard**: `/admin/dashboard`
- **Doctor Dashboard**: `/doctor/dashboard`
- **Receptionist Dashboard**: `/receptionist/dashboard`
- **All Modules**: `/modules`

## 💡 Tips

- The sidebar automatically updates based on your current route
- Sub-menus only show when the parent menu is active
- Use the Modules menu in the header for quick access to all modules
- All navigation is responsive and works on mobile devices

