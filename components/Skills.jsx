export default function Skills() {
    return (
        <section id="skills" className="w-full max-w-4xl py-20 border-t border-white/5">
            <h2 className="text-3xl font-bold mb-10 text-center">Skills</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-default">
                        <span className="text-gray-500">Skill {i}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
