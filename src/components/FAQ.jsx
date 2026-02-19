const FAQ = () => {
    const faqs = [
        { q: "Who can speak at a Session?", a: "Every Plusquam member is welcome—whether you're a first-time speaker or a seasoned founder." },
        { q: "What if I don't have a finished presentation?", a: "We provide speaker coaching to help you distill your message into a perfect 10-minute format." },
        { q: "Are slides mandatory?", a: "Not at all. Some of our best talks are just a person and a story, though slides are supported." }
    ];

    return (
        <section className="py-24 px-4 bg-white/[0.02]">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-4xl font-display font-bold mb-12 text-center">Frequently Asked</h2>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="glass-card p-6"
                        >
                            <h3 className="font-bold mb-2 text-plusquam-purple">{faq.q}</h3>
                            <p className="text-white/50">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
