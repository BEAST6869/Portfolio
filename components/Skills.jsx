import { SiPython, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiReact, SiNextdotjs, SiMongodb, SiExpress, SiNodedotjs, SiPrisma, SiC, SiDocker, SiTypescript, SiLinux, SiGit } from 'react-icons/si';

export default function Skills() {
    const skills = [
        { name: 'Python', icon: SiPython },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'HTML', icon: SiHtml5 },
        { name: 'CSS', icon: SiCss3 },
        { name: 'Tailwind', icon: SiTailwindcss },
        { name: 'React', icon: SiReact },
        { name: 'Next.js', icon: SiNextdotjs },
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'Express', icon: SiExpress },
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Prisma', icon: SiPrisma },
        { name: 'C', icon: SiC },
        { name: 'Docker', icon: SiDocker },
        { name: 'TypeScript', icon: SiTypescript },
        { name: 'Linux', icon: SiLinux },
        { name: 'Git', icon: SiGit },
    ];

    return (
        <section id="skills" className="w-full max-w-4xl py-6 border-t border-white/5">
            <div className="p-8 rounded-3xl bg-[#111111] border border-white/5 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-white text-left">Tech Stack</h2>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex flex-col items-center justify-center gap-2 group cursor-default p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300">
                            <skill.icon className="text-3xl text-gray-400 group-hover:text-white transition-colors" />
                            <span className="text-gray-400 group-hover:text-white text-xs font-medium transition-colors">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
