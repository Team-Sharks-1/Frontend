import React, { useState } from 'react';
import { Star, MapPin, Filter, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';
import Label from './ui/Label';
import Input from './ui/Input';
import { Button } from './ui/Button';

// Sample data - In a real app, this would come from an API
const professionals = {
  electrician: [
    { id: 1, name: "John Doe", rating: 4.8, jobs: 156, experience: 5, costPerHour: 45, location: "Downtown", description: "Certified electrician specializing in residential and commercial electrical services.", image: "/api/placeholder/100/100" },
    { id: 2, name: "Sarah Smith", rating: 4.9, jobs: 203, experience: 8, costPerHour: 55, location: "Westside", description: "Master electrician with expertise in smart home installations.", image: "/api/placeholder/100/100" },
  ],
  plumber: [
    { id: 1, name: "Mike Johnson", rating: 4.7, jobs: 178, experience: 6, costPerHour: 50, location: "Eastside", description: "Licensed plumber specializing in emergency repairs and installations.", image: "/api/placeholder/100/100" },
    { id: 2, name: "David Wilson", rating: 4.6, jobs: 145, experience: 4, costPerHour: 40, location: "Northside", description: "Expert in modern plumbing systems and water heater installation.", image: "/api/placeholder/100/100" },
  ],
  gardener: [
    { id: 1, name: "Emma Brown", rating: 4.8, jobs: 134, experience: 7, costPerHour: 35, location: "Downtown", description: "Experienced gardener specializing in landscape design and maintenance.", image: "/api/placeholder/100/100" },
  ],
  tutor: [
    { id: 1, name: "Alice Cooper", rating: 4.9, jobs: 245, experience: 10, costPerHour: 40, location: "Westside", description: "Mathematics and Science tutor with proven track record of student success.", image: "/api/placeholder/100/100" },
  ],
  maid: [
    { id: 1, name: "Patricia Lee", rating: 4.7, jobs: 189, experience: 5, costPerHour: 30, location: "Eastside", description: "Professional house cleaner with attention to detail and eco-friendly cleaning methods.", image: "/api/placeholder/100/100" },
  ],
};

const ServiceDetailsPage = ({ serviceType = "electrician" }) => {
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    location: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  // Get service type from URL if not provided as prop
  const getServiceFromUrl = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('service') || serviceType;
  };

  const currentService = getServiceFromUrl();
  const serviceData = professionals[currentService.toLowerCase()] || [];
  const capitalizedService = currentService.charAt(0).toUpperCase() + currentService.slice(1);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredProfessionals = serviceData.filter(pro => {
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (pro.costPerHour < min || pro.costPerHour > max) return false;
    }
    if (filters.rating !== 'all' && pro.rating < Number(filters.rating)) return false;
    if (filters.location !== 'all' && pro.location !== filters.location) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.costPerHour - b.costPerHour;
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });

  const handleBackClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={handleBackClick}
              className="text-sm"
            >
              ← Back
            </Button>
            <h1 className="text-2xl font-bold text-blue-600">{capitalizedService}s Near You</h1>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>

            <div className="flex items-center gap-4">
              <Label htmlFor="sort" className="whitespace-nowrap">Sort by:</Label>
              <select
                id="sort"
                className="p-2 border rounded-md"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="price">Price</option>
                <option value="experience">Experience</option>
              </select>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pb-4">
              <div>
                <Label htmlFor="price-range">Price Range</Label>
                <select
                  id="price-range"
                  className="w-full p-2 mt-1 border rounded-md"
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="0-30">$0 - $30/hr</option>
                  <option value="31-50">$31 - $50/hr</option>
                  <option value="51-100">$51 - $100/hr</option>
                </select>
              </div>
              <div>
                <Label htmlFor="rating">Minimum Rating</Label>
                <select
                  id="rating"
                  className="w-full p-2 mt-1 border rounded-md"
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5">4.5+</option>
                  <option value="4">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  className="w-full p-2 mt-1 border rounded-md"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                >
                  <option value="all">All Locations</option>
                  <option value="Downtown">Downtown</option>
                  <option value="Westside">Westside</option>
                  <option value="Eastside">Eastside</option>
                  <option value="Northside">Northside</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Professionals Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfessionals.map((professional) => (
            <div key={professional.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src={professional.image}
                    alt={professional.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{professional.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-medium">{professional.rating}</span>
                      <span className="text-gray-500">({professional.jobs} jobs)</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{professional.location}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-600">{professional.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-blue-600">${professional.costPerHour}</span>
                      <span className="text-gray-500">/hr</span>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>Book Now</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Book {professional.name}</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                          <div>
                            <Label htmlFor="date">Preferred Date</Label>
                            <Input id="date" type="date" />
                          </div>
                          <div>
                            <Label htmlFor="time">Preferred Time</Label>
                            <Input id="time" type="time" />
                          </div>
                          <div>
                            <Label htmlFor="description">Description of Work</Label>
                            <textarea
                              id="description"
                              className="w-full p-2 border rounded-md min-h-[100px]"
                              placeholder="Please describe the work you need done..."
                            />
                          </div>
                          <Button type="submit" className="w-full">Confirm Booking</Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;