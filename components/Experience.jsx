import { FaLaptopCode, FaGlobe, FaLayerGroup } from 'react-icons/fa';

export default function Experience() {
    const experiences = [
        {
            text: "Freelance projects on Web Development",
            icon: FaLaptopCode
        },
        {
            text: "Open Source Experience",
            icon: FaGlobe
        },
        {
            text: "Experience with Versatile Fields",
            icon: FaLayerGroup
        }
    ];

    return (
        <section id="experience" className="w-full max-w-4xl py-6 border-t border-white/5">
            <div className="p-8 rounded-3xl bg-[#111111] border border-white/5 shadow-lg">
                <h2 className="text-3xl font-bold mb-8 text-white text-left">Experience</h2>
                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <div key={index} className="flex items-center gap-6 group">
                            <div className="p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                <exp.icon className="text-2xl text-gray-400 group-hover:text-white transition-colors" />
                            </div>
                            <p className="text-lg text-gray-300 group-hover:text-white transition-colors">{exp.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
