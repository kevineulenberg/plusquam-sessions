import { motion } from 'framer-motion';

const SubmissionForm = () => {
    return (
        <section id="submit-form" className="py-24 px-4 transition-all">
            <div className="max-w-3xl mx-auto glass-card p-10 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-plusquam-purple/10 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-4xl font-display font-bold mb-6">Pitch Your Idea</h2>
                    <p className="text-white/50 mb-10 max-w-lg">
                        Don’t overthink it. Fill out this quick form in under 2 minutes, and our team will get back to you to finalize the details.
                    </p>

                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70 ml-1">Your Name *</label>
                                <input type="text" placeholder="How should we introduce you?" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-plusquam-purple/50 transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70 ml-1">Talk Title *</label>
                                <input type="text" placeholder="Make it punchy..." required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-plusquam-purple/50 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-1">The Core Message *</label>
                            <textarea placeholder="What is the one thing people will learn?" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-plusquam-purple/50 transition-colors resize-none" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70 ml-1">Format *</label>
                                <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-plusquam-purple/50 transition-colors appearance-none">
                                    <option className="bg-background">Lightning Talk (10m)</option>
                                    <option className="bg-background">Deep Dive (20m)</option>
                                    <option className="bg-background">Fireside (Panel)</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/70 ml-1">Preferred Date</label>
                                <input type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-plusquam-purple/50 transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-white/70 ml-1">Contact Method *</label>
                            <input type="text" placeholder="Email or Slack handle..." required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-plusquam-purple/50 transition-colors" />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-plusquam-purple py-4 rounded-xl font-bold text-lg mt-4 shadow-lg shadow-plusquam-purple/20"
                        >
                            Submit for the Next Session
                        </motion.button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SubmissionForm;
