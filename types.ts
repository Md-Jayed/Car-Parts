
export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  compatibility: {
    make: string[];
    model: string[];
    years: number[];
    series?: string[];
  };
  condition: 'New' | 'Refurbished' | 'Used';
  availability: 'In Stock' | 'Pre-order' | 'Special Order';
  description: string;
  specifications: Record<string, string>;
  difficulty: 'Easy' | 'Moderate' | 'Advanced';
  performanceLevel: 'Standard' | 'High Performance' | 'Racing';
}

export interface FilterState {
  manufacturer: string;
  series: string;
  model: string;
  year: string;
  performance: string[];
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  condition: string[];
  availability: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  nickname?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
