import { Service } from './service';

export type BookingStatus =
  | 'DRAFT'
  | 'REQUESTED'
  | 'PENDING_REVIEW'
  | 'AWAITING_PAYMENT'
  | 'CONFIRMED'
  | 'CAREGIVER_ASSIGNMENT_PENDING'
  | 'CAREGIVER_ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'REJECTED';

export type DurationType = 'HOURLY' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM';

export interface Booking {
  id: string;
  bookingNumber: string;
  clientId: string;
  client?: any;
  serviceId: string;
  service?: Service;
  caregiverId?: string;
  caregiver?: any;
  status: BookingStatus;
  durationType: DurationType;
  startDate: string;
  endDate?: string;
  totalHours: number;
  estimatedCost: number;
  specialNotes?: string;
  createdAt: string;
  updatedAt: string;
}
