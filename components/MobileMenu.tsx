'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface NavLink {
  href: string;
  label: string;
}

interface MobileMenuProps {
  navLinks: NavLink[];
}

const MobileMenu: React.FC<MobileMenuProps> = ({ navLinks }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => document.body.classList.remove("no-scroll");
  }, [isMobileMenuOpen]);

  return (
    <>
      <button
        className="lg:hidden flex items-center px-2 py-1 border border-white rounded"
        onClick={toggleMobileMenu}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          ></path>
        </svg>
      </button>

   
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#090015] fixed top-0 left-0 w-full h-full z-50 px-4 py-4 flex flex-col items-center text-sm font-medium overflow-hidden">
        
          <button
            onClick={toggleMobileMenu}
            className="text-white text-2xl font-bold mb-8 self-end"
          >
            ×
          </button>

         
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} legacyBehavior passHref>
              <a onClick={toggleMobileMenu} className="block text-white py-2 hover:text-gray-400">
                {link.label}
              </a>
            </Link>
          ))}

        
          <Link href="#" legacyBehavior passHref>
            <a className="block border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#090015] transition text-center mt-4">
              Get started
            </a>
          </Link>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
