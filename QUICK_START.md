# Quick Start Guide

## 🚀 Getting Started

1. **Navigate to the project directory:**
   ```bash
   cd HMS-Web
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
HMS-Web/
├── app/                      # Next.js App Router
│   ├── login/               # Login page
│   │   └── page.tsx
│   ├── admin/               # Admin section
│   │   └── dashboard/       # Admin dashboard
│   │       └── page.tsx
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page (redirects to login)
│   └── globals.css          # Global styles
├── components/              # Reusable components
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── Header.tsx          # Top header
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js          # Next.js configuration
└── package.json            # Dependencies
```

## 🎨 Design System

The application uses a custom design system matching the original HTML designs:

- **Primary Color**: `#13eca4` (Mint Green)
- **Light Blue**: `#4A90E2`
- **Background Light**: `#f6f8f7`
- **Background Dark**: `#10221c`

## 📄 Available Pages

- **`/login`** - Login page with email/password authentication
- **`/admin/dashboard`** - Admin dashboard with statistics, charts, and quick actions

## 🔧 Next Steps

1. **Add more pages** from the `stitch_admin_dashboard` folder:
   - Doctor Dashboard
   - Patient Management
   - Appointment System
   - Billing & Invoicing
   - And more...

2. **Implement Authentication:**
   - Add authentication logic
   - Protect routes
   - Add user sessions

3. **Connect to Backend:**
   - Set up API routes
   - Connect to database
   - Implement data fetching

4. **Add Features:**
   - Real-time updates
   - Notifications
   - Data tables with pagination
   - Forms and validation

## 🛠️ Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📝 Notes

- The project uses Next.js 16 with App Router
- TypeScript is configured for type safety
- Tailwind CSS v3 is used for styling
- Material Symbols Outlined icons are used
- Inter font family is used throughout

