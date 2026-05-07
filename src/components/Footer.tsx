import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from "lucide-react";
import ContactForm from './ContactForm';

const Footer: React.FC = () => {
  return (
    <footer className="bg-vacation-navy text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="PatriotPads Logo" className="h-20 w-20" />
              <span className="text-xl font-bold text-gray-300">Perfect Getaways</span>
            </Link>
            <p className="text-gray-300 mb-4">
              Discover the perfect vacation rental for your next getaway in California, Florida, and Oklahoma.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white transition-colors">Properties</Link>
              </li>
              
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white transition-colors">California</Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white transition-colors">Florida</Link>
              </li>
              <li>
                <Link to="/listings" className="text-gray-300 hover:text-white transition-colors">Oklahoma</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-4">
              Have questions? Get in touch with us!
            </p>
            <ContactForm 
              trigger={
                <button className="bg-vacation-blue hover:bg-vacation-blue/90 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                  Contact Us
                </button>
              }
            />
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} PatriotPads. All rights reserved.</p>
          <Link 
            to="/admin" 
            className="inline-block mt-2 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
