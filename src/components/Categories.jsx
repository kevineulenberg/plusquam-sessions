import { motion } from 'framer-motion';
import { MapPin, Trophy, TrendingUp, MessageCircle, Palette, Bot, Layers, Brain, Users } from 'lucide-react';

const categories = [
    {
        num: '01',
        icon: MapPin,
        title: 'The Real Journey',
        desc: `Building a business is rarely a straight line. Share your messy middle — the pivot that saved everything, the moment you almost quit, or the decision that changed the whole direction.`,
    },
    {
        num: '02',
        icon: Trophy,
        title: 'Wins & Fails',
        desc: `Your best result or your most spectacular failure — both make unforgettable talks. What shipped, what blew up, and what would you do completely differently next time?`,
    },
    {
        num: '03',
        icon: TrendingUp,
        title: 'Marketing That Actually Worked',
        desc: `A campaign that flopped, a growth move that surprised you, or the positioning shift no one saw coming. Show us what really moved the needle — not just the success story, but the test-and-learn behind it.`,
    },
    {
        num: '04',
        icon: MessageCircle,
        title: 'The Sales Conversation',
        desc: `The pitch that landed, the one that fell apart, or the sales process you wish you'd built six months earlier.Real deals, real lessons — no sanitized case studies.`,
    },
    {
        num: '05',
        icon: Palette,
        title: 'Design Decisions',
        desc: `The UX choice that delighted users, the rebrand that sparked a new direction, or the design system you built from scratch. Show us the thinking behind how things look and feel.`,
    },
    {
        num: '06',
        icon: Bot,
        title: 'AI & Automation',
        desc: `How you're actually using AI in your day-to-day. What's working, what's overhyped, and where you think this is heading. Practical beats theoretical every time.`,
    },
    {
        num: '07',
        icon: Layers,
        title: 'The Stack Behind It',
        desc: `The tool that 10x'd your workflow, the setup you swear by, or the technology rabbit hole you fell into. Show us what's actually in your toolkit and why.`,
    },
    {
        num: '08',
        icon: Brain,
        title: 'Deep Expertise',
        desc: `That one topic only you can really explain — a niche technology, an unconventional approach, or years of hard-won knowledge distilled into 10 minutes. If it's obscure, even better.`,
    },
    {
        num: '09',
        icon: Users,
        title: "Let's Build Something",
        desc: `Got an idea that needs a co-founder? A project looking for the right collaborator? A role worth getting excited about? Use your 10 minutes to find your people.`,
    },
];

const Categories = () => {
    return (
        <section className="py-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Find your angle.</h2>
                    <p className="text-white/50 max-w-xl text-lg">
                        Any topic is welcome. Here are nine topics to spark your talk idea, and we'd love to see what you come up with.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((cat, i) => (
                        <motion.div
                            key={cat.num}
                            whileHover={{ y: -4 }}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06 }}
                            viewport={{ once: true }}
                            className="glass-card p-7 group hover:bg-white/10 hover:border-plusquam-purple/30 transition-all"
                        >
                            <div className="flex items-start justify-between mb-5">
                                <cat.icon className="w-7 h-7 text-plusquam-purple group-hover:scale-110 transition-transform" />
                                <span className="text-xs font-mono text-white/20">{cat.num}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">{cat.title}</h3>
                            <p className="text-white/45 text-sm leading-relaxed">{cat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
