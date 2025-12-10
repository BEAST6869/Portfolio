import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function Projects() {
    const projects = [
        {
            title: "PassOp - Password Manager",
            description: "A secure password manager with JWT authentication and Google Login support.",
            tech: ["React", "Tailwind", "Express", "MongoDB", "JWT"],
            link: "https://pass-op-pi-topaz.vercel.app/"
        },
        {
            title: "Discord Casino Bot",
            description: "A feature-rich Discord bot with a server-wide economy, casino games, and user customization.",
            tech: ["TypeScript", "Node.js", "Prisma"],
            link: null
        },
        {
            title: "Freelance Client Website",
            description: "Dynamic musician portfolio fetching and displaying songs/playlists directly from source.",
            tech: ["Frontend", "Dynamic API"],
            link: "https://shelbymackaymusic.com/"
        }
    ];

    return (
        <section id="projects" className="w-full max-w-4xl py-6 border-t border-white/5">
            <div className="p-8 rounded-3xl bg-[#111111] border border-white/5 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-white text-left">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <div key={index} className="group p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 flex flex-col justify-between h-full">
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            <FaExternalLinkAlt size={16} />
                                        </a>
                                    )}
                                </div>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {project.tech.map((tech, i) => (
                                    <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/5">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
