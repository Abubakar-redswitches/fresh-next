import React from "react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const navLinks = [
    { href: "features", label: "Features" },
    { href: "about", label: "About" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <header className="bg-[#090015] text-white">
      <div className="max-container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="w-24 md:w-32 lg:w-40 h-auto">
            <Image src="/logo.svg" alt="Logo" width={160} height={30} />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="hover:text-gray-400">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="https://dev.talentino.ai/signin">
            <span className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-[#090015] transition">
              Get started
            </span>
          </Link>
        </div>

        <MobileMenu navLinks={navLinks} />
      </div>
    </header>
  );
};

export default Header;
