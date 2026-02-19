import { motion } from 'framer-motion';

const About = () => {
    const points = [
        { title: "10 Minutes, No Filler", desc: "Short enough to stay sharp. Long enough to go somewhere interesting." },
        { title: "Peer-to-Peer Learning", desc: "Real experiences from real people — wins, failures, and everything in between." },
        { title: "Connections That Stick", desc: "Meet collaborators, clients, or kindred spirits through what you actually care about." }
    ];

    return (
        <section className="py-24 px-4 bg-white/2">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">What is a Plusquam Session?</h2>
                        <p className="text-lg text-white/50 leading-relaxed max-w-lg mb-8">
                            Plusquam Sessions are a space for anyone with something worth sharing. Founders, freelancers, designers, thinkers, tinkerers — or simply someone with a story, a tool, or an idea that others might find useful. No stage fright required. Just 10 minutes, a curious audience, and a conversation worth having.
                        </p>
                    </motion.div>

                    <div className="space-y-8">
                        {points.map((point, i) => (
                            <div
                                key={i}
                                className="glass-card p-6 border-l-4 border-plusquam-purple"
                            >
                                <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                                <p className="text-white/50">{point.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
