import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Guard: fail fast with a clear message if env vars are missing
    const envCheck = {
        SMTP_HOST: !!process.env.SMTP_HOST,
        SMTP_PORT: !!process.env.SMTP_PORT,
        SMTP_USER: !!process.env.SMTP_USER,
        SMTP_PASS: !!process.env.SMTP_PASS,
        SMTP_FROM: !!process.env.SMTP_FROM,
        SMTP_TO: !!process.env.SMTP_TO,
    };
    console.log('ENV check:', JSON.stringify(envCheck));

    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error('Missing SMTP environment variables:', envCheck);
        return res.status(500).json({ error: 'Server configuration missing.', envCheck });
    }

    const { name, talkTitle, coreMessage, format, preferredMonth, contact } = req.body;

    if (!name || !talkTitle || !coreMessage || !format || !contact) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
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
        console.log('Attempting SMTP connection to:', process.env.SMTP_HOST, ':', process.env.SMTP_PORT);

        const info = await transporter.sendMail({
            from: `"Plusquam Sessions" <${process.env.SMTP_FROM}>`,
            to: process.env.SMTP_TO,
            replyTo: contact.includes('@') ? contact : undefined,
            subject: `🎤 New Talk Submission: "${talkTitle}" by ${name}`,
            html: mailHtml,
        });

        console.log('Mail sent successfully:', info.messageId);
        return res.status(200).json({ success: true });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const stack = error instanceof Error ? error.stack : '';
        console.error('SMTP Error:', message);
        console.error('SMTP Stack:', stack);
        return res.status(500).json({ error: message });
    }
}
