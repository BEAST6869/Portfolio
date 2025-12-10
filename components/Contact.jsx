export default function Contact() {
    return (
        <section id="contact" className="w-full max-w-4xl py-20 border-t border-white/5 mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Get In Touch</h2>
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <p className="text-gray-400 mb-6 max-w-md">
                    Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                <button className="px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                    Say Hello
                </button>
            </div>
        </section>
    );
}
