# Astamami Care Alliance — Project Discovery & Technical Strategy

> **Company:** Astamami Healthcare Solutions  
> **Division:** Astamami Care Alliance  
> **Motto:** *Compassion in Action* | **Tagline:** *Trusted Care. Real Support. On Time.*

---

## A. Executive Summary

We are building a **complete, production-ready, web-based Care Service Management Platform** for the Astamami Care Alliance division. The platform will digitize every aspect of the care service operation — from public-facing service bookings to internal caregiver scheduling, care plan management, payments, and administrative reporting.

> [!IMPORTANT]
> **Scope Restriction:** This system covers ONLY the **Care Alliance** division. Everything related to training, courses, students, LMS, or certifications is strictly EXCLUDED.

---

## B. Understanding the Business

Astamami Healthcare Solutions provides professional caregiving and healthcare support services in Ethiopia. The Care Alliance division handles:

- Receiving and managing client care requests
- Employing, verifying, and scheduling caregivers and healthcare professionals
- Delivering care services (hospital attendant, home care, elder care, disability support, etc.)
- Managing payments and invoicing
- Coordinating between clients, caregivers, and internal staff

The business needs a digital platform that replaces manual/paper-based operations and provides:
1. A **public website** for awareness, trust-building, and lead/booking capture
2. An **admin dashboard** for internal operations management
3. A **client portal** for self-service
4. A **caregiver portal** for shift and care management

---

## C. Functional Requirements

| # | Module | Description |
|---|--------|-------------|
| 1 | **Service Catalog** | Admin-configurable services & packages |
| 2 | **Client Management** | Full client lifecycle, profiles, history |
| 3 | **Caregiver Management** | Profiles, verification workflow, status |
| 4 | **Booking System** | Multi-step online booking with lifecycle states |
| 5 | **Caregiver Assignment** | Rule-based matching & manual assignment |
| 6 | **Scheduling** | Daily/weekly/monthly view, conflict detection |
| 7 | **Care Plans** | Versioned care plans per client |
| 8 | **Service Delivery** | Shift start/end, care notes, task logs |
| 9 | **Incident Management** | Reporting, review, resolution tracking |
| 10 | **Payments** | Flexible pricing, invoices, receipts, PDF |
| 11 | **Client Portal** | Self-service dashboard for clients |
| 12 | **Caregiver Portal** | Mobile-optimized portal for caregivers |
| 13 | **Admin Dashboard** | KPIs, charts, operational overview |
| 14 | **Notifications** | Email, SMS, in-app |
| 15 | **Communication** | Controlled messaging between roles |
| 16 | **Document Management** | Secure file upload, storage, access control |
| 17 | **Reporting & Analytics** | Operational, financial, caregiver reports |
| 18 | **Audit Logging** | Tamper-resistant action history |
| 19 | **Public Website** | SEO-optimized, conversion-focused |
| 20 | **System Configuration** | Admin-configurable rules, roles, templates |

---

## D. Non-Functional Requirements

| Category | Requirements |
|----------|-------------|
| **Security** | MFA, RBAC, CSRF, XSS, SQL injection prevention, encrypted data at rest and in transit |
| **Privacy** | Data minimization, least privilege, secure retention, purpose limitation |
| **Performance** | DB indexing, caching (Redis), CDN, pagination, lazy loading |
| **Scalability** | Modular monolith → future microservices migration path |
| **Reliability** | Automated backups, disaster recovery, RPO ≤ 24h, RTO ≤ 4h |
| **Accessibility** | WCAG-aligned: keyboard nav, screen readers, color contrast, focus states |
| **Mobile Responsiveness** | Fully responsive; caregiver portal optimized for mobile |
| **Internationalization** | English initially; architecture supports Amharic and other languages |
| **SEO** | Semantic HTML, Open Graph, structured data, sitemap, robots.txt |
| **Auditability** | All sensitive actions logged with user, timestamp, IP, before/after values |

---

## E. User Roles & Permission Matrix

| Permission | Super Admin | Admin | Care Coordinator | Finance Officer | HR Manager | Caregiver | Nurse | Client | Family Member |
|-----------|:-----------:|:-----:|:----------------:|:---------------:|:----------:|:---------:|:-----:|:------:|:-------------:|
| System configuration | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage users/roles | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View all clients | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage bookings | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | Own | ❌ |
| Assign caregivers | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View/manage finances | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | Own | ❌ |
| Manage caregivers | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Verify caregivers | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View own schedule | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Record care notes | ❌ | ❌ | ✅ | ❌ | ❌ | ✅ | ✅ | ❌ | ❌ |
| File incident reports | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ |
| Access audit logs | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View own client info | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ | Limited |

---

## F. Recommended Architecture

### Architecture Style: **Modular Monolith** (MVP)

**Why NOT microservices at this stage:**
- Microservices add significant operational overhead (service discovery, distributed tracing, network latency)
- The team is likely small; a single deployable unit is easier to develop and debug
- A well-structured modular monolith can be split into microservices later when the need arises (traffic, team size, independent scaling)

**Why Modular Monolith:**
- Each business domain (clients, caregivers, bookings, payments, etc.) is a self-contained module
- Modules communicate through defined internal interfaces (not HTTP)
- The same codebase can be split into services later without rewriting business logic

### System Components

```
┌─────────────────────────────────────────────────────┐
│                   Public Internet                    │
└─────────────┬───────────────────────┬───────────────┘
              │                       │
    ┌─────────▼──────┐     ┌─────────▼──────────┐
    │  Public Website │     │   Web Application   │
    │  (Next.js SSR)  │     │  (Admin / Portals)  │
    └─────────┬──────┘     └──────────┬──────────┘
              │                       │
              └───────────┬───────────┘
                          │ HTTPS
              ┌───────────▼───────────┐
              │     API Gateway /     │
              │   Nginx Reverse Proxy │
              └───────────┬───────────┘
                          │
              ┌───────────▼───────────┐
              │    NestJS Backend     │
              │   (Modular Monolith)  │
              │                       │
              │  ┌──────────────────┐ │
              │  │  Auth Module     │ │
              │  │  Client Module   │ │
              │  │  Caregiver Module│ │
              │  │  Booking Module  │ │
              │  │  Schedule Module │ │
              │  │  Payment Module  │ │
              │  │  Notification    │ │
              │  │  Reporting       │ │
              │  │  Audit Module    │ │
              │  └──────────────────┘ │
              └───────────┬───────────┘
                          │
         ┌────────────────┼────────────────┐
         │                │                │
┌────────▼────┐  ┌────────▼────┐  ┌───────▼──────┐
│  PostgreSQL  │  │    Redis    │  │  Object Store │
│  (Primary   │  │   (Cache +  │  │  (Cloudflare  │
│   Database) │  │   Sessions) │  │     R2)       │
└─────────────┘  └─────────────┘  └──────────────┘
```

---

## G. Recommended Technology Stack

### Frontend — **Next.js 14 (App Router)**

| Why Next.js? |
|---|
| Server-Side Rendering (SSR) for the public website — critical for SEO |
| React Server Components reduce JS bundle size |
| API routes allow lightweight BFF (Backend for Frontend) patterns |
| Built-in image optimization |
| Strong TypeScript support |
| Large ecosystem and community |
| Single framework serves public site AND admin/portal apps |

- **Styling:** Tailwind CSS (utility-first, consistent design tokens)
- **State Management:** Zustand (lightweight) + React Query (server state)
- **Forms:** React Hook Form + Zod validation
- **Charts:** Recharts or Chart.js
- **UI Components:** Shadcn/ui (accessible, customizable)
- **i18n:** next-intl (supports Amharic later)

---

### Backend — **Node.js with NestJS**

| Why NestJS? |
|---|
| Opinionated, modular architecture maps directly to our module-per-domain design |
| Strong TypeScript support out of the box |
| Built-in dependency injection |
| Decorator-based (clean, readable code) |
| Guards, interceptors, pipes for security/validation |
| Excellent documentation and large community |
| Supports WebSockets for real-time notifications |
| Same language as frontend (TypeScript) — smaller team can work across both |

- **ORM:** Prisma (type-safe, excellent PostgreSQL support, migration tooling)
- **Validation:** class-validator + class-transformer
- **API Style:** REST (cleaner for mobile clients later; simpler than GraphQL for this use case)
- **API Versioning:** `/api/v1/...`

---

### Database — **PostgreSQL**

| Why PostgreSQL? |
|---|
| ACID compliant — critical for financial transactions |
| Row-level security for multi-tenant data isolation |
| Full-text search (reduces dependency on Elasticsearch for MVP) |
| JSON/JSONB columns for flexible metadata |
| Mature, battle-tested, widely hosted |
| Excellent Prisma support |

---

### Cache — **Redis**

- Session storage
- Rate limiting counters
- Frequently read data (service catalog, configurations)
- Background job queues (BullMQ)

---

### File Storage — **Cloudflare R2**

| Why R2 over AWS S3? |
|---|
| Zero egress fees — significant cost saving in Ethiopia's bandwidth context |
| S3-compatible API — easy migration to S3 if needed |
| Global CDN included |
| Simple pricing |

---

### Authentication — **Custom JWT + Refresh Token Rotation**

- Implemented inside NestJS (no third-party vendor lock-in)
- Access tokens: short-lived (15 min)
- Refresh tokens: long-lived (7-30 days), stored in HttpOnly cookies
- MFA: TOTP via `speakeasy` library
- Password hashing: `bcrypt` (cost factor ≥ 12)

---

### Queue / Background Jobs — **BullMQ (Redis-backed)**

- Email sending
- SMS sending
- PDF generation
- Report generation
- Notification dispatch
- Scheduled reminders

---

### Email — **Resend** (with Nodemailer fallback)

- Ethiopian context: Resend and similar transactional email providers work globally
- Supports custom domains (professional @astamami.com emails)

---

### SMS — **Africa's Talking** *(verify current Ethiopian availability)*

- Has an Ethiopian presence
- Supports local phone number formats
- Verify current API availability and pricing before committing
- Design SMS module behind an interface so the provider can be swapped

---

### Payments — **Chapa** *(Ethiopian payment gateway)*

- Chapa is a leading Ethiopian payment gateway
- Supports: Telebirr, CBE Birr, bank transfers, international cards
- Has a documented REST API
- Design payment module behind an interface (Strategy Pattern) so providers can be added (HelloCash, Stripe, etc.)

> [!WARNING]
> Verify Chapa's current API status, supported payment methods, and integration documentation before implementation begins. Do not assume any feature is available without testing.

---

### Hosting — **Hetzner Cloud** (Primary Recommendation)

| Why Hetzner? |
|---|
| Significantly cheaper than AWS/Azure/GCP for comparable specs |
| European data centers (GDPR-aligned practices) |
| Good uptime SLAs |
| Easy to scale vertically and horizontally |
| Suitable for a growing startup |

- **Alternative:** DigitalOcean (similar pricing, excellent developer experience)
- **Future:** AWS if the business scales to require global multi-region

---

### Monitoring & Observability

| Tool | Purpose |
|------|---------|
| **Sentry** | Error tracking (frontend + backend) |
| **Grafana + Prometheus** | Infrastructure & application metrics |
| **Logtail / Better Stack** | Centralized log management |
| **UptimeRobot** | Uptime monitoring & alerts |
| **PostHog** | Product analytics (privacy-friendly, self-hostable) |

---

### CI/CD — **GitHub Actions**

- Lint → Test → Build → Deploy pipeline
- Staging deployment on PR merge to `develop`
- Production deployment on merge to `main` (with approval gate)
- Database migrations run automatically in pipeline
- Secrets managed via GitHub Secrets + environment-specific `.env`

---

## H. Alternative Technology Options

| Layer | Our Choice | Alternative 1 | Alternative 2 | Decision Rationale |
|-------|-----------|---------------|---------------|-------------------|
| Frontend | Next.js | React (Vite) | Nuxt (Vue) | Next.js wins for SSR/SEO + single framework |
| Backend | NestJS | Express.js | Django (Python) | NestJS: better structure for large apps; same lang as FE |
| Database | PostgreSQL | MySQL | MongoDB | PostgreSQL: ACID + full-text search + row-level security |
| ORM | Prisma | TypeORM | Drizzle | Prisma: best DX, type safety, migration tooling |
| Cache | Redis | Memcached | In-memory | Redis: also handles queues and sessions |
| Storage | Cloudflare R2 | AWS S3 | Azure Blob | R2: zero egress cost, critical for Ethiopian context |
| Email | Resend | SendGrid | AWS SES | Resend: modern DX, competitive pricing |
| SMS | Africa's Talking | Twilio | Local provider | AT: Ethiopian presence; Twilio may have coverage gaps |
| Hosting | Hetzner | DigitalOcean | AWS | Hetzner: best value for startup budget |
| Payments | Chapa | HelloCash | Stripe (intl) | Chapa: local Ethiopian integration |

---

## I. Database Architecture (Core Entities)

### Core Tables

```
users                    roles                   permissions
─────────────            ──────────              ───────────────
id (PK)                  id (PK)                 id (PK)
email                    name                    name
password_hash            description             description
phone                    created_at              resource
is_active                                        action
is_email_verified        role_permissions        created_at
mfa_enabled              ─────────────
created_at               role_id (FK)
updated_at               permission_id (FK)      user_roles
                                                 ──────────
                                                 user_id (FK)
                                                 role_id (FK)
```

```
clients                  caregivers              caregiver_documents
───────────              ──────────              ───────────────────
id (PK)                  id (PK)                 id (PK)
user_id (FK)             user_id (FK)            caregiver_id (FK)
full_name                full_name               document_type
date_of_birth            photo_url               file_url
gender                   professional_role       verified
phone                    qualifications          expiry_date
email                    experience_years        uploaded_at
address                  skills[]                reviewed_by (FK)
emergency_contact        languages[]             reviewed_at
service_location         availability (JSONB)
care_requirements        service_areas[]
special_instructions     employment_status
status                   verification_status
created_at               created_at
```

```
services                 service_packages        pricing
────────                 ────────────────        ───────
id (PK)                  id (PK)                 id (PK)
name                     service_id (FK)         package_id (FK)
description              name                    duration_type
category                 description             unit_price
is_active                features[]              currency
created_at               is_active               discount
                         sort_order              tax_rate
                                                 effective_from
                                                 effective_to
```

```
bookings                 booking_items           care_assignments
────────                 ─────────────           ────────────────
id (PK)                  id (PK)                 id (PK)
reference_number         booking_id (FK)         booking_id (FK)
client_id (FK)           service_id (FK)         caregiver_id (FK)
status                   package_id (FK)         assigned_by (FK)
start_date               duration_type           assigned_at
end_date                 quantity                status
service_location         unit_price              start_date
notes                    total_price             end_date
created_by (FK)                                  notes
created_at               
```

```
schedules/shifts         care_plans              care_notes
────────────────         ──────────              ──────────
id (PK)                  id (PK)                 id (PK)
caregiver_id (FK)        client_id (FK)          booking_id (FK)
booking_id (FK)          booking_id (FK)         caregiver_id (FK)
start_datetime           version                 note_text
end_datetime             objectives              note_type
status                   instructions            is_sensitive
location                 emergency_info          created_at
notes                    review_date
                         status
                         created_by (FK)
```

```
invoices                 invoice_items           payments
────────                 ─────────────           ────────
id (PK)                  id (PK)                 id (PK)
invoice_number           invoice_id (FK)         invoice_id (FK)
client_id (FK)           description             amount
booking_id (FK)          quantity                currency
status                   unit_price              payment_method
subtotal                 total_price             provider
tax_amount               discount                provider_ref
discount_amount                                  status
total_amount                                     paid_at
amount_paid                                      notes
balance
due_date
issued_at
```

```
notifications            messages                incidents
─────────────            ────────                ─────────
id (PK)                  id (PK)                 id (PK)
user_id (FK)             sender_id (FK)          booking_id (FK)
type                     recipient_id (FK)       reported_by (FK)
title                    subject                 client_id (FK)
body                     body                    severity
channel                  is_read                 description
is_read                  sent_at                 status
sent_at                                          resolved_by (FK)
                                                 resolved_at
                                                 attachments[]

audit_logs
──────────
id (PK)
user_id (FK)
action
resource_type
resource_id
ip_address
previous_value (JSONB)
new_value (JSONB)
created_at
```

---

## J. API Architecture

**Base URL:** `https://api.astamami.com/api/v1`

**Authentication:** Bearer JWT in `Authorization` header. Refresh tokens in `HttpOnly` cookie.

### Key Endpoint Groups

```
Auth
  POST   /auth/register
  POST   /auth/login
  POST   /auth/logout
  POST   /auth/refresh
  POST   /auth/forgot-password
  POST   /auth/reset-password
  POST   /auth/verify-email
  POST   /auth/mfa/enable
  POST   /auth/mfa/verify

Clients
  GET    /clients
  POST   /clients
  GET    /clients/:id
  PATCH  /clients/:id
  DELETE /clients/:id
  GET    /clients/:id/bookings
  GET    /clients/:id/documents

Caregivers
  GET    /caregivers
  POST   /caregivers
  GET    /caregivers/:id
  PATCH  /caregivers/:id
  POST   /caregivers/:id/documents
  PATCH  /caregivers/:id/verification
  GET    /caregivers/:id/schedule

Bookings
  GET    /bookings
  POST   /bookings
  GET    /bookings/:id
  PATCH  /bookings/:id/status
  POST   /bookings/:id/assign-caregiver
  POST   /bookings/:id/cancel

Services
  GET    /services
  POST   /services
  GET    /services/:id
  PATCH  /services/:id
  GET    /services/:id/packages

Schedules
  GET    /schedules
  POST   /schedules/shifts
  GET    /schedules/caregiver/:id
  GET    /schedules/availability

Payments
  GET    /payments
  POST   /payments/initiate
  POST   /payments/webhook
  GET    /payments/:id

Invoices
  GET    /invoices
  POST   /invoices
  GET    /invoices/:id
  GET    /invoices/:id/pdf

Reports
  GET    /reports/operations
  GET    /reports/financial
  GET    /reports/caregivers
  GET    /reports/clients

Admin
  GET    /admin/dashboard
  GET    /admin/audit-logs
  GET    /admin/settings
  PATCH  /admin/settings
```

---

## K. Application Modules

| Module | Responsibility |
|--------|---------------|
| **Auth** | Registration, login, MFA, JWT, session management, password reset |
| **Users** | User CRUD, role assignment, profile management |
| **Clients** | Client lifecycle, profiles, documents, family members |
| **Caregivers** | Profiles, verification workflow, availability, status management |
| **Services** | Service catalog, packages, pricing configuration |
| **Bookings** | Booking lifecycle, state machine, conflict detection |
| **Assignments** | Caregiver-to-booking matching and assignment |
| **Scheduling** | Shift management, calendar views, conflict detection |
| **Care Plans** | Versioned care plans, instructions, goals |
| **Service Delivery** | Shift check-in/out, care notes, task logs |
| **Incidents** | Incident reporting, review workflow, resolution |
| **Payments** | Payment initiation, provider integration, webhook handling |
| **Invoicing** | Invoice generation, PDF export, receipt management |
| **Notifications** | Multi-channel notification dispatch (email, SMS, in-app) |
| **Messaging** | Controlled internal messaging between roles |
| **Documents** | Secure file upload, access control, audit logging |
| **Reporting** | Pre-built and filterable reports, CSV/PDF export |
| **Audit** | Tamper-resistant action logging |
| **Configuration** | Admin-managed settings, roles, notification templates |
| **Public Website** | SEO-optimized Next.js pages with booking entry point |

---

## L. User Journeys

### 1. Client Books a Service (Public)

```
Public Website → Select Service → Select Package → Select Duration
  → Provide Start Date → Provide Service Location → Enter Client Info
  → Review Booking → Create Account / Login → Payment / Arrangement
  → Booking Confirmation → Email/SMS Confirmation
```

### 2. Admin Assigns Caregiver

```
Admin Dashboard → Pending Bookings → Select Booking
  → View Matched Caregivers (availability, skills, location)
  → Select Caregiver → Assign → System Creates Shift
  → Caregiver Notified → Client Notified → Booking Status: Caregiver Assigned
```

### 3. Caregiver Verification

```
HR Creates Profile → Caregiver Uploads Documents
  → Status: Pending Verification → HR Reviews Documents
  → Status: Under Review → HR Approves / Rejects
  → Status: Active / Rejected → Admin Notified
  → Caregiver Now Eligible for Assignment
```

### 4. Service Delivery

```
Caregiver Portal → Today's Shifts → Select Shift → Start Shift (GPS timestamp)
  → Record Care Notes → Complete Tasks → Flag Issues / Incidents
  → End Shift → Submit Handover Notes → Status: Completed
  → Care Coordinator Notified
```

### 5. Payment & Invoicing

```
Booking Confirmed → Invoice Auto-Generated
  → Client Notified → Client Portal → View Invoice
  → Select Payment Method → Chapa Payment Gateway
  → Payment Confirmed → Receipt Generated → Invoice Status: Paid
```

---

## M. MVP Scope (Phase 1)

> [!IMPORTANT]
> The MVP must be functional enough for real operations — not a demo. Focus on the core business loop: **Book → Assign → Deliver → Invoice → Pay**.

### ✅ MVP Includes

- Public website (Home, Services, About, Contact, Booking entry)
- Client registration & login
- Caregiver registration & verification workflow
- Admin dashboard (core KPIs)
- Service catalog (admin-configurable)
- Full booking lifecycle
- Caregiver assignment (manual)
- Basic scheduling (shift management)
- Invoice generation & PDF export
- Chapa payment integration (verify first)
- Email notifications (booking, assignment, payment)
- Client portal (bookings, invoices, profile)
- Caregiver portal (schedule, care instructions)
- Role-based access control
- Audit logging
- Document upload (caregiver documents)

### ❌ MVP Excludes (Phase 2+)

- Advanced AI-assisted caregiver matching
- SMS notifications (add after MVP)
- In-app real-time messaging
- Advanced reporting & analytics
- Mobile native apps
- Multi-language (Amharic)
- Incident management (Phase 2)
- Care plan versioning (Phase 2)
- Family member portal (Phase 2)
- Blog/Resources section

---

## N. Phase 2 & Phase 3

### Phase 2 — Operations Depth
- SMS notifications (Africa's Talking)
- In-app messaging
- Incident management module
- Care plan versioning & history
- Advanced scheduling (conflict auto-detection)
- Family member/authorized contact portal
- Advanced admin reporting (CSV/PDF export)
- Caregiver performance tracking

### Phase 3 — Growth & Intelligence
- AI-assisted caregiver matching
- Automated scheduling suggestions
- Document classification (AI)
- Report summarization (AI)
- Multi-language support (Amharic)
- Native mobile app (React Native consuming same API)
- Multi-branch / multi-organization support
- Advanced analytics & business intelligence

---

## O. Security Architecture

| Layer | Controls |
|-------|---------|
| **Transport** | HTTPS/TLS everywhere; HSTS headers |
| **Authentication** | JWT + refresh tokens; MFA (TOTP); bcrypt hashing |
| **Authorization** | Guard-based RBAC on every API route; resource-level checks |
| **Input Validation** | Server-side validation on all inputs (Zod/class-validator) |
| **XSS Prevention** | Content Security Policy headers; output encoding |
| **CSRF Prevention** | SameSite cookies; CSRF token for state-changing operations |
| **SQL Injection** | Prisma parameterized queries (no raw SQL without sanitization) |
| **File Uploads** | Type validation; size limits; malware scanning (ClamAV or cloud) |
| **Rate Limiting** | Per-IP and per-user limits on all endpoints |
| **Session Security** | HttpOnly, Secure, SameSite cookies; token rotation |
| **Data Encryption** | Sensitive fields encrypted at rest (AES-256) |
| **Secrets** | Environment variables only; never in code or Git |
| **Audit Trail** | Tamper-resistant logs for all sensitive operations |
| **Account Protection** | Login attempt lockout; suspicious activity alerts |

---

## P. Ethiopian Context

| Consideration | Details |
|--------------|---------|
| **Currency** | Ethiopian Birr (ETB); display with proper formatting |
| **Timezone** | Africa/Addis_Ababa (EAT, UTC+3) |
| **Phone Format** | +251XXXXXXXXX; validate Ethiopian phone numbers |
| **Payment Gateway** | Chapa (primary); verify HelloCash availability |
| **SMS Provider** | Africa's Talking (verify Ethiopian coverage & pricing) |
| **Address Format** | No standardized postal system; use city + sub-city + woreda + description |
| **Internet Connectivity** | Design for lower bandwidth; optimize images; use CDN |
| **Regulations** | Research Ethiopian health data protection laws before storing sensitive clinical data |
| **Hosting** | Hetzner (EU) preferred initially; evaluate local hosting only if regulations require |
| **Amharic** | Architecture must support RTL-adjacent i18n; plan for Amharic font (Noto Sans Ethiopic) |

---

## Q. Development Phases & Complexity

| Phase | Name | Complexity | Description |
|-------|------|-----------|-------------|
| **0** | Discovery & Architecture | 🟡 Medium | Requirements, ERD, API design, tech setup |
| **1** | Foundation | 🟡 Medium | Repo setup, CI/CD, DB, migrations, auth |
| **2** | Core Business | 🔴 High | Clients, caregivers, services, bookings |
| **3** | Scheduling | 🔴 High | Shifts, assignments, conflict detection |
| **4** | Finance | 🔴 High | Invoices, payments, Chapa integration |
| **5** | Portals | 🟡 Medium | Client & caregiver portals |
| **6** | Operations | 🟡 Medium | Care plans, service delivery, incidents |
| **7** | Notifications | 🟢 Lower | Email, SMS, in-app |
| **8** | Reporting | 🟡 Medium | Analytics, report generation, PDF/CSV |
| **9** | Security & QA | 🔴 High | Security hardening, testing, auditing |
| **10** | Production | 🟡 Medium | Deployment, monitoring, backups, DNS |

> [!NOTE]
> Do NOT attach calendar timelines to these phases without a team composition, working hours, and scope confirmation. Rushing phases to meet unrealistic deadlines produces security vulnerabilities and technical debt.

---

## R. Development Risks

| Risk | Category | Severity | Mitigation |
|------|---------|---------|-----------|
| Chapa API limitations or instability | Technical | 🔴 High | Build payment module behind interface; test early; have fallback plan |
| Africa's Talking SMS coverage gaps | Technical | 🟡 Medium | Verify before committing; design SMS as pluggable |
| Healthcare data regulation uncertainty (Ethiopia) | Legal | 🔴 High | Consult legal counsel before storing clinical data |
| Caregiver portal mobile performance on low-end devices | Technical | 🟡 Medium | Test on real devices; optimize for 3G |
| Internet reliability affecting real-time features | Operational | 🟡 Medium | Offline-tolerant design for caregiver portal |
| Scope creep (adding training features) | Business | 🔴 High | Strictly enforce scope restriction from document |
| RBAC complexity leading to authorization holes | Security | 🔴 High | Comprehensive permission testing; security audit |
| Data loss without proper backup strategy | Operational | 🔴 High | Automated daily backups from day one |
| Developer team unfamiliarity with NestJS | Technical | 🟡 Medium | Training / starter template preparation |
| Future AI features creating liability | Business/Legal | 🟡 Medium | AI must never make independent care decisions |

---

## S. Open Questions for Owner Decision

These require **your business input** before implementation:

1. **Payment arrangement:** Can clients request services without paying upfront? If yes, define the deposit rules.
2. **Caregiver pay:** Does the system need to calculate and manage caregiver wages/payroll, or is that handled externally?
3. **Service areas:** Is Astamami limited to Addis Ababa initially, or multiple Ethiopian cities?
4. **Family member portal:** Is this in-scope for MVP or Phase 2?
5. **Client-caregiver communication:** Are clients allowed to directly message their assigned caregiver, or only through a coordinator?
6. **Caregiver self-registration:** Can caregivers register themselves online, or only admin-created?
7. **Data retention:** How long should client records be retained after service ends?
8. **Custom domain:** Is the email domain `@astamami.com` already set up for transactional emails?
9. **Regulatory:** Has any Ethiopian legal counsel reviewed data storage of health-related client information?
10. **Branding:** Is the color/font system in the document final, or open to recommendations?

---

## T. Recommended Next Steps (Before Implementation)

> [!IMPORTANT]
> Approve the following before writing any application code:

1. ✅ **Confirm this strategy document** — Review and approve the architecture, tech stack, and MVP scope
2. 🔲 **Answer the open questions above** — These affect database design and module behavior
3. 🔲 **Verify Chapa integration** — Create a test account and confirm API capabilities
4. 🔲 **Verify Africa's Talking SMS** — Confirm Ethiopian coverage and pricing
5. 🔲 **Legal review** — Brief consultation on Ethiopian health data regulations
6. 🔲 **Approve the ERD** — Review and approve the database model before it's built
7. 🔲 **Repository setup** — Initialize GitHub repository with the agreed structure
8. 🔲 **Begin Phase 1: Foundation** — Environment, CI/CD, database, authentication

---

## Repository Structure

```
astamami/
├── frontend/               # Next.js application (public site + portals)
│   ├── app/                # App Router pages
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities, API client
│   └── public/             # Static assets
├── backend/                # NestJS API
│   ├── src/
│   │   ├── modules/        # Business modules (auth, clients, bookings, etc.)
│   │   ├── common/         # Shared decorators, guards, pipes
│   │   ├── config/         # Environment configuration
│   │   └── main.ts
│   └── prisma/             # Schema and migrations
├── docs/                   # Technical documentation
├── tests/                  # E2E tests
├── scripts/                # Database seed, deploy scripts
├── .github/                # GitHub Actions workflows
├── docker/                 # Docker Compose files
└── README.md
```

---

*Document prepared for Astamami Healthcare Solutions — Care Alliance Division*  
*Architecture version: 1.0 | Status: Awaiting Owner Approval*
