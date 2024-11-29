import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Star, MapPin, Filter, ChevronDown } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/Dialog';
import Label from './ui/Label';
import Input from './ui/Input';
import { Button } from './ui/Button';
import axios from 'axios';

const ServiceDetailsPage = () => {
  const location = useLocation();
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    location: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Form state
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [descriptionOfWork, setDescriptionOfWork] = useState('');

  // Extract service type from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const serviceType = queryParams.get('service')?.toLowerCase() || 'electrician';
  const capitalizedService = serviceType.charAt(0).toUpperCase() + serviceType.slice(1);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchProfessionals = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/api/professionals?service=${serviceType}`);
        if (!response.ok) {
          throw new Error('Failed to fetch professionals');
        }
        const data = await response.json();
        setServiceData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfessionals();
  }, [serviceType]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredProfessionals = serviceData.filter(pro => {
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (pro.cost_per_hour < min || pro.cost_per_hour > max) return false;
    }
    if (filters.rating !== 'all' && pro.rating < Number(filters.rating)) return false;
    if (filters.location !== 'all' && pro.location !== filters.location) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'price') return a.cost_per_hour - b.cost_per_hour;
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });

  const handleBackClick = () => {
    window.location.href = '/';
  };

    // Form submission handler
    const handleBookingSubmit = async (e, professionalId) => {
      e.preventDefault();
      
      const bookingData = {
        professionalId,
        date: preferredDate,
        time: preferredTime,
        description: descriptionOfWork
      };
  
      try {
        const response = await axios.post('http://localhost:3001/api/book', bookingData);
        console.log(response.data); // handle success (e.g., show confirmation message)
        alert('Booking confirmed');
      } catch (error) {
        console.error('Error submitting booking:', error);
        alert('Failed to confirm booking');
      }
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
        {isLoading ? (
          <p>Loading...</p>
        ) : (
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
