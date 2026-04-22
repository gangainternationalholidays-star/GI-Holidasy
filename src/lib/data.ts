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
  // --- HILL STATIONS ---
  {
    id: "pkg-in-mn-001",
    name: "Manali Snow Retreat",
    destination: "Manali",
    category: "Premium",
    region: "Domestic",
    duration: "4 Nights / 5 Days",
    priceCustomer: 22000,
    priceAgent: 20000,
    priceB2B: 18000,
    description: "Experience the magic of Rohtang Pass and Solang Valley.",
    itinerary: ["Delhi to Manali", "Local Sightseeing", "Solang Valley", "Old Manali", "Departure"],
    inclusions: ["4-Star Resort", "Buffet Breakfast", "Private SUV"],
    images: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=800"],
    availability: "High",
    isHot: true
  },
  {
    id: "pkg-in-shim-001",
    name: "Shimla Heritage Walk",
    destination: "Shimla",
    category: "Basic",
    region: "Domestic",
    duration: "3 Nights / 4 Days",
    priceCustomer: 15500,
    priceAgent: 14000,
    priceB2B: 12500,
    description: "Colonial charm and scenic ridge views in the queen of hills.",
    itinerary: ["Kalka to Shimla", "The Ridge & Mall Road", "Kufri Excursion", "Departure"],
    inclusions: ["3-Star Hotel", "Breakfast", "Sightseeing"],
    images: ["https://images.unsplash.com/photo-1549468057-5b7fa1a41d7a?q=80&w=800"],
    availability: "High",
    isHot: false
  },
  // --- BEACHES ---
  {
    id: "pkg-in-goa-001",
    name: "Goa Beach Bonanza",
    destination: "Goa",
    category: "Premium",
    region: "Domestic",
    duration: "4 Nights / 5 Days",
    priceCustomer: 28000,
    priceAgent: 25500,
    priceB2B: 23000,
    description: "South Goa luxury and North Goa heritage tours.",
    itinerary: ["Arrival in Goa", "North Goa Beaches", "South Goa Heritage", "Bacalim Leisure", "Departure"],
    inclusions: ["Resort near Beach", "Daily Breakfast", "Airport Transfers"],
    images: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=800"],
    availability: "High",
    isHot: true
  },
  {
    id: "pkg-in-and-001",
    name: "Andaman Bliss",
    destination: "Andaman",
    category: "Luxury",
    region: "Domestic",
    duration: "5 Nights / 6 Days",
    priceCustomer: 55000,
    priceAgent: 51000,
    priceB2B: 48000,
    description: "Crystal clear waters of Havelock and Radhanagar beach.",
    itinerary: ["Port Blair Arrival", "Ross Island", "Havelock Island", "Elephanta Beach", "Departure"],
    inclusions: ["5-Star Beach Resort", "Private Ferry", "Candle Light Dinner"],
    images: ["https://images.unsplash.com/photo-1589135398309-114405f68b05?q=80&w=800"],
    availability: "Medium",
    isHot: true
  },
  // --- HERITAGE ---
  {
    id: "pkg-in-raj-001",
    name: "Rajasthan Royal Circuit",
    destination: "Rajasthan",
    category: "Luxury",
    region: "Domestic",
    duration: "7 Nights / 8 Days",
    priceCustomer: 75000,
    priceAgent: 70000,
    priceB2B: 65000,
    description: "Palace stays in Jaipur, Udaipur and sand dunes in Jaisalmer.",
    itinerary: ["Jaipur Pink City", "Udaipur Lakes", "Jaisalmer Desert", "Jodhpur Fort"],
    inclusions: ["Heritage Palace Hotels", "Camel Safari", "Folk Dance & Dinner"],
    images: ["https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800"],
    availability: "Medium",
    isHot: true
  },
  // --- SPIRITUAL ---
  {
    id: "pkg-in-cd-001",
    name: "Char Dham Yatra Deluxe",
    destination: "Char Dham",
    category: "Premium",
    region: "Domestic",
    duration: "11 Nights / 12 Days",
    priceCustomer: 45000,
    priceAgent: 42000,
    priceB2B: 39500,
    description: "A complete spiritual circuit of Kedarnath, Badrinath, Gangotri & Yamunotri.",
    itinerary: ["Haridwar Arrival", "Yamunotri", "Gangotri", "Kedarnath", "Badrinath", "Departure"],
    inclusions: ["AC Accommodation", "Helicopter Booking Assistance", "Veg Satvik Meals"],
    images: ["https://images.unsplash.com/photo-1596701062351-be5f43058f50?q=80&w=800"],
    availability: "Medium",
    isHot: true
  },
  // --- WILDLIFE ---
  {
    id: "pkg-in-jc-001",
    name: "Jim Corbett Jungle Safari",
    destination: "Jim Corbett",
    category: "Basic",
    region: "Domestic",
    duration: "2 Nights / 3 Days",
    priceCustomer: 12500,
    priceAgent: 11000,
    priceB2B: 9800,
    description: "Tiger spotting and forest trekking in the oldest national park.",
    itinerary: ["Arrival & Forest Walk", "Early Morning Jeep Safari", "Dhikala Zone", "Departure"],
    inclusions: ["Forest Lodge", "2 Safaris", "All Meals"],
    images: ["https://images.unsplash.com/photo-1611080626919-7cf5a9caab53?q=80&w=800"],
    availability: "High",
    isHot: false
  },
  // --- SOUTH INDIA ---
  {
    id: "pkg-in-coorg-001",
    name: "Coorg Coffee Estate Escape",
    destination: "Coorg",
    category: "Premium",
    region: "Domestic",
    duration: "3 Nights / 4 Days",
    priceCustomer: 24500,
    priceAgent: 22000,
    priceB2B: 20500,
    description: "Stay in the middle of lush coffee plantations with foggy mornings.",
    itinerary: ["Bangalore to Coorg", "Abbey Falls", "Elephant Camp", "Departure"],
    inclusions: ["Boutique Plantation Stay", "Estate Tour", "Private SUV"],
    images: ["https://images.unsplash.com/photo-1580137469216-3e91307b22a6?q=80&w=800"],
    availability: "High",
    isHot: true
  },
  {
    id: "pkg-in-var-001",
    name: "Varanasi Spiritual Sojourn",
    destination: "Varanasi",
    category: "Basic",
    region: "Domestic",
    duration: "2 Nights / 3 Days",
    priceCustomer: 12000,
    priceAgent: 10500,
    priceB2B: 8800,
    description: "Evening Ganga Aarti and morning boat ride in the world's oldest living city.",
    itinerary: ["Varanasi Arrival", "Evening Ganga Aarti", "Sarnath Visit", "Morning Ghat Boat Ride", "Departure"],
    inclusions: ["3-Star Boutique Hotel", "Boat Ride", "Local Guide"],
    images: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=800"],
    availability: "High",
    isHot: true
  },
  {
    id: "pkg-in-mun-001",
    name: "Munnar Tea Garden Trails",
    destination: "Munnar",
    category: "Premium",
    region: "Domestic",
    duration: "3 Nights / 4 Days",
    priceCustomer: 18500,
    priceAgent: 16800,
    priceB2B: 15200,
    description: "Explore the emerald tea gardens and Eravikulam National Park.",
    itinerary: ["Cochin to Munnar", "Tea Museum & Gardens", "Eravikulam Park", "Mattupetty Dam", "Return"],
    inclusions: ["4-Star Resort", "Breakfast", "Private SUV"],
    images: ["https://images.unsplash.com/photo-1593181629936-11c609b8db9b?q=80&w=800"],
    availability: "High",
    isHot: false
  },
  {
    id: "pkg-in-lak-001",
    name: "Lakshadweep Island Adventure",
    destination: "Lakshadweep",
    category: "Luxury",
    region: "Domestic",
    duration: "4 Nights / 5 Days",
    priceCustomer: 48000,
    priceAgent: 45000,
    priceB2B: 42000,
    description: "Private island stay with water sports and coral reef exploration.",
    itinerary: ["Agatti Arrival", "Bangaram Island Transfer", "Snorkeling & Kayaking", "Local Life Experience", "Departure"],
    inclusions: ["Beach Tents/Huts", "All Meals", "Entry Permits"],
    images: ["https://images.unsplash.com/photo-1544735745-b89b57c61dfd?q=80&w=800"],
    availability: "Limited",
    isHot: true
  },
  {
    id: "pkg-in-kaz-001",
    name: "Kaziranga Rhino Safari",
    destination: "Kaziranga",
    category: "Basic",
    region: "Domestic",
    duration: "3 Nights / 4 Days",
    priceCustomer: 16500,
    priceAgent: 14800,
    priceB2B: 13200,
    description: "Elephant and Jeep safari in the home of the Great One-Horned Rhino.",
    itinerary: ["Guwahati to Kaziranga", "Early Morning Elephant Safari", "Afternoon Jeep Safari", "Tea Garden Walk", "Departure"],
    inclusions: ["Wildlife Resort", "Safari Permits", "Breakfast & Dinner"],
    images: ["https://images.unsplash.com/photo-1547448415-e9f0b291c107?q=80&w=800"],
    availability: "Medium",
    isHot: false
  },
  // --- INTERNATIONAL - FOCUS 6 DESTINATIONS ---
  
  // 1. THAILAND
  {
    id: "pkg-int-th-001",
    name: "Thai Island Hopper",
    destination: "Thailand",
    category: "Premium",
    region: "International",
    duration: "5 Nights / 6 Days",
    priceCustomer: 39999,
    priceAgent: 36000,
    priceB2B: 34000,
    description: "Experience the pristine beaches of Phuket and Krabi with luxury ferry transfers.",
    itinerary: ["Phuket Arrival", "Phi Phi Island Tour", "James Bond Island", "Krabi Beaches", "Departure"],
    inclusions: ["4-Star Resorts", "Daily Breakfast", "Island Transfers", "Visa Assistance Available"],
    images: ["https://images.unsplash.com/photo-1528181304800-2f140c894979?q=80&w=800"],
    availability: "High",
    isHot: true
  },
  
  // 2. BALI
  {
    id: "pkg-int-bl-001",
    name: "Bali Tropical Villa Retreat",
    destination: "Bali (Indonesia)",
    category: "Luxury",
    region: "International",
    duration: "6 Nights / 7 Days",
    priceCustomer: 54999,
    priceAgent: 50000,
    priceB2B: 47000,
    description: "Stay in private pool villas amidst the lush jungles of Ubud and beaches of Seminyak.",
    itinerary: ["Ubud Private Villa", "Tegalalang Rice Terrace", "Kintamani Volcano", "Seminyak Sunset", "Departure"],
    inclusions: ["Private Pool Villa", "Floating Breakfast", "Private Luxury Car", "Visa Assistance Available"],
    images: ["https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800"],
    availability: "Medium",
    isHot: true
  },

  // 3. MALAYSIA
  {
    id: "pkg-int-my-001",
    name: "Genting & Kuala Lumpur Escape",
    destination: "Malaysia",
    category: "Basic",
    region: "International",
    duration: "4 Nights / 5 Days",
    priceCustomer: 35999,
    priceAgent: 32000,
    priceB2B: 30000,
    description: "City lights of KL and the high-altitude thrills of Genting Highlands.",
    itinerary: ["KL City Tour", "Batu Caves", "Genting Cable Car", "Theme Park", "Departure"],
    inclusions: ["3-Star Plus Hotels", "Cable Car Tickets", "KL Tower View", "Visa Assistance Available"],
    images: ["https://images.unsplash.com/photo-1596422846543-75c6fc18a5ce?q=80&w=800"],
    availability: "High",
    isHot: false
  },

  // 4. SINGAPORE
  {
    id: "pkg-int-sg-001",
    name: "Singapore Sparkle & Sentosa",
    destination: "Singapore",
    category: "Premium",
    region: "International",
    duration: "4 Nights / 5 Days",
    priceCustomer: 48999,
    priceAgent: 45000,
    priceB2B: 42000,
    description: "Wonders of the modern city, from Sentosa to Gardens by the Bay.",
    itinerary: ["City Tour", "Sentosa Island", "Universal Studios", "Night Safari", "Departure"],
    inclusions: ["4-Star Premium Hotel", "Entry Tickets", "Airport Transfers", "Visa Assistance Available"],
    images: ["https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=800"],
    availability: "High",
    isHot: true
  },

  // 5. HONG KONG
  {
    id: "pkg-int-hk-001",
    name: "Hong Kong & Disneyland Adventure",
    destination: "Hong Kong",
    category: "Premium",
    region: "International",
    duration: "4 Nights / 5 Days",
    priceCustomer: 62999,
    priceAgent: 58000,
    priceB2B: 55000,
    description: "The magic of Disneyland combined with the vibrant Kowloon skyline.",
    itinerary: ["Disneyland Full Day", "Ocean Park", "Victoria Peak", "Departure"],
    inclusions: ["4-Star Hotel", "Disney Tickets", "Peak Tram", "Visa Assistance Available"],
    images: ["https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=800"],
    availability: "Medium",
    isHot: false
  },

  // 6. JAPAN
  {
    id: "pkg-int-jp-001",
    name: "Tokyo & Kyoto Sakura Tour",
    destination: "Japan",
    category: "Luxury",
    region: "International",
    duration: "7 Nights / 8 Days",
    priceCustomer: 185000,
    priceAgent: 170000,
    priceB2B: 160000,
    description: "Bullet trains, traditional shrines, and the modern energy of Tokyo.",
    itinerary: ["Tokyo Modern City", "Mount Fuji", "Kyoto Temples", "Bullet Train Ride", "Departure"],
    inclusions: ["5-Star Business Hotels", "JR Pass", "Guided Culture Tour", "Visa Assistance Available"],
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800"],
    availability: "Medium",
    isHot: true
  },
];

// Helper to generate more packages to reach user goal of 5-10 per country
const focusInternationalDestinations = [
  "Thailand", "Bali (Indonesia)", "Malaysia", "Singapore", "Hong Kong", "Japan"
];

for (const dest of focusInternationalDestinations) {
  for (let j = 1; j <= 8; j++) {
    const isPremium = j % 3 >= 1;
    packages.push({
      id: `pkg-auto-int-${dest.toLowerCase().replace(/\s/g, '-')}-${j}`,
      name: `${dest} ${isPremium ? (j === 3 ? 'Ultra-Luxury' : 'Premium') : 'Budget'} ${j % 2 === 0 ? 'Expedition' : 'Getaway'}`,
      destination: dest,
      category: j === 3 ? "Luxury" : (isPremium ? "Premium" : "Basic"),
      region: "International",
      duration: j % 2 === 0 ? "5 Nights / 6 Days" : "3 Nights / 4 Days",
      priceCustomer: (isPremium ? 55000 : 35000) + (j * 3200),
      priceAgent: (isPremium ? 50000 : 31000) + (j * 3200),
      priceB2B: (isPremium ? 46000 : 28000) + (j * 3200),
      description: `Explore the unique wonders of ${dest} with our ${isPremium ? 'premium' : 'handpicked budget'} selection. Includes standard visa assistance.`,
      itinerary: ["Day 1: Arrival & Transfer", "Day 2: City Sightseeing", "Day 3: Optional Excursions", "Day 4: Local Market & Departure"],
      inclusions: ["Hotel Stay", "Daily Breakfast", "Sightseeing", "Visa Assistance Available"],
      images: [`https://picsum.photos/seed/${dest}${j}/1200/800`],
      availability: "High",
      isHot: j === 4 || j === 1 // Set 2 as hot/best sellers
    });
  }
}

// Helper to generate more domestic packages to reach the 5-10 goal per major segment
const majorDomesticDestinations = [
  "Manali", "Shimla", "Mussoorie", "Nainital", "Dharamshala", "Kashmir",
  "Goa", "Andaman", "Lakshadweep",
  "Jaipur", "Udaipur", "Jaisalmer", "Varanasi", "Khajuraho",
  "Char Dham", "Haridwar", "Rishikesh", "Tirupati",
  "Jim Corbett", "Ranthambore", "Kaziranga",
  "Munnar", "Alleppey", "Coorg", "Ooty", "Kodaikanal"
];

for (const dest of majorDomesticDestinations) {
  // Add 4 more per destination to complement the hardcoded ones
  for (let j = 0; j < 4; j++) {
    const isPremium = j % 2 === 0;
    packages.push({
      id: `pkg-auto-in-${dest.toLowerCase().replace(/\s/g, '-')}-${j}`,
      name: `${dest} ${isPremium ? 'Luxury' : 'Budget'} ${j % 2 === 0 ? 'Expedition' : 'Getaway'}`,
      destination: dest,
      category: isPremium ? "Premium" : "Basic",
      region: "Domestic",
      duration: j % 2 === 0 ? "4 Nights / 5 Days" : "2 Nights / 3 Days",
      priceCustomer: (isPremium ? 25000 : 12000) + (j * 1500),
      priceAgent: (isPremium ? 22000 : 10000) + (j * 1500),
      priceB2B: (isPremium ? 19000 : 8500) + (j * 1500),
      description: `A meticulously curated ${dest} package for a perfect ${isPremium ? 'premium' : 'value-for-money'} experience. Enjoy the best of ${dest} with GI Holidays.`,
      itinerary: ["Day 1: Arrival & Briefing", "Day 2: Local Exploration", "Day 3: Scenic Excursion", "Day 4: Leisure & Local Market", "Day 5: Departure"],
      inclusions: ["Breakfast", "Accommodation", "Sightseeing", "Transfers"],
      images: [`https://picsum.photos/seed/${dest}${j}/800/600`],
      availability: j % 3 === 0 ? "High" : "Medium",
      isHot: j === 0
    });
  }
}

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
