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
        { name: 'Experience', icon: FaBriefcase, id: 'experience' },
        { name: 'Skills', icon: FaCode, id: 'skills' },
        { name: 'Projects', icon: FaFolderOpen, id: 'projects' },
        { name: 'Contact', icon: FaEnvelope, id: 'contact' },
        { name: 'Terminal', icon: FaTerminal, id: 'terminal' },
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Navbar height offset
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

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
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-gray-300 transition-all duration-300 rounded-full hover:bg-white/10 hover:text-white active:scale-95 cursor-pointer"
                >
                    <item.icon />
                    <span>{item.name}</span>
                </button>
            ))}
        </nav>
    );
}
