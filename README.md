# Astamami Care Alliance — Healthcare Platform

> **Motto:** Compassion in Action | **Tagline:** Trusted Care. Real Support. On Time.

A production-ready, locally executable web platform for **Astamami Healthcare Solutions — Care Alliance division**.

---

## Technical Stack

| Layer | Technology | Details |
|-------|------------|---------|
| **Frontend** | Next.js 16 (App Router) + React 19 | TypeScript, Tailwind CSS, Component Library |
| **Backend** | NestJS 12 (Modular Monolith) | TypeScript, NodeNext, REST API (`/api/v1`) |
| **ORM & Database** | Prisma 7 + PostgreSQL | 20+ Models, RBAC, Clinical Logs, Invoicing |
| **Cache** | Redis | Session / Rate Limiting (Local) |
| **Auth** | Passport + JWT | Access & Refresh Tokens, Role-Guarded Endpoints |
| **Payment Mode** | Local / Manual Billing | Cash & Bank Transfer Reconciliation (Chapa excluded) |
| **Notifications** | In-App + Email Stub | SMS integration delayed per project parameters |

---

## Project Structure

```
astamami-healthcare-solution/
├── frontend/                     # Next.js 16 App
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx          # Public Landing Page & Care Services
│   │   │   ├── (auth)/           # Login, Register, Forgot Password
│   │   │   ├── admin/            # Care Coordinator Console (KPIs, Vetting, Roster)
│   │   │   ├── client/           # Patient & Family Portal (Vitals, Care Plan)
│   │   │   └── caregiver/        # Nurse Shift Hub (GPS Clock In/Out, Visit Logs)
│   │   ├── components/           # UI, Buttons, Badges, Cards, Layout
│   │   ├── lib/                  # API Client, Routes, Utilities
│   │   └── types/                # Domain Types (User, Booking, Caregiver, Client)
│   ├── .env.local
│   └── package.json
│
├── backend/                      # NestJS REST API
│   ├── prisma/
│   │   ├── schema.prisma         # Full Database Schema
│   │   └── seed.ts               # Demo accounts, roles & services
│   ├── src/
│   │   ├── common/               # Guards (JWT, Roles), Filters, Interceptors, Prisma
│   │   ├── config/               # Environment Configuration
│   │   ├── modules/              # 17 Feature Modules
│   │   │   ├── auth              # Login, Register, JWT Strategy
│   │   │   ├── users             # User management
│   │   │   ├── clients           # Patient & family directory
│   │   │   ├── caregivers        # Nurse & caregiver profiles, vetting
│   │   │   ├── services          # Care packages & pricing
│   │   │   ├── bookings          # Service requests & workflows
│   │   │   ├── scheduling        # Shifts, caregiver assignment
│   │   │   ├── service-delivery  # Clock-in/out, clinical visit notes
│   │   │   ├── care-plans        # Individualized patient care plans
│   │   │   ├── invoices          # Medical billing & receivables
│   │   │   ├── payments          # Cash & bank transfer recording
│   │   │   ├── incidents         # Clinical incident reporting
│   │   │   ├── documents         # Qualifications, IDs, licenses
│   │   │   ├── reports           # Dashboard metrics & analytics
│   │   │   ├── audit             # Audit logging for compliance
│   │   │   ├── notifications     # In-app messaging (SMS delayed)
│   │   │   └── configuration     # System parameters & settings
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── prisma.config.ts
│   ├── .env
│   └── package.json
│
├── docker-compose.yml            # One-command local PostgreSQL & Redis
└── README.md
```

---

## Quick Start (Running Locally)

### 1. Start Database & Redis (Docker Compose)
If you have Docker installed, simply run:
```bash
docker compose up -d
```
*(Or ensure your local PostgreSQL is running on port 5432 with database `astamami_db`)*

### 2. Backend Setup
```bash
cd backend

# Generate Prisma Client & Migrate
npx prisma generate
npx prisma db push

# Seed initial roles, demo accounts, and services
npx tsx prisma/seed.ts

# Start the NestJS API server (runs on http://localhost:3001/api/v1)
npm run start:dev
```

### 3. Frontend Setup
In a second terminal:
```bash
cd frontend

# Start the Next.js development server (runs on http://localhost:3000)
npm run dev
```

---

## Demo Accounts (Seeded for Local Testing)

All seeded demo accounts share the password: `Password@123`

| Portal | Email | Password | Role |
|--------|-------|----------|------|
| **Care Coordinator / Admin** | `admin@astamami.com` | `Password@123` | ADMIN / SUPER_ADMIN |
| **Client & Family Member** | `client@astamami.com` | `Password@123` | CLIENT |
| **Caregiver / Registered Nurse** | `caregiver@astamami.com` | `Password@123` | CAREGIVER |

> Note: The frontend login page (`/login`) includes 1-click **Quick-Fill** demo buttons for instantaneous testing.
