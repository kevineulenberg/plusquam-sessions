const About = () => {
    const points = [
        { title: "10-Minute Lightning Talks", desc: "Concise, high-impact stories from the heart of the network." },
        { title: "Member-Led Growth", desc: "Learn from the real-world successes and lessons of your peers." },
        { title: "Genuine Connections", desc: "Find your next partner through shared expertise, not small talk." }
    ];

    return (
        <section className="py-24 px-4 bg-white/[0.02]">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">What is a Plusquam Session?</h2>
                        <p className="text-lg text-white/50 leading-relaxed max-w-lg mb-8">
                            Plusquam Sessions are built for the fast-paced life of founders and freelancers.
                            No corporate fluff, just pure knowledge transfer in 10-minute bursts.
                            It's the curated space where members inspire each other.
                        </p>
                    </div>

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
