import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="py-24 px-4 border-t border-white/5">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h3 className="text-3xl font-display font-bold mb-2">Ready to inspire?</h3>
                <p className="text-white/50 mb-8">Be part of the next session and grow with us.</p>

                <div className="flex gap-4">
                    <button
                        className="text-plusquam-purple font-semibold hover:underline"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Back to top
                    </button>
                    <span className="text-white/20">•</span>
                    <button className="text-white/50 hover:text-white transition-colors">Contact Organizers</button>
                </div>

                <div className="mt-16 text-white/20 text-sm">
                    © {new Date().getFullYear()} Plusquam Network. Crafted with session.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
