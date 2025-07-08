"use client"
import React, { useState } from 'react';

const TABS = [
  {
    key: 'web',
    label: 'Web Dev',
    icon: '🌐',
    heading: 'Web Development',
    content: (
      <>
        <div className="font-bold text-base md:text-lg mb-2">Custom-Built Websites That Convert and Scale</div>
        <div className="text-sm md:text-base mb-4">
          We specialize in building fast, responsive, and user-friendly websites tailored to your business goals. From landing pages to full-scale dynamic platforms, we ensure your site not only looks great but also performs flawlessly across devices. With modern tech stacks, SEO optimization, and scalable backend architectures, we create digital experiences that drive results — whether it&apos;s lead generation, eCommerce, or portfolio showcasing.
        </div>
        <div className="text-sm md:text-base font-semibold mb-1">Services include:</div>
        <ul className="list-disc pl-5 text-sm md:text-base space-y-1">
          <li><span className="font-bold">Business & Portfolio Websites</span></li>
          <li><span className="font-bold">E-Commerce & CMS Development</span></li>
          <li><span className="font-bold">SEO-Optimized &amp; Mobile-First Design</span></li>
          <li><span className="font-bold">Custom Web Applications</span></li>
          <li><span className="font-bold">Ongoing Maintenance & Support</span></li>
        </ul>
      </>
    ),
  },
  {
    key: 'app',
    label: 'App Dev',
    icon: '📱',
    heading: 'App Development',
    content: (
      <>
        <div className="font-bold text-base md:text-lg mb-2">Modern Mobile Apps for Every Platform</div>
        <div className="text-sm md:text-base mb-4">
          We build high-performance mobile applications for iOS and Android, focusing on seamless user experience, robust functionality, and scalable architecture. Whether you need a business app, eCommerce solution, or custom tool, we deliver apps that engage and retain users.
        </div>
        <div className="text-sm md:text-base font-semibold mb-1">Services include:</div>
        <ul className="list-disc pl-5 text-sm md:text-base space-y-1">
          <li><span className="font-bold">iOS & Android App Development</span></li>
          <li><span className="font-bold">Cross-Platform Solutions</span></li>
          <li><span className="font-bold">UI/UX Design & Prototyping</span></li>
          <li><span className="font-bold">App Store Optimization</span></li>
          <li><span className="font-bold">Ongoing Support & Updates</span></li>
        </ul>
      </>
    ),
  },
  {
    key: 'marketing',
    label: 'Digital Marketing',
    icon: '📈',
    heading: 'Digital Marketing',
    content: (
      <>
        <div className="font-bold text-base md:text-lg mb-2">Grow Your Reach & Revenue</div>
        <div className="text-sm md:text-base mb-4">
          Our digital marketing services help you connect with your audience and drive measurable results. From social media campaigns to targeted ads and SEO, we help you build brand awareness and generate leads.
        </div>
        <div className="text-sm md:text-base font-semibold mb-1">Services include:</div>
        <ul className="list-disc pl-5 text-sm md:text-base space-y-1">
          <li><span className="font-bold">Social Media Marketing</span></li>
          <li><span className="font-bold">Facebook & Instagram Ads</span></li>
          <li><span className="font-bold">SEO & Content Marketing</span></li>
          <li><span className="font-bold">Analytics & Reporting</span></li>
        </ul>
      </>
    ),
  },
  {
    key: 'listing',
    label: 'Product Listing',
    icon: '🛒',
    heading: 'Product Listing',
    content: (
      <>
        <div className="font-bold text-base md:text-lg mb-2">Showcase & Sell Your Products Online</div>
        <div className="text-sm md:text-base mb-4">
          We help you list, manage, and optimize your products on eCommerce platforms for maximum visibility and sales. Our team ensures your listings are attractive, informative, and conversion-focused.
        </div>
        <div className="text-sm md:text-base font-semibold mb-1">Services include:</div>
        <ul className="list-disc pl-5 text-sm md:text-base space-y-1">
          <li><span className="font-bold">Shopify & WooCommerce Setup</span></li>
          <li><span className="font-bold">Product Photography & Descriptions</span></li>
          <li><span className="font-bold">SEO for Product Listings</span></li>
          <li><span className="font-bold">Inventory Management</span></li>
        </ul>
      </>
    ),
  },
];

export default function ServiceDetailsSection() {
  const [activeTab, setActiveTab] = useState('web');
  const tab = TABS.find(t => t.key === activeTab) || TABS[0];

  return (
    <section className="w-full flex flex-col items-center justify-center py-10 px-2 md:px-0">
      <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl bg-[#151515] rounded-2xl shadow-2xl mx-auto p-0 border border-white/10">
        {/* Tabs */}
        <div className="flex flex-row gap-2 md:gap-4 p-3 md:p-4 pb-0">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`px-4 py-2 rounded-full font-semibold text-sm md:text-base transition-all duration-200 focus:outline-none ${activeTab === t.key ? 'bg-white text-black shadow-md' : 'bg-neutral-800 text-white hover:bg-neutral-700'}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        {/* Content */}
        <div className="p-5 md:p-8 text-white">
          <div className="flex items-center gap-2 mb-3 justify-center">
            <span className="text-2xl md:text-3xl">{tab.icon}</span>
            <span className="text-xl md:text-2xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{tab.heading}</span>
          </div>
          {tab.content}
        </div>
      </div>
    </section>
  );
} 