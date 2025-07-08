"use client";
import React from 'react';

export default function ContactHeader() {
  return (
    <div className="flex flex-col items-center text-center mb-8 w-full bg-[#151515]" style={{ background: '#151515' }}>
      <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">CONTACT US</h2>
      <div className="text-white text-base md:text-lg font-medium mb-2">Skip the Middlemen – Talk Directly to the Developer!</div>
      <div className="text-gray-300 text-xs md:text-sm max-w-lg mb-1">
        We believe in clear, fast, and honest communication. That&apos;s why when you reach out to us, you won&apos;t be passed through layers of sales reps or account managers.
      </div>
      <div className="text-gray-300 text-xs md:text-sm max-w-lg">
        Whether you want to scale your business, enhance your digital presence, or explore new tech possibilities — you&apos;ll be speaking directly with the developer who builds it.
      </div>
    </div>
  );
} 