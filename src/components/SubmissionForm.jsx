import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';

const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-plusquam-purple/50 transition-colors disabled:opacity-40';
const selectClass = `${inputClass} appearance-none`;

const SubmissionForm = () => {
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');
    const [form, setForm] = useState({
        name: '',
        talkTitle: '',
        coreMessage: '',
        format: 'Lightning Talk (10m)',
        preferredMonth: '',
        contact: '',
    });

    const months = useMemo(() => {
        const now = new Date();
        return Array.from({ length: 6 }, (_, i) => {
            const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
            return {
                value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
                label: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            };
        });
    }, []);

    const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Something went wrong.');
            }

            setStatus('success');
        } catch (err) {
            setErrorMsg(err.message);
            setStatus('error');
        }
    };

    const isLoading = status === 'loading';

    return (
        <section id="submit-form" className="py-24 px-4 transition-all">
            <div className="max-w-3xl mx-auto glass-card p-10 md:p-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-plusquam-purple/10 blur-3xl pointer-events-none" />

                <div className="relative z-10">
                    <h2 className="text-4xl font-display font-bold mb-6">Pitch Your Idea</h2>
                    <p className="text-white/50 mb-10 max-w-lg">
                        Don&apos;t overthink it. Fill out this quick form in under 2 minutes, and our team will get back to you to finalise the details.
                    </p>

                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center text-center gap-4 py-12"
                            >
                                <CheckCircle className="w-16 h-16 text-plusquam-purple" />
                                <h3 className="text-2xl font-bold">You&apos;re in the queue!</h3>
                                <p className="text-white/50 max-w-sm">
                                    We received your submission and will reach out soon to finalise your slot.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-6"
                                onSubmit={handleSubmit}
                            >
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Your Name *</label>
                                        <input
                                            type="text"
                                            placeholder="How should we introduce you?"
                                            required
                                            disabled={isLoading}
                                            value={form.name}
                                            onChange={set('name')}
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Talk Title *</label>
                                        <input
                                            type="text"
                                            placeholder="Make it punchy..."
                                            required
                                            disabled={isLoading}
                                            value={form.talkTitle}
                                            onChange={set('talkTitle')}
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-1">The Core Message *</label>
                                    <textarea
                                        placeholder="What is the one thing people will learn?"
                                        required
                                        rows={4}
                                        disabled={isLoading}
                                        value={form.coreMessage}
                                        onChange={set('coreMessage')}
                                        className={`${inputClass} resize-none`}
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Format *</label>
                                        <select
                                            required
                                            disabled={isLoading}
                                            value={form.format}
                                            onChange={set('format')}
                                            className={selectClass}
                                        >
                                            <option className="bg-background">Lightning Talk (10m)</option>
                                            <option className="bg-background">Deep Dive (20m)</option>
                                            <option className="bg-background">Fireside (Panel)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-white/70 ml-1">Preferred Month</label>
                                        <select
                                            disabled={isLoading}
                                            value={form.preferredMonth}
                                            onChange={set('preferredMonth')}
                                            className={selectClass}
                                        >
                                            <option value="" className="bg-background">No preference</option>
                                            {months.map((m) => (
                                                <option key={m.value} value={m.value} className="bg-background">{m.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-white/70 ml-1">Contact Method *</label>
                                    <input
                                        type="text"
                                        placeholder="Email or Slack handle..."
                                        required
                                        disabled={isLoading}
                                        value={form.contact}
                                        onChange={set('contact')}
                                        className={inputClass}
                                    />
                                </div>

                                {status === 'error' && (
                                    <div className="flex items-center gap-3 text-red-400 text-sm">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{errorMsg}</span>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                    disabled={isLoading}
                                    className="w-full bg-plusquam-purple py-4 rounded-xl font-bold text-lg mt-4 shadow-lg shadow-plusquam-purple/20 flex items-center justify-center gap-3 disabled:opacity-60"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader className="w-5 h-5 animate-spin" />
                                            Sending…
                                        </>
                                    ) : (
                                        'Submit for the Next Session'
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default SubmissionForm;
