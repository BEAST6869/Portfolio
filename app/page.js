'use client';

import { useState, useEffect } from 'react';
import { FaBriefcase, FaCode, FaFolderOpen, FaEnvelope, FaTerminal } from 'react-icons/fa';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Experience', icon: FaBriefcase },
    { name: 'Skills', icon: FaCode },
    { name: 'Projects', icon: FaFolderOpen },
    { name: 'Contact', icon: FaEnvelope },
    { name: 'Terminal', icon: FaTerminal },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Glass Navigation Bar */}
      <nav
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-1 sm:gap-4 px-2 py-2 sm:px-6 sm:py-3 w-max max-w-[95%] rounded-full transition-all duration-300 ${scrolled
            ? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50'
            : 'bg-transparent border border-transparent shadow-none'
          }`}
      >
        {navItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-300 transition-all duration-300 rounded-full hover:bg-white/10 hover:text-white hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] active:scale-95 cursor-pointer"
          >
            <item.icon />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area - Just for demonstration of the transparent navbar */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-20">
        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-to-br before:from-transparent before:to-blue-700 before:opacity-10 before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-to-t after:from-sky-900 after:via-sky-500 after:opacity-40 after:blur-2xl after:content-[''] z-[-1]">
          <h1 className="text-6xl font-extrabold tracking-tighter text-center sm:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Creative<br />Developer.
          </h1>
        </div>
        <p className="mt-8 text-lg text-gray-400 max-w-lg text-center">
          Building digital experiences with a focus on motion, aesthetics, and performance.
        </p>
      </main>

      {/* Extra content to enable scrolling to see the blur effect */}
      <section className="h-screen flex items-center justify-center bg-black/50">
        <h2 className="text-3xl font-bold text-gray-700">Scroll to see the glass effect</h2>
      </section>
    </div>
  );
}
