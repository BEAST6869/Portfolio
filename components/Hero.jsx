import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import Scene3D from './Scene3D';

export default function Hero() {
    return (
        <section id="hero" className="relative flex flex-col items-center justify-center min-h-screen w-full max-w-4xl text-center pt-20 animate-fade-in opacity-0">
            {/* 3D Background */}
            <Scene3D />

            <div className="mb-8 relative z-10">

                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center mx-auto mb-6 overflow-hidden">
                    <img
                        src="/assets/beast.jpg"
                        alt="Ujjwal Tiwari"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>


                <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-4 text-white">
                    Ujjwal Tiwari
                </h1>


                <p className="text-xl sm:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto font-light">
                    Developer and DevOps Engineer
                </p>


                <div className="flex items-center justify-center gap-6 mb-12">

                    <a href="mailto:ujjwalt616@gmail.com" className="group relative p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300">
                        <FaEnvelope className="text-xl text-gray-300 group-hover:text-white transition-colors" />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Email</span>
                    </a>
                    <a href="https://www.linkedin.com/in/ujjwal-tiwari-29801b342/" target="_blank" rel="noopener noreferrer" className="group relative p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300">
                        <FaLinkedin className="text-xl text-gray-300 group-hover:text-white transition-colors" />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">LinkedIn</span>
                    </a>
                    <a href="https://github.com/BEAST6869" target="_blank" rel="noopener noreferrer" className="group relative p-4 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300">
                        <FaGithub className="text-xl text-gray-300 group-hover:text-white transition-colors" />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">GitHub</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
