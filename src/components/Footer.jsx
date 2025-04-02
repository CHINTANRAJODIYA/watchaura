import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#a16207] to-[#e3bd25] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">WatchAura™</h3>
            <p className="text-gray-100">Your premium destination for luxury timepieces.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-200 transition-colors">Home</a></li>
              <li><a href="/product" className="hover:text-gray-200 transition-colors">Products</a></li>
              <li><a href="/about" className="hover:text-gray-200 transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-gray-200 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li>Email: info@watchaura.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Luxury Lane, Watch City</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-200 transition-colors transform hover:scale-110">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors transform hover:scale-110">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors transform hover:scale-110">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-gray-200 transition-colors transform hover:scale-110">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} WatchAura™. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
