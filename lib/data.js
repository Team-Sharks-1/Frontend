import { Wrench, Book, Brush, CleaningService, Hammer, Car, Dog, Heart } from 'lucide-react';

// Service categories with their icons
export const services = [
  { 
    id: 'electrician',
    name: 'Electrician', 
    icon: Wrench,
    description: 'Licensed electricians for all your electrical needs'
  },
  { 
    id: 'plumber',
    name: 'Plumber', 
    icon: Wrench,
    description: 'Expert plumbers for repairs and installations'
  },
  { 
    id: 'gardener',
    name: 'Gardener', 
    icon: Brush,
    description: 'Professional garden and landscape maintenance'
  },
  { 
    id: 'tutor',
    name: 'Tutor', 
    icon: Book,
    description: 'Expert tutors in various subjects'
  },
  { 
    id: 'maid',
    name: 'Maid', 
    icon: CleaningService,
    description: 'Professional cleaning services'
  },
  { 
    id: 'carpenter',
    name: 'Carpenter', 
    icon: Hammer,
    description: 'Skilled carpenters for all woodwork'
  },
  { 
    id: 'mechanic',
    name: 'Mechanic', 
    icon: Car,
    description: 'Expert auto repair and maintenance'
  },
  { 
    id: 'petcare',
    name: 'Pet Care', 
    icon: Dog,
    description: 'Professional pet sitting and care'
  },
  { 
    id: 'healthcare',
    name: 'Healthcare', 
    icon: Heart,
    description: 'Home healthcare services'
  }
];

// Professional service providers data
export const professionals = {
  electrician: [
    {
      id: 1,
      name: "John Doe",
      rating: 4.8,
      jobs: 156,
      experience: 5,
      costPerHour: 45,
      location: "Downtown",
      description: "Certified electrician specializing in residential and commercial electrical services. Expert in smart home installations and electrical repairs.",
      image: "/api/placeholder/100/100",
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      certifications: ["Licensed Master Electrician", "Smart Home Certified"],
      specialties: ["Residential", "Commercial", "Smart Home", "Emergency Repairs"]
    },
    {
      id: 2,
      name: "Sarah Smith",
      rating: 4.9,
      jobs: 203,
      experience: 8,
      costPerHour: 55,
      location: "Westside",
      description: "Master electrician with expertise in smart home installations and energy-efficient solutions.",
      image: "/api/placeholder/100/100",
      availability: ["Monday", "Wednesday", "Friday", "Saturday"],
      certifications: ["Master Electrician", "Energy Efficiency Expert"],
      specialties: ["Smart Home", "Energy Efficiency", "Lighting Design"]
    }
  ],
  plumber: [
    {
      id: 1,
      name: "Mike Johnson",
      rating: 4.7,
      jobs: 178,
      experience: 6,
      costPerHour: 50,
      location: "Eastside",
      description: "Licensed plumber specializing in emergency repairs and installations. Available 24/7 for urgent issues.",
      image: "/api/placeholder/100/100",
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      certifications: ["Master Plumber License", "Green Plumbing Certified"],
      specialties: ["Emergency Repairs", "Installation", "Water Heaters"]
    },
    {
      id: 2,
      name: "David Wilson",
      rating: 4.6,
      jobs: 145,
      experience: 4,
      costPerHour: 40,
      location: "Northside",
      description: "Expert in modern plumbing systems and water heater installation. Specializing in eco-friendly solutions.",
      image: "/api/placeholder/100/100",
      availability: ["Tuesday", "Wednesday", "Thursday", "Friday", "Sunday"],
      certifications: ["Plumbing License", "Water Conservation Specialist"],
      specialties: ["Water Heaters", "Eco-friendly Solutions", "Maintenance"]
    }
  ],
  gardener: [
    {
      id: 1,
      name: "Emma Brown",
      rating: 4.8,
      jobs: 134,
      experience: 7,
      costPerHour: 35,
      location: "Downtown",
      description: "Experienced gardener specializing in landscape design and maintenance. Expert in native plant species.",
      image: "/api/placeholder/100/100",
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      certifications: ["Landscape Design Certified", "Master Gardener"],
      specialties: ["Landscape Design", "Native Plants", "Garden Maintenance"]
    }
  ],
  tutor: [
    {
      id: 1,
      name: "Alice Cooper",
      rating: 4.9,
      jobs: 245,
      experience: 10,
      costPerHour: 40,
      location: "Westside",
      description: "Mathematics and Science tutor with proven track record of student success. Specializes in SAT/ACT prep.",
      image: "/api/placeholder/100/100",
      availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      certifications: ["Teaching License", "SAT/ACT Prep Certified"],
      specialties: ["Mathematics", "Physics", "SAT/ACT Prep"]
    }
  ],
  maid: [
    {
      id: 1,
      name: "Patricia Lee",
      rating: 4.7,
      jobs: 189,
      experience: 5,
      costPerHour: 30,
      location: "Eastside",
      description: "Professional house cleaner with attention to detail and eco-friendly cleaning methods.",
      image: "/api/placeholder/100/100",
      availability: ["Monday", "Wednesday", "Friday", "Saturday"],
      certifications: ["Professional Cleaning Certified", "Green Cleaning Certified"],
      specialties: ["Deep Cleaning", "Eco-friendly Cleaning", "Organization"]
    }
  ]
};

// Available time slots for booking
export const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM"
];

// Service locations
export const locations = [
  "Downtown",
  "Westside",
  "Eastside",
  "Northside",
  "Southside"
];

// Price ranges for filtering
export const priceRanges = [
  { label: "All Prices", value: "all" },
  { label: "$0 - $30/hr", value: "0-30" },
  { label: "$31 - $50/hr", value: "31-50" },
  { label: "$51 - $100/hr", value: "51-100" }
];

// Rating options for filtering
export const ratingOptions = [
  { label: "All Ratings", value: "all" },
  { label: "4.5+", value: "4.5" },
  { label: "4.0+", value: "4.0" },
  { label: "3.5+", value: "3.5" }
];

// Sort options
export const sortOptions = [
  { label: "Rating", value: "rating" },
  { label: "Price", value: "price" },
  { label: "Experience", value: "experience" }
];