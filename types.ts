
export enum PropertyType {
  HOUSE = 'House',
  APARTMENT = 'Apartment',
  STUDIO = 'Studio',
  VILLA = 'Villa'
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPremium: boolean;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  type: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number; // in sqm
  description: string;
  images: string[];
  sellerName: string;
  sellerPhone: string;
  listedAt: Date;
  isPremium?: boolean;
}

export type FilterState = {
  city: string;
  minPrice: number;
  maxPrice: number;
  type: PropertyType | 'All';
  minBedrooms: number;
}
