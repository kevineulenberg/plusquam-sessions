import { Rocket, Box, Sparkles, Brain, Users } from 'lucide-react';

const Categories = () => {
    const categories = [
        { title: "Founder Stories", icon: Rocket, desc: "Ups, downs, and critical pivots of building a business." },
        { title: "Tech & Tools", icon: Box, desc: "The stacks and workflows that actually drive efficiency." },
        { title: "Success & Learnings", icon: Sparkles, desc: "Dissecting the projects that taught us the most." },
        { title: "Niche Expertise", icon: Brain, desc: "Deep dives into specialized technologies or trends." },
        { title: "Pitch & Partner", icon: Users, desc: "Announcing ideas or finding the perfect collaborator." }
    ];

    return (
        <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Five Pillars of Insight</h2>
                    <p className="text-white/50">Any topic is welcome, but these are our community favorites.</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, i) => (
                        <div
                            key={i}
                            className="glass-card p-8 group hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
                        >
                            <cat.icon className="w-10 h-10 text-plusquam-purple mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold mb-3">{cat.title}</h3>
                            <p className="text-white/50">{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
