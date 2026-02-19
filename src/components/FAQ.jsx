const FAQ = () => {
    const faqs = [
        {
            q: `Who can speak at a Plusquam Session?`,
            a: `Anyone — members and guests alike. You don't need a title, a finished product, or years of experience. If you have something worth sharing, we'd love to hear it. Founders, freelancers, designers, developers, creatives, and curious minds of all kinds are welcome on stage.`,
        },
        {
            q: `What should my talk actually achieve?`,
            a: `One clear takeaway is all you need. Ask yourself: what's the one thing someone should leave with? A new perspective, a tool they'll try tomorrow, a lesson that took you months to learn — it doesn't have to be groundbreaking. It just has to be useful or honest. The best talks leave people thinking, not just nodding.`,
        },
        {
            q: `Do I need a polished presentation?`,
            a: `Not at all. A rough idea and a genuine story are a better starting point than a perfect deck. Once you submit, we'll help you shape your message into a focused 10-minute talk — no speaker experience required.`,
        },
        {
            q: `Are slides mandatory?`,
            a: `No. Some of the most memorable talks are just a person and a story. Slides are supported if they help, but they're never expected.`,
        },
        {
            q: `Can I talk about something that didn't go well?`,
            a: `Please do. Fail stories, wrong turns, and expensive lessons are some of the most valuable things you can share. There's no highlight reel required here.`,
        },
        {
            q: `How long is a Plusquam Session talk?`,
            a: `10 minutes, followed by an open Q&A with the audience. Short enough to stay sharp — and there's always time to go deeper in the conversation afterwards.`,
        },
        {
            q: `What happens after I submit?`,
            a: `We'll review your submission and get back to you within a few days. If your talk is a good fit for an upcoming session, we'll reach out to schedule a quick call and help you get ready.`,
        },
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
