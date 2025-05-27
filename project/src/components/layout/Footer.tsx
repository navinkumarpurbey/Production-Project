import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github, Activity } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center text-white mb-4">
              <Activity size={24} />
              <span className="ml-2 text-xl font-semibold">HealthPredict</span>
            </Link>
            <p className="text-neutral-300 text-sm mb-4">
              Predicting healthcare's future, today. We provide real-time predictive analysis and visualization of healthcare trends.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-neutral-300 hover:text-white transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/resources" className="text-neutral-300 hover:text-white transition-colors">Resources</Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-medium mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Data Attribution</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-white transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <p className="text-neutral-300 mb-2">We'd love to hear from you</p>
            <a href="mailto:info@healthpredict.com" className="text-primary-300 hover:text-primary-200 transition-colors">info@healthpredict.com</a>
            <p className="text-neutral-300 mt-4">Kathmandu, Nepal</p>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 Predictive Health Analytics. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="text-neutral-400 text-sm">Trusted by 10,000+ Users</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;