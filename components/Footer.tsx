import React from "react";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#090015] text-white py-10 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h1 className="text-2xl md:text-4xl font-bold leading-tight">
              Join the Future of Hiring with Talentino.ai
            </h1>
            <p className="text-[#B0BEC5] mt-4 max-w-lg text-sm md:text-base mx-auto md:mx-0">
              Be among the first to experience the power of AI-driven
              recruitment. Sign up for early access and get exclusive updates as
              we prepare to launch this fall.
            </p>
          </div>

          <div>
            <Link href="https://dev.talentino.ai/signin">
              <PrimaryButton
                bgColor="#00F2FF"
                textColor="#090015"
                hoverColor="#00D1E0"
              >
                Get Early Access
              </PrimaryButton>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-10 flex flex-col md:flex-row justify-between space-y-10 md:space-y-0">
          <div className="flex flex-col items-center md:items-start space-y-6">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={126}
              height={24}
              style={{
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
            <h3 className="text-lg my-3 text-center md:text-left">
              Subscribe to newsletter
            </h3>
            <div className="flex items-center bg-[#1F1630] p-1 rounded-full w-full max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-2 focus:outline-none"
              />
              <button className="bg-[#00F2FF] text-[#090015] font-medium py-2 px-4 rounded-full">
                Get started
              </button>
            </div>

            <div className="flex space-x-4 mt-4 justify-center md:justify-start">
              <Link
                href="https://www.facebook.com/profile.php?id=61565419302847"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://www.instagram.com/talentino.aihr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://www.threads.net/@talentino.aihr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/linkedin.png"
                  alt="Linkedin"
                  width={24}
                  height={24}
                />
              </Link>
              <Link
                href="https://x.com/Talentino_AI"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image src="/x.svg" alt="X" width={24} height={24} />
              </Link>
            </div>
          </div>

          <div className="flex justify-between w-full md:w-auto space-x-6 md:space-x-12">
            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-[#B0BEC5] text-sm">
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-[#B0BEC5] text-sm">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-[#B0BEC5] text-sm flex flex-col">
                <li className="flex items-center">
                  <Image
                    src="/call.svg"
                    alt="Phone"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  +918369348283
                </li>
                <li className="flex items-center">
                  <Image
                    src="/email.svg"
                    alt="Email"
                    width={20}
                    height={20}
                    style={{
                      width: "auto",
                      height: "auto",
                      maxWidth: "100%",
                      objectFit: "cover",
                    }}
                    className="mr-2"
                  />
                  info@talentino.ai
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-[#B0BEC5]">
            © 2024 Talentino. Created with love in India
          </p>
          <div className="flex space-x-4 text-xs text-center">
            <a href="#" className="text-[#B0BEC5]">
              Terms & Conditions
            </a>
            <a href="#" className="text-[#B0BEC5]">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
