import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, talkTitle, coreMessage, format, preferredMonth, contact } = req.body;

    // Validate required fields
    if (!name || !talkTitle || !coreMessage || !format || !contact) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true', // true for port 465
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const mailHtml = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
      <h2 style="color: #A855F7;">New Talk Submission 🎤</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 8px 0; color: #666; width: 160px;">Name</td><td style="padding: 8px 0;"><strong>${name}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Talk Title</td><td style="padding: 8px 0;"><strong>${talkTitle}</strong></td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Format</td><td style="padding: 8px 0;">${format}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Preferred Month</td><td style="padding: 8px 0;">${preferredMonth || '—'}</td></tr>
        <tr><td style="padding: 8px 0; color: #666;">Contact</td><td style="padding: 8px 0;">${contact}</td></tr>
      </table>
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
      <h3 style="margin-bottom: 8px;">Core Message</h3>
      <p style="line-height: 1.6; color: #333;">${coreMessage}</p>
    </div>
  `;

    try {
        await transporter.sendMail({
            from: `"Plusquam Sessions" <${process.env.SMTP_FROM}>`,
            to: process.env.SMTP_TO,
            subject: `🎤 New Talk Submission: "${talkTitle}" by ${name}`,
            html: mailHtml,
        });

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('SMTP error:', error);
        return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
}
