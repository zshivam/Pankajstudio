import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, phone, service, eventDate, location, message } = await request.json();

    if (!name || !email || !service || !message) {
      return NextResponse.json({ success: false, error: 'Required fields missing.' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    const serviceLabel = {
      wedding: 'Wedding', 'pre-wedding': 'Pre-Wedding', maternity: 'Maternity',
      baby: 'Baby Shoot', birthday: 'Birthday', corporate: 'Corporate', 'cinema-4k': '4K Cinema',
    }[service] || service;

    await transporter.sendMail({
      from: `"Pankaj Studio Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT,
      replyTo: email,
      subject: `New Enquiry — ${serviceLabel} — ${name}`,
      html: `<div style="font-family:sans-serif;max-width:560px;color:#1a1714">
        <h2 style="font-size:20px;font-weight:400;border-bottom:1px solid #e4dfd9;padding-bottom:12px">New Booking Enquiry</h2>
        <table style="width:100%;margin:20px 0;border-collapse:collapse">
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0ece7;color:#9a9087;font-size:11px;width:120px">Name</td><td style="padding:8px 0;border-bottom:1px solid #f0ece7">${name}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0ece7;color:#9a9087;font-size:11px">Email</td><td style="padding:8px 0;border-bottom:1px solid #f0ece7"><a href="mailto:${email}">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f0ece7;color:#9a9087;font-size:11px">Phone</td><td style="padding:8px 0;border-bottom:1px solid #f0ece7">${phone}</td></tr>` : ''}
          <tr><td style="padding:8px 0;border-bottom:1px solid #f0ece7;color:#9a9087;font-size:11px">Service</td><td style="padding:8px 0;border-bottom:1px solid #f0ece7">${serviceLabel}</td></tr>
          ${eventDate ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f0ece7;color:#9a9087;font-size:11px">Event Date</td><td style="padding:8px 0;border-bottom:1px solid #f0ece7">${eventDate}</td></tr>` : ''}
          ${location ? `<tr><td style="padding:8px 0;border-bottom:1px solid #f0ece7;color:#9a9087;font-size:11px">Location</td><td style="padding:8px 0;border-bottom:1px solid #f0ece7">${location}</td></tr>` : ''}
        </table>
        <div style="background:#f8f7f5;padding:16px 20px;border-left:2px solid #1a1714;margin:20px 0">
          <p style="color:#5c5348;line-height:1.75">${message.replace(/\n/g, '<br>')}</p>
        </div>
      </div>`,
    });

    await transporter.sendMail({
      from: `"Pankaj Studio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your enquiry — Pankaj Studio",
      html: `<div style="font-family:sans-serif;max-width:520px;color:#1a1714">
        <h2 style="font-size:20px;font-weight:400;font-style:italic">Thank you, ${name}.</h2>
        <p style="color:#5c5348;line-height:1.75;margin:16px 0">We have received your enquiry about <strong>${serviceLabel}</strong> and will get back to you within 24 hours.</p>
        <p style="color:#9a9087;font-size:12px;border-top:1px solid #e4dfd9;padding-top:16px">Pankaj Studio · Lucknow, India</p>
      </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send. Please try again.' }, { status: 500 });
  }
}
