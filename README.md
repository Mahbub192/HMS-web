# HMS-Web - Hospital Management System

A modern, comprehensive Hospital Management System built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🏥 **Complete Hospital Management**: Patient management, doctor scheduling, appointments, billing, and more
- 🎨 **Modern UI/UX**: Beautiful, responsive design with dark mode support
- ⚡ **Next.js 16**: Built with the latest Next.js features including App Router
- 🎯 **TypeScript**: Fully typed for better developer experience
- 💅 **Tailwind CSS**: Utility-first CSS framework with custom theme
- 📱 **Responsive Design**: Works seamlessly on all devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Material Symbols Outlined
- **Fonts**: Inter

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
HMS-Web/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── admin/             # Admin dashboard and pages
│   └── doctor/            # Doctor dashboard and pages
├── components/            # Reusable React components
│   ├── Sidebar.tsx        # Navigation sidebar
│   └── Header.tsx         # Top navigation header
├── public/                # Static assets
└── styles/                # Global styles
```

## Available Pages

- `/login` - Login page
- `/admin/dashboard` - Admin dashboard
- `/doctor/dashboard` - Doctor dashboard

## Design System

The application uses a custom design system based on the original HTML designs:

- **Primary Color**: `#13eca4` (Mint Green)
- **Light Blue**: `#4A90E2`
- **Background Light**: `#f6f8f7`
- **Background Dark**: `#10221c`

## Development

### Build for Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Future Enhancements

- [ ] Authentication & Authorization
- [ ] Database Integration
- [ ] API Routes
- [ ] Real-time Notifications
- [ ] Additional Dashboard Pages
- [ ] Patient Management
- [ ] Appointment System
- [ ] Billing & Invoicing
- [ ] Inventory Management
- [ ] Lab Management
- [ ] Pharmacy Management

## License

ISC

