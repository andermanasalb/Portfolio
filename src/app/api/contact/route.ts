import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()
    const apiKey = process.env.RESEND_API_KEY

    // Fallback for testing if no API key
    if (!apiKey || apiKey === 're_your_api_key_here') {
      console.warn('RESEND_API_KEY not found or default. Simulating success for testing.')
      return NextResponse.json({ success: true, message: 'Message simulated successfully (Development Mode)' })
    }

    const resend = new Resend(apiKey)

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['ander_manas@hotmail.com'],
      subject: `New Message from ${name} via Portfolio`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #111;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, '<br />')}
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending email via Resend:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in Contact API:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
