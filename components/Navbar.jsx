'use client';

import { useState, useEffect } from 'react';
import { FaBriefcase, FaCode, FaFolderOpen, FaEnvelope, FaTerminal } from 'react-icons/fa';

export default function Navbar() {
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
    );
}
