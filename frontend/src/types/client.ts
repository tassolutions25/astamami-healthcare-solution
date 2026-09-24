export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  isPrimary: boolean;
}

export interface Client {
  id: string;
  userId: string;
  fullName: string;
  phone?: string;
  email?: string;
  address?: string;
  city?: string;
  subCity?: string;
  emergencyContacts?: EmergencyContact[];
}
