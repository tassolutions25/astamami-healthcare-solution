export type UserRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'COORDINATOR'
  | 'CAREGIVER'
  | 'CLIENT'
  | 'FAMILY_MEMBER';

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface User {
  id: string;
  email: string;
  phone?: string;
  status: UserStatus;
  isActive: boolean;
  isEmailVerified: boolean;
  roles: string[];
  client?: any;
  caregiver?: any;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthSession {
  user: User;
  token: string;
}
