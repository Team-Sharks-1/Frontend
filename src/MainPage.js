import React, { useState } from 'react';
import { X, Menu, User, LogIn, Home, Zap, Scissors, BookOpen, Wrench, Briefcase } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/Dialog';
import Label from './components/ui/Label';
import Input from './components/ui/Input';
import { Button } from './components/ui/Button';

const services = [
  { name: 'Electrician', icon: Zap },
  { name: 'Gardener', icon: Scissors },
  { name: 'Tutor', icon: BookOpen },
  { name: 'Plumber', icon: Wrench },
  { name: 'Maid', icon: Briefcase },
];

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

// Register user
const registerUser = async (event) => {
  event.preventDefault();

  const userData = {
    name: event.target.name.value,
    email: event.target.email.value,
    password: event.target.password.value,
  };

  try {
    const response = await fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    const data = await response.json();
    
    if (response.ok) {
      alert('Registration successful!');
    } else {
      // Handle server errors or validation errors
      const errorMessage = data.message || data.errors?.map(e => e.msg).join(', ') || 'An error occurred during registration';
      alert(`Registration failed: ${errorMessage}`);
    }
  } catch (error) {
    // Handle network errors or other exceptions
    console.error('Registration error:', error);
    alert(`Registration failed: ${error.message || 'An unexpected error occurred'}`);
  }  
};
// Login user
const loginUser = async (event) => {
  event.preventDefault();

  const loginData = {
    email: event.target.email.value, // Changed username to email
    password: event.target.password.value,
  };

  try {
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();
    if (response.ok) {
      alert('Login successful!');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error:', error);
  }
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Login</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={loginUser}>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Register</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register</DialogTitle>
                </DialogHeader>
                
                <form className="space-y-4" onSubmit={registerUser}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a password" />
                  </div>
                  <Button type="submit" className="w-full">Register</Button>
                </form>
              </DialogContent>
            </Dialog>
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
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full mt-2">Login</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Login</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={loginUser}>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-2">Register</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Register</DialogTitle>
                </DialogHeader>
                <form className="space-y-4" onSubmit={registerUser}>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a password" />
                  </div>
                  <Button type="submit" className="w-full">Register</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </header>

      <main>
        <section className="bg-blue-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Your One-Stop Solution for Home Services</h2>
            <p className="text-xl mb-8">Connect with verified contractors through our streamlined booking system</p>
            <Button size="lg">Book a Service</Button>
          </div>
        </section>

        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {services.map((service, index) => (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">{service.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

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

        <section id="about" className="py-16">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <p className="mb-8">
              UrbanConnect is dedicated to connecting homeowners with trusted service professionals.
              Our mission is to simplify the process of finding quality home services while ensuring
              that our users have the best experience possible.
            </p>
            <Button>Learn More</Button>
          </div>
        </section>
      </main>

      <footer className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">© 2024 UrbanConnect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
