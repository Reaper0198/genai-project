import React from "react";
import { CiLocationOn } from "react-icons/ci";
import {Link} from "react-router-dom";
const Footer = () => {
  const handleNewsletterSubmit = () => {
    
  }
  return (
    <footer className="bottom-0 flex flex-col bg-[#012f2c] text-[#fbf7f0] w-full pb-10">
      <div className="flex flex-col items-center mt-10">
        <h1 className="italic text-[#e0bf40] font-sans text-7xl mb-8">
          Mindful
        </h1>
      </div>
      <div className="newsletter text-center font-serif mt-4 px-5">
        <h2 className="font-semibold">Join Our Newsletter</h2>
        <p className="mb-4">
          Mental health and wellness tips, our latest guides, resources, and
          more.
        </p>
        <div className="flex font-serif justify-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            className="rounded-full bg-[#3a4f4b] text-[#fbf7f0] px-4 focus:outline-none focus:ring-2 focus:ring-[#e0bf40] focus:ring-opacity-50"
          />
          <button
          onClick={handleNewsletterSubmit}
          className="bg-[#1e675a] text-[#fbf7f0]  py-2 px-4 rounded hover:bg-[#1b5a4c] transition duration-200">
            Sign Up
          </button>
        </div>
      </div>
      <hr className="border-white my-6 mx-10" />
      <div className="font-semibold text-[#fbf7f0] font-serif flex-col mx-auto md:flex-row flex justify-center mt-6 gap-40">
        <div>
          <ul className="flex flex-col gap-2">
            <Link className="hover:text-[#e0bf40] hover:underline font-bold text-xl mb-2">About Us</Link>
            <Link className="hover:text-[#e0bf40] hover:underline">Meet Our Team</Link>
            <Link className="hover:text-[#e0bf40] hover:underline">Our Story</Link>
            <Link className="hover:text-[#e0bf40] hover:underline">Advisory Council</Link>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <Link className="hover:text-[#e0bf40] hover:underline font-bold text-xl mb-2">Resources</Link>
            <Link className="hover:text-[#e0bf40] hover:underline">Harvard Health</Link>
            <Link className="hover:text-[#e0bf40] hover:underline">Meditation</Link>
            <Link className="hover:text-[#e0bf40] hover:underline">Newsletter</Link>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2">
            <Link className="hover:text-[#e0bf40] hover:underline font-bold text-xl mb-2">Get In Touch</Link>
            <Link className="hover:text-[#e0bf40] hover:underline">Contact Us</Link>
            <Link className="hover:text-[#e0bf40] hover:underline font-extralight flex gap-1 text-sm">
              <CiLocationOn className="h-5 w-5" />
              B74 Sector 56 Noida
            </Link>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
