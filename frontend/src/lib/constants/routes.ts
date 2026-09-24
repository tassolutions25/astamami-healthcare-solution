export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  ABOUT: '/about',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Portals
  ADMIN: {
    DASHBOARD: '/admin',
    CLIENTS: '/admin/clients',
    CAREGIVERS: '/admin/caregivers',
    BOOKINGS: '/admin/bookings',
    SCHEDULES: '/admin/schedules',
    INVOICES: '/admin/invoices',
    INCIDENTS: '/admin/incidents',
    REPORTS: '/admin/reports',
  },
  CLIENT: {
    DASHBOARD: '/client',
    BOOKINGS: '/client/bookings',
    CARE_PLAN: '/client/care-plan',
    INVOICES: '/client/invoices',
    NEW_BOOKING: '/client/book',
  },
  CAREGIVER: {
    DASHBOARD: '/caregiver',
    SHIFTS: '/caregiver/shifts',
    VISIT_NOTES: '/caregiver/notes',
    PROFILE: '/caregiver/profile',
  },
} as const;
