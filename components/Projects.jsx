export default function Projects() {
    return (
        <section id="projects" className="w-full max-w-4xl py-20 border-t border-white/5">
            <h2 className="text-3xl font-bold mb-10 text-center">Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="aspect-video rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group overflow-hidden relative">
                        <span className="text-gray-500 group-hover:opacity-0 transition-opacity">Project Placeholder {i}</span>
                        <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                ))}
            </div>
        </section>
    );
}
