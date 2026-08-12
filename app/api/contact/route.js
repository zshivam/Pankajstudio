import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const STUDIO_PHONE = '916390237272'; // Pankaj Studio Official Phone / WhatsApp Number

export async function POST(request) {
  try {
    const { name, email, phone, service, eventDate, location, message } = await request.json();

    // 1. Validation check
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, error: 'Required fields missing.' },
        { status: 400 }
      );
    }

    // 2. Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Service label formatter
    const serviceLabelMap = {
      'Wedding Photography & Film': 'Wedding Photography & Film',
      'Pre-Wedding / Engagement': 'Pre-Wedding / Engagement',
      'Maternity Shoot': 'Maternity Shoot',
      'Baby / Newborn Shoot': 'Baby / Newborn Shoot',
      'Birthday & Milestone': 'Birthday & Milestone',
      'Corporate Event': 'Corporate Event',
      '4K Cinema Package': '4K Cinema Package',
    };
    const serviceLabel = serviceLabelMap[service] || service;

    // 3. Clean Customer Phone Number & Build One-Tap WhatsApp Reply Link
    let cleanCustomerPhone = phone ? phone.replace(/\D/g, '') : '';
    if (cleanCustomerPhone.length === 10) {
      cleanCustomerPhone = '91' + cleanCustomerPhone; // India Country Code (+91)
    }

    const prefilledText = encodeURIComponent(
      `Hi ${name}, thank you for reaching out to Pankaj Studio! Regarding your enquiry for ${serviceLabel}...`
    );
    const whatsappReplyLink = cleanCustomerPhone ? `https://wa.me/${cleanCustomerPhone}?text=${prefilledText}` : null;

    // 4. Send Notification Email to Admin (Pankaj Studio)
    await transporter.sendMail({
      from: `"Pankaj Studio Website" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECIPIENT || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Booking Enquiry — ${serviceLabel} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #1a1714; margin: 0 auto; border: 1px solid #e4dfd9; border-radius: 8px; padding: 24px; background-color: #ffffff;">
          <h2 style="font-size: 20px; font-weight: 600; border-bottom: 2px solid #d4af37; padding-bottom: 10px; margin-top: 0; color: #1a1714;">
            📸 New Booking Enquiry Received
          </h2>

          <table style="width: 100%; margin: 20px 0; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; color: #888; width: 130px;">Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; font-weight: bold; color: #1a1714;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; color: #888;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7;">
                <a href="mailto:${email}" style="color: #d4af37; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; color: #888;">Phone:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; font-weight: bold; color: #1a1714;">${phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; color: #888;">Service:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; font-weight: bold;">${serviceLabel}</td>
            </tr>
            ${eventDate ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; color: #888;">Event Date:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7;">${eventDate}</td>
            </tr>` : ''}
            ${location ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7; color: #888;">Location:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f0ece7;">${location}</td>
            </tr>` : ''}
          </table>

          <div style="background: #f9f8f6; padding: 16px 20px; border-left: 4px solid #d4af37; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-size: 11px; color: #888; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px;">Customer Vision / Message:</p>
            <p style="margin: 0; color: #333; line-height: 1.6; font-size: 14px;">${message.replace(/\n/g, '<br>')}</p>
          </div>

          ${whatsappReplyLink ? `
          <div style="margin-top: 28px; text-align: center;">
            <a href="${whatsappReplyLink}" target="_blank" style="background-color: #25D366; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);">
              💬 Reply to ${name} on WhatsApp
            </a>
          </div>
          <p style="text-align: center; font-size: 11px; color: #999; margin-top: 10px;">
            Clicking this button will open WhatsApp with ${name} and pre-fill your greeting message.
          </p>
          ` : ''}
        </div>
      `,
    });

    // 5. Send Auto-Reply Confirmation Email to Customer
    await transporter.sendMail({
      from: `"Pankaj Studio" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "We received your enquiry — Pankaj Studio",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 520px; color: #1a1714; padding: 24px; border: 1px solid #eee; border-radius: 8px; margin: 0 auto;">
          <h2 style="font-size: 18px; font-weight: 600; color: #d4af37; margin-top: 0;">Thank you, ${name}!</h2>
          <p style="color: #444; line-height: 1.6; font-size: 14px;">
            We have received your enquiry regarding <strong>${serviceLabel}</strong>.
          </p>
          <p style="color: #444; line-height: 1.6; font-size: 14px;">
            Our team will review your requirements and get back to you shortly.
          </p>
          
          <div style="margin: 20px 0; padding: 12px; background-color: #f9f8f6; border-radius: 6px; text-align: center;">
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Need immediate assistance?</p>
            <a href="https://wa.me/${STUDIO_PHONE}" target="_blank" style="color: #25D366; font-weight: bold; text-decoration: none; font-size: 14px;">
              💬 Chat with us on WhatsApp (+91 6390237272)
            </a>
          </div>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="color: #888; font-size: 12px; margin: 0;">
            <strong>Pankaj Studio</strong> · Deoria, Uttar Pradesh, India<br/>
            Phone / WhatsApp: +91 6390237272
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}