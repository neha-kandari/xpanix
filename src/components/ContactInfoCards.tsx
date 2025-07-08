"use client";
import React from 'react';
import { MapPin, Clock, MessageCircle } from 'lucide-react';

const cards = [
  {
    icon: <MapPin className="w-6 h-6 text-white mb-2" />,
    title: 'Office Location',
    desc: 'Remote / Worldwide',
  },
  {
    icon: <Clock className="w-6 h-6 text-white mb-2" />,
    title: 'Working Hours',
    desc: 'Mon-Sat: 10am - 8pm',
  },
  {
    icon: <MessageCircle className="w-6 h-6 text-white mb-2" />,
    title: 'Communication',
    desc: 'Fast, direct, honest',
  },
];

export default function ContactInfoCards() {
  return (
    <div className="w-full flex flex-row items-center justify-center gap-4 mb-8">
      {cards.map((card, i) => (
        <div key={i} className="flex flex-col items-center bg-[#35343a] rounded-lg px-4 py-4 min-w-[100px] max-w-[140px] border border-white/10 shadow-md">
          {card.icon}
          <div className="text-white font-semibold text-sm mb-1">{card.title}</div>
          <div className="text-gray-300 text-xs text-center">{card.desc}</div>
        </div>
      ))}
    </div>
  );
} 