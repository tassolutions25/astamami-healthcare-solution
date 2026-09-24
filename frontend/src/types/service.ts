export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName?: string;
  services?: Service[];
}

export interface Service {
  id: string;
  categoryId: string;
  category?: ServiceCategory;
  name: string;
  slug: string;
  description?: string;
  basePricePerHour: number;
  basePricePerDay?: number;
  basePricePerMonth?: number;
  isActive: boolean;
}
