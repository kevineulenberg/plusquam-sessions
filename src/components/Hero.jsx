import { motion } from 'framer-motion';
import WebGLBackground from './WebGLBackground';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
            <WebGLBackground />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center max-w-5xl mx-auto z-10"
            >
                <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1]">
                    Your Stage. Your Story. <br />
                    <motion.span
                        className="text-plusquam-purple"
                        animate={{
                            textShadow: [
                                "0 0 20px rgba(168, 85, 247, 0.3)",
                                "0 0 50px rgba(168, 85, 247, 0.8)",
                                "0 0 20px rgba(168, 85, 247, 0.3)",
                            ],
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        plusquam Sessions.
                    </motion.span>
                </h1>

                <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-12">
                    Join our monthly lightning talk series for freelancers and founders.
                    10 minutes to share your insights and spark connections.
                </p>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-black px-10 py-5 rounded-full font-semibold text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-shadow"
                    onClick={() => document.getElementById('submit-form').scrollIntoView({ behavior: 'smooth' })}
                >
                    Pitch Your Talk
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Hero;
