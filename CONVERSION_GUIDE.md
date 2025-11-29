# HTML to Next.js Conversion Guide

This document tracks the conversion of HTML designs from `stitch_admin_dashboard` to Next.js pages.

## Conversion Strategy

1. **Reuse Components**: Use existing `Sidebar` and `Header` components
2. **Maintain Design**: Keep the exact same styling and layout
3. **TypeScript**: Convert to TypeScript with proper types
4. **Next.js Best Practices**: Use App Router, client components where needed

## Conversion Checklist

### ✅ Completed
- Login Page
- Admin Dashboard
- Receptionist Dashboard
- Patient Profile Management
- Create Appointment & Calendar
- Patient Queue Screen
- Basic Module Pages

### 🔄 In Progress
- Converting remaining pages systematically

### 📋 Remaining Pages

#### Patient Management
- [ ] Patient History View
- [ ] Patient Queue Screen (completed)

#### Appointments
- [ ] Appointment Status Management
- [ ] Appointment Assignment
- [ ] Appointment Token System
- [ ] Appointment Notification UI

#### Billing
- [ ] OPD/IPD Billing Management
- [ ] Create Invoice (Automated Services)
- [ ] Downloadable & Printable Invoice
- [ ] Payment Methods Selection

#### Pharmacy
- [ ] Pharmacy Billing
- [ ] Pharmacy Stock In/Out
- [ ] Drug Inventory Dashboard
- [ ] Drug Expiry Alerts
- [ ] Prescription Link & Dispense
- [ ] Medicine Request from Wards

#### Lab
- [ ] Lab Dashboard Overview
- [ ] Lab Test Booking
- [ ] Sample Collection Status
- [ ] Test Result Entry & Report

#### Ward & Bed
- [ ] Ward Assignment
- [ ] Ward Layouts (ICU, General, Emergency)
- [ ] Bed Availability Map
- [ ] Bed Occupancy Monitoring
- [ ] Transfer Patient

#### Doctor
- [ ] Doctor Dashboard (needs update)
- [ ] Doctor Profile Management
- [ ] Doctor Performance Statistics
- [ ] Doctor Timetable & Availability

#### Staff & HR
- [ ] Staff Profiles Management
- [ ] Staff Role Permissions
- [ ] Attendance & Shift Scheduling
- [ ] Payroll Overview

#### Other
- [ ] Diagnosis Entry Page
- [ ] Electronic Medical Record (EMR) View
- [ ] Insurance Claim Tracking UI
- [ ] Admission/Discharge Page

## File Structure

```
app/
├── admin/
│   ├── dashboard/
│   ├── patients/
│   │   ├── profile/
│   │   └── queue/
│   ├── appointments/
│   │   └── create/
│   ├── doctors/
│   └── billing/
├── receptionist/
│   └── dashboard/
├── doctor/
│   └── dashboard/
├── modules/
│   └── [various modules]/
└── login/
```

## Notes

- All pages use the same design system (colors, typography)
- Material Symbols icons are used throughout
- Dark mode support is included
- Responsive design is maintained

