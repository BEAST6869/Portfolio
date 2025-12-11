export default function Contact() {
    return (
        <section id="contact" className="w-full max-w-4xl py-12 sm:py-20 border-t border-white/5 mb-12 sm:mb-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">Get In Touch</h2>
            <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <p className="text-sm sm:text-base text-gray-400 mb-6 max-w-md px-4">
                    Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                </p>
                <a
                    href="mailto:ujjwalt616@gmail.com"
                    className="px-6 sm:px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors cursor-pointer text-sm sm:text-base"
                >
                    Say Hello
                </a>
            </div>
        </section>
    );
}
