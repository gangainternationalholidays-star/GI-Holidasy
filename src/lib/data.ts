// Unified Data Store for Ganga International Holidays
// This will serve as our single source of truth and eventually sync with Firebase

export interface Package {
  id: string;
  name: string;
  destination: string;
  category: 'Basic' | 'Premium' | 'Luxury';
  region: 'Domestic' | 'International';
  duration: string;
  priceCustomer: number;
  priceAgent: number;
  priceB2B: number; // Net rate
  description: string;
  itinerary: string[];
  inclusions: string[];
  images: string[];
  availability: 'High' | 'Medium' | 'Limited';
  isHot: boolean;
}

export const packages: Package[] = [
  // --- DOMESTIC - BASIC ---
  {
    id: "pkg-in-b-001",
    name: "Srinagar & Pahalgam Escape",
    destination: "Kashmir",
    category: "Basic",
    region: "Domestic",
    duration: "5 Nights / 6 Days",
    priceCustomer: 18500,
    priceAgent: 16500,
    priceB2B: 14450,
    description: "Explore the dal lake and scenic valleys of Pahalgam.",
    itinerary: ["Srinagar Arrival", "Gulmarg Day Trip", "Pahalgam Stay", "Srinagar Local"],
    inclusions: ["Breakfast", "SUV Transfers", "Dal Lake Shikara"],
    images: ["https://images.unsplash.com/photo-1566833925222-f66304672681?q=80&w=800&auto=format&fit=crop"],
    availability: "High",
    isHot: true
  },
  {
    id: "pkg-in-b-002",
    name: "Golden Temple & Wagah",
    destination: "Amritsar",
    category: "Basic",
    region: "Domestic",
    duration: "2 Nights / 3 Days",
    priceCustomer: 9500,
    priceAgent: 8500,
    priceB2B: 7200,
    description: "Spiritual journey to the Golden Temple and the patriotic Wagah border.",
    itinerary: ["Amritsar Arrival", "Golden Temple Visit", "Wagah Border", "Departure"],
    inclusions: ["Hotel Stay", "Private Car", "Daily Breakfast"],
    images: ["https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=800&auto=format&fit=crop"],
    availability: "High",
    isHot: false
  },
  // --- DOMESTIC - PREMIUM ---
  {
    id: "pkg-in-p-001",
    name: "Royal Kerala Indulgence",
    destination: "Kerala",
    category: "Premium",
    region: "Domestic",
    duration: "6 Nights / 7 Days",
    priceCustomer: 42000,
    priceAgent: 38000,
    priceB2B: 35000,
    description: "Luxury houseboats and premium hill resorts in Munnar.",
    itinerary: ["Cochin Arrival", "Munnar Hills", "Thekkady Wildlife", "Alleppey Houseboat"],
    inclusions: ["4-Star Resorts", "All Meals", "Premium SUV"],
    images: ["https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=800&auto=format&fit=crop"],
    availability: "Medium",
    isHot: true
  },
  // --- INTERNATIONAL - PREMIUM ---
  {
    id: "pkg-int-p-001",
    name: "Dubai Skyline Special",
    destination: "Dubai",
    category: "Premium",
    region: "International",
    duration: "4 Nights / 5 Days",
    priceCustomer: 28000,
    priceAgent: 24000,
    priceB2B: 21800,
    description: "Modern Dubai with desert safari and dhow cruise.",
    itinerary: ["Dubai Arrival", "City Tour", "Desert Safari", "Burj Khalifa & Mall"],
    inclusions: ["4-Star Hotel", "Dhow Cruise Dinner", "Visa Assistance"],
    images: ["https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop"],
    availability: "High",
    isHot: true
  },
];

// Add more dummy data to fulfill "10-20 packages per category"
for (let i = 0; i < 15; i++) {
  packages.push({
    id: `pkg-gen-${i}`,
    name: `Sample Destination ${i + 1}`,
    destination: i % 2 === 0 ? "Domestic" : "International",
    category: i % 3 === 0 ? "Basic" : (i % 3 === 1 ? "Premium" : "Luxury"),
    region: i % 2 === 0 ? "Domestic" : "International",
    duration: "4 Nights / 5 Days",
    priceCustomer: 25000 + (i * 1000),
    priceAgent: 22000 + (i * 1000),
    priceB2B: 20000 + (i * 1000),
    description: "A beautifully curated sample package for demonstration.",
    itinerary: ["Arrival", "Day Trip", "Relaxation", "Departure"],
    inclusions: ["Breakfast", "Transfers"],
    images: [`https://picsum.photos/seed/pkg${i}/800/600`],
    availability: "High",
    isHot: i % 5 === 0
  });
}

export const visas = [
  { id: "v-dubai", country: "UAE", price: 6500, time: "2-3 Days" },
  { id: "v-thai", country: "Thailand", price: 4800, time: "24-48 Hours" },
  { id: "v-sing", country: "Singapore", price: 3500, time: "3-5 Days" },
];

export const bookingStatus = ["Pending", "Confirmed", "Processing", "Cancelled", "Completed"];
export const leadStatus = ["New", "Contacted", "Interested", "Follow-up", "Converted", "Closed"];
export const roles = ["Admin", "Agent", "Vendor", "Employee", "Customer"];
