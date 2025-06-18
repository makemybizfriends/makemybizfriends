
// Mock data for products and vendors
export interface Vendor {
  id: string;
  name: string;
  logo: string;
  location: string;
  rating: number;
  verified: boolean;
  description: string;
  contact: {
    email: string;
    phone: string;
    website: string;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  vendor: Vendor;
  specs: { [key: string]: string };
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "TechSolutions Pro",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
    location: "San Francisco, CA",
    rating: 4.9,
    verified: true,
    description: "Leading provider of enterprise software solutions and hardware components with over 15 years of experience in the technology sector.",
    contact: {
      email: "contact@techsolutions.com",
      phone: "+1 (555) 123-4567",
      website: "www.techsolutions.com"
    }
  },
  {
    id: "2",
    name: "Global Manufacturing Co",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop",
    location: "Houston, TX",
    rating: 4.8,
    verified: true,
    description: "Premium industrial equipment and manufacturing solutions serving businesses worldwide with cutting-edge technology.",
    contact: {
      email: "sales@globalmanufacturing.com",
      phone: "+1 (555) 987-6543",
      website: "www.globalmanufacturing.com"
    }
  }
];

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "Electronics & Software",
    description: "Latest technology solutions for modern businesses",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop",
    productCount: 450
  },
  {
    id: "2",
    name: "Industrial Equipment",
    description: "Heavy machinery and industrial tools",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    productCount: 320
  },
  {
    id: "3",
    name: "Office Supplies",
    description: "Everything you need for your workspace",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop",
    productCount: 680
  },
  {
    id: "4",
    name: "Medical Equipment",
    description: "Advanced healthcare technology solutions",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
    productCount: 200
  }
];

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "Enterprise Laptop Pro Max",
    shortDescription: "High-performance laptop designed for business professionals",
    description: "The Enterprise Laptop Pro Max features cutting-edge technology with Intel i7 processor, 32GB RAM, and 1TB SSD storage. Perfect for demanding business applications and multitasking. Built with premium materials and backed by comprehensive warranty support.",
    price: 2499,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop",
    category: "Electronics & Software",
    vendor: mockVendors[0],
    specs: {
      "Processor": "Intel Core i7-12700H",
      "RAM": "32GB DDR4",
      "Storage": "1TB NVMe SSD",
      "Display": "15.6\" 4K UHD",
      "Graphics": "NVIDIA RTX 3060",
      "Battery": "10+ hours",
      "Weight": "4.2 lbs",
      "Warranty": "3 years"
    },
    inStock: true
  },
  {
    id: "2",
    title: "Industrial CNC Machine X200",
    shortDescription: "Precision manufacturing equipment for industrial production",
    description: "State-of-the-art CNC machine designed for high-precision manufacturing. Features advanced automation, quality control systems, and exceptional durability. Ideal for automotive, aerospace, and precision manufacturing industries.",
    price: 85000,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    category: "Industrial Equipment",
    vendor: mockVendors[1],
    specs: {
      "Work Area": "800 x 400 x 300mm",
      "Spindle Speed": "24,000 RPM",
      "Positioning Accuracy": "±0.005mm",
      "Tool Changer": "20 tools",
      "Control System": "Fanuc 0i-MF",
      "Power": "15kW",
      "Weight": "3,500 kg",
      "Warranty": "2 years"
    },
    inStock: true
  },
  {
    id: "3",
    title: "Smart Office Desk System",
    shortDescription: "Height-adjustable smart desk with built-in technology",
    description: "Revolutionary office desk system with height adjustment, wireless charging, USB-C ports, and smart lighting. Designed to enhance productivity and comfort in modern workspaces.",
    price: 1299,
    currency: "USD",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop",
    category: "Office Supplies",
    vendor: mockVendors[0],
    specs: {
      "Dimensions": "60\" x 30\"",
      "Height Range": "28\" - 48\"",
      "Weight Capacity": "300 lbs",
      "Power": "Wireless charging + 4 USB-C",
      "Material": "Bamboo top, steel frame",
      "Controls": "App-controlled",
      "Warranty": "5 years"
    },
    inStock: true
  }
];
