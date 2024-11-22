import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './components/ui/Button';
import { X, Menu, User, LogIn, Home, Zap, Scissors, BookOpen, Wrench, Briefcase } from 'lucide-react';
import Profile from './components/ui/userdashboard/ProfilePage'; 
import Bookings from './components/ui/userdashboard/BookingsPage'; 
import Subscription from './components/ui/userdashboard/SubscriptionPage'; 
import Settings from './components/ui/userdashboard/SettingsPage'; 

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status and verify session
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // User is logged in
    } else {
      setIsLoggedIn(false); // User is not logged in
    }
  }, []);

  const services = [
    { name: 'Electrician', icon: Zap, route: 'electrician' },
    { name: 'Gardener', icon: Scissors, route: 'gardener' },
    { name: 'Tutor', icon: BookOpen, route: 'tutor' },
    { name: 'Plumber', icon: Wrench, route: 'plumber' },
    { name: 'Maid', icon: Briefcase, route: 'maid' }
  ];

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setIsLoggedIn(false); // Update logged-in state
    navigate('/login-options'); // Redirect to login page
  };

  // Toggle profile dropdown
  const handleProfileDropdownToggle = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Home className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-2xl font-bold text-blue-600">UrbanConnect</h1>
          </div>
          <nav className="hidden md:flex space-x-4">
            <a href="#services" className="text-gray-600 hover:text-blue-600">Services</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>

            {isLoggedIn ? (
              <div className="relative">
                <Button variant="outline" onClick={handleProfileDropdownToggle}>
                  Profile
                </Button>
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 bg-white shadow-md rounded-lg mt-2 w-48">
                    <button className="block px-4 py-2 text-gray-700 w-full text-left" onClick={() => navigate('/profile')}>Profile</button>
                    <button className="block px-4 py-2 text-gray-700 w-full text-left" onClick={() => navigate('/bookings')}>My Bookings</button>
                    <button className="block px-4 py-2 text-gray-700 w-full text-left" onClick={() => navigate('/subscription')}>My Subscription</button>
                    <button className="block px-4 py-2 text-gray-700 w-full text-left" onClick={() => navigate('/settings')}>Settings</button>
                    <button className="block px-4 py-2 text-red-600 w-full text-left" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button variant="outline" onClick={() => navigate('/login-options')}>Login</Button>
                <Button onClick={() => navigate('/register-options')}>Register</Button>
              </>
            )}
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-2">
            <a href="#services" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">Services</a>
            <a href="#how-it-works" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">How It Works</a>
            <a href="#about" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">About</a>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Your One-Stop Solution for Home Services</h2>
            <p className="text-xl mb-8">Connect with verified contractors through our streamlined booking system</p>
            <Button size="lg" onClick={() => navigate('/')}>Book a Service</Button>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="text-center cursor-pointer bg-blue-100 rounded-lg p-4 hover:bg-blue-200 transition duration-200"
                  onClick={() => navigate(`/service-details?service=${service.route}`)}
                >
                  <div className="bg-blue-200 rounded-full p-4 inline-block mb-4">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-lg">{service.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Create an Account</h3>
                <p>Sign up and tell us about your service needs</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <LogIn className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Book a Service</h3>
                <p>Choose from our wide range of home services</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  <Home className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Get it Done</h3>
                <p>Our verified professionals will take care of the rest</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="mb-8">
              UrbanConnect is dedicated to connecting homeowners with trusted service professionals.
              Our mission is to simplify the process of finding quality home services while ensuring
              that our users have the best experience possible.
            </p>
            <Button onClick={() => navigate('/about-us')}>Learn More</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 UrbanConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};


export default MainPage;
