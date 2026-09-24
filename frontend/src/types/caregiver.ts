export type CaregiverStatus =
  | 'PENDING_VERIFICATION'
  | 'UNDER_REVIEW'
  | 'ACTIVE'
  | 'ON_LEAVE'
  | 'TEMPORARILY_UNAVAILABLE'
  | 'SUSPENDED'
  | 'INACTIVE';

export interface Caregiver {
  id: string;
  userId: string;
  fullName: string;
  phone?: string;
  email?: string;
  status: CaregiverStatus;
  qualificationLevel?: string; // NURSE, HEALTH_ASSISTANT, CAREGIVER
  yearsOfExperience: number;
  hourlyRate: number;
  bio?: string;
  skills: string[];
  languages: string[];
  serviceAreas: string[];
  rating: number;
  totalReviews: number;
  completedVisitsCount: number;
}
