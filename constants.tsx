
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Performance Ceramic Brake Pads - Front Set',
    category: 'Brakes',
    subCategory: 'Brake Pads',
    brand: 'StopTech',
    price: 89.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Toyota', 'Honda', 'Ford'],
      model: ['Camry', 'Civic', 'F-150'],
      years: [2018, 2019, 2020, 2021, 2022],
      series: ['Sport', 'TRD']
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'High-performance ceramic brake pads designed for maximum stopping power and low dust generation.',
    specifications: {
      'Material': 'Ceramic',
      'Position': 'Front',
      'Warranty': '2 Years'
    },
    difficulty: 'Moderate',
    performanceLevel: 'High Performance'
  },
  {
    id: '2',
    name: 'Full Synthetic 5W-30 Motor Oil - 5 Quart',
    category: 'Engine',
    subCategory: 'Oil & Filters',
    brand: 'Mobil 1',
    price: 34.50,
    rating: 4.9,
    reviews: 2150,
    image: 'https://images.unsplash.com/photo-1635832626458-71e80816828f?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Any'],
      model: ['Any'],
      years: Array.from({length: 30}, (_, i) => 1995 + i)
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Mobil 1 High Mileage full synthetic motor oil 5W-30 is designed for engines with over 75,000 miles.',
    specifications: {
      'Viscosity': '5W-30',
      'Volume': '5 Quarts',
      'Type': 'Full Synthetic'
    },
    difficulty: 'Easy',
    performanceLevel: 'Standard'
  },
  {
    id: '3',
    name: 'Iridium IX Spark Plug',
    category: 'Engine',
    subCategory: 'Ignition',
    brand: 'NGK',
    price: 12.99,
    rating: 4.7,
    reviews: 562,
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Nissan', 'Honda', 'Mazda'],
      model: ['Altima', 'Accord', 'CX-5'],
      years: [2015, 2016, 2017, 2018, 2019, 2020]
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Designed specifically for the performance enthusiast. Iridium IX offers extreme ignitability.',
    specifications: {
      'Material': 'Iridium',
      'Gap Size': '0.044"',
      'Heat Range': '6'
    },
    difficulty: 'Moderate',
    performanceLevel: 'High Performance'
  },
  {
    id: '4',
    name: 'Bilstein B6 Performance Shock Absorber',
    category: 'Suspension',
    subCategory: 'Shocks & Struts',
    brand: 'Bilstein',
    price: 145.00,
    rating: 4.9,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1599256629825-8291ff9742e0?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['BMW', 'Audi', 'Mercedes'],
      model: ['3 Series', 'A4', 'C-Class'],
      years: [2012, 2013, 2014, 2015, 2016],
      series: ['M-Sport', 'S-Line']
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'The perfect choice for those who want to improve their vehicle’s handling without lowering it.',
    specifications: {
      'Position': 'Rear',
      'Construction': 'Monotube',
      'Damping': 'High Pressure'
    },
    difficulty: 'Advanced',
    performanceLevel: 'High Performance'
  },
  {
    id: '5',
    name: 'Platinum AGM Power Battery',
    category: 'Electrical',
    subCategory: 'Batteries',
    brand: 'DieHard',
    price: 219.99,
    rating: 4.8,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Ford', 'Chevrolet', 'Dodge'],
      model: ['F-150', 'Silverado', 'Ram 1500'],
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022]
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Absorbent Glass Mat (AGM) technology for superior starting power and 2x the cycle life.',
    specifications: {
      'Voltage': '12V',
      'Cold Cranking Amps': '850 CCA',
      'Warranty': '3 Years'
    },
    difficulty: 'Easy',
    performanceLevel: 'High Performance'
  },
  {
    id: '6',
    name: 'High-Output 160A Alternator',
    category: 'Electrical',
    subCategory: 'Charging',
    brand: 'Bosch',
    price: 189.50,
    rating: 4.6,
    reviews: 115,
    image: 'https://images.unsplash.com/photo-1621415124040-42f2052f6b28?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['BMW', 'Mercedes', 'Audi'],
      model: ['5 Series', 'E-Class', 'A6'],
      years: [2010, 2011, 2012, 2013, 2014, 2015]
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Premium Bosch alternator providing stable power supply for vehicles with high electrical loads.',
    specifications: {
      'Amperage': '160A',
      'Voltage': '14V',
      'Rotation': 'Clockwise'
    },
    difficulty: 'Moderate',
    performanceLevel: 'Standard'
  },
  {
    id: '7',
    name: 'Aluminum Dual-Core Radiator',
    category: 'Engine',
    subCategory: 'Cooling',
    brand: 'Mishimoto',
    price: 325.00,
    rating: 4.9,
    reviews: 76,
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Toyota', 'Subaru', 'Nissan'],
      model: ['Supra', 'WRX STI', '370Z'],
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021],
      series: ['Sport', 'TRD', 'Nismo']
    },
    condition: 'New',
    availability: 'Special Order',
    description: 'Full aluminum radiator designed for maximum cooling efficiency for modified and racing engines.',
    specifications: {
      'Material': 'Aluminum',
      'Cores': 'Dual',
      'Inlet Size': '1.38"'
    },
    difficulty: 'Advanced',
    performanceLevel: 'Racing'
  },
  {
    id: '8',
    name: 'Black Housing Projector Headlights',
    category: 'Body Parts',
    subCategory: 'Lighting',
    brand: 'Spyder',
    price: 249.00,
    rating: 4.5,
    reviews: 184,
    image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Honda', 'Nissan'],
      model: ['Civic', 'Altima'],
      years: [2016, 2017, 2018, 2019],
      series: ['Standard', 'Sport']
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Aggressive black housing with clear lenses and projector beams for improved visibility.',
    specifications: {
      'Housing': 'Black',
      'Lens': 'Clear',
      'Bulb Type': 'H1 High / H7 Low'
    },
    difficulty: 'Moderate',
    performanceLevel: 'Standard'
  },
  {
    id: '9',
    name: 'Stainless Steel Cat-Back Exhaust System',
    category: 'Engine',
    subCategory: 'Exhaust',
    brand: 'MagnaFlow',
    price: 845.00,
    rating: 4.9,
    reviews: 52,
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Ford', 'Chevrolet'],
      model: ['Mustang', 'Camaro'],
      years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      series: ['GT', 'SS']
    },
    condition: 'New',
    availability: 'Pre-order',
    description: 'Performance-tuned exhaust note with increased flow and horsepower gains.',
    specifications: {
      'Material': 'Stainless Steel',
      'Pipe Diameter': '3.0"',
      'Tip Exit': 'Rear Dual'
    },
    difficulty: 'Advanced',
    performanceLevel: 'Racing'
  },
  {
    id: '10',
    name: 'HEPA Premium Cabin Air Filter',
    category: 'Interior',
    subCategory: 'Air Filtration',
    brand: 'K&N',
    price: 49.99,
    rating: 4.7,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Any'],
      model: ['Any'],
      years: Array.from({length: 20}, (_, i) => 2005 + i)
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Washable and reusable cabin filter that traps 99% of dust, pollen, and contaminants.',
    specifications: {
      'Media': 'HEPA Synthetic',
      'Life Span': 'Lifetime (Washable)',
      'Installation Time': '5 Mins'
    },
    difficulty: 'Easy',
    performanceLevel: 'Standard'
  },
  {
    id: '11',
    name: 'Heavy Duty Front Control Arm',
    category: 'Suspension',
    subCategory: 'Control Arms',
    brand: 'Moog',
    price: 115.00,
    rating: 4.8,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516905?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Toyota', 'Lexus'],
      model: ['Camry', 'ES350'],
      years: [2012, 2013, 2014, 2015, 2016, 2017]
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Enhanced metallurgy and design for extended part life and improved steering response.',
    specifications: {
      'Position': 'Front Left Lower',
      'Bushings': 'Rubber',
      'Ball Joint Included': 'Yes'
    },
    difficulty: 'Moderate',
    performanceLevel: 'Standard'
  },
  {
    id: '12',
    name: 'High-Flow Cold Air Intake System',
    category: 'Engine',
    subCategory: 'Intake',
    brand: 'AEM',
    price: 312.00,
    rating: 4.7,
    reviews: 95,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Mazda', 'Toyota'],
      model: ['MX-5 Miata', '86'],
      years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
      series: ['Sport', 'Club']
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Designed to produce horsepower and torque gains by replacing your vehicle\'s factory air filter and intake housing.',
    specifications: {
      'Filter Color': 'Red',
      'Tube Material': 'Aluminum',
      'Est. HP Gain': '8.5 HP'
    },
    difficulty: 'Moderate',
    performanceLevel: 'High Performance'
  },
  {
    id: '13',
    name: 'Cross-Drilled and Slotted Brake Rotors',
    category: 'Brakes',
    subCategory: 'Rotors',
    brand: 'PowerStop',
    price: 156.00,
    rating: 4.9,
    reviews: 210,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Chevrolet', 'GMC'],
      model: ['Tahoe', 'Yukon'],
      years: [2015, 2016, 2017, 2018, 2019, 2020]
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Precision-drilled holes for maximum cooling and rounded slots to wipe away gas and debris.',
    specifications: {
      'Finish': 'Silver Zinc Plated',
      'Position': 'Front Pair',
      'Vane Style': 'Vented'
    },
    difficulty: 'Moderate',
    performanceLevel: 'High Performance'
  },
  {
    id: '14',
    name: 'Custom Fit Floor Liners - Set',
    category: 'Interior',
    subCategory: 'Floor Mats',
    brand: 'WeatherTech',
    price: 179.99,
    rating: 4.9,
    reviews: 1540,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=600',
    compatibility: {
      make: ['Any'],
      model: ['Any'],
      years: Array.from({length: 15}, (_, i) => 2010 + i)
    },
    condition: 'New',
    availability: 'In Stock',
    description: 'Laser-measured floor liners that provide complete footwell protection from mud, snow, and spills.',
    specifications: {
      'Material': 'TPE',
      'Coverage': '1st & 2nd Row',
      'Color': 'Black'
    },
    difficulty: 'Easy',
    performanceLevel: 'Standard'
  }
];

export const CATEGORIES = [
  'Engine', 'Brakes', 'Suspension', 'Electrical', 'Body Parts', 'Interior', 'Wheels & Tires'
];

export const MAKES = ['Toyota', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'BMW', 'Mercedes', 'Audi', 'Tesla'];

export const MODELS_BY_MAKE: Record<string, string[]> = {
  'Toyota': ['Camry', 'Corolla', 'RAV4', 'Tacoma', 'Tundra', 'Supra', '86'],
  'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
  'Ford': ['F-150', 'Mustang', 'Explorer', 'Focus', 'Escape'],
  'BMW': ['3 Series', '5 Series', 'X5', 'M3'],
  'Chevrolet': ['Silverado', 'Tahoe', 'Camaro'],
  'Nissan': ['Altima', '370Z'],
  'Mazda': ['MX-5 Miata', 'CX-5'],
  'Dodge': ['Ram 1500', 'Charger'],
};

export const SERIES_BY_MAKE: Record<string, string[]> = {
  'Toyota': ['Standard', 'L', 'LE', 'XLE', 'SE', 'XSE', 'TRD'],
  'Honda': ['Standard', 'LX', 'EX', 'EX-L', 'Touring', 'Sport', 'Type R'],
  'BMW': ['Standard', 'Base', 'Luxury Line', 'Sport Line', 'M Sport'],
};

export const PERFORMANCE_LEVELS = ['Standard', 'High Performance', 'Racing'];
