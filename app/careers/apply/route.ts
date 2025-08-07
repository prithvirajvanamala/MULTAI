// app/api/apply/route.ts
import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const mobile = formData.get('mobile') as string
    const role = formData.get('role') as string
    const experience = formData.get('experience') as string
    const location = formData.get('location') as string
    const resumeFile = formData.get('resume') as File

    // Validate file
    if (!resumeFile || resumeFile.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Resume must be a PDF' }, { status: 400 })
    }

    // Convert file to buffer
    const fileBuffer = Buffer.from(await resumeFile.arrayBuffer())
    const safeName = fullName.trim().replace(/\s+/g, '_')
    const fileName = `${Date.now()}-${safeName}.pdf`

    // Upload to Supabase Storage
    const { data: storageData, error: storageError } = await supabase.storage
      .from('resumes')
      .upload(fileName, fileBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      })

    if (storageError) {
      console.error('[Supabase Storage Error]', storageError)
      return NextResponse.json({ error: 'Resume upload failed' }, { status: 500 })
    }

    // Insert into Supabase DB
    const { error: insertError } = await supabase.from('job_applications').insert([
      {
        full_name: fullName,
        email,
        mobile,
        role,
        experience,
        location,
        resume_path: storageData?.path,
      },
    ])

    if (insertError) {
      console.error('[Supabase DB Error]', insertError)
      return NextResponse.json({ error: 'Failed to store application' }, { status: 500 })
    }

    // OPTIONAL: Email notification via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER!,
        pass: process.env.EMAIL_PASS!,
      },
    })

    const mailOptions = {
      from: process.env.EMAIL_USER!,
      to: process.env.EMAIL_RECEIVER!,
      subject: `📄 New Application for ${role}`,
      text: `
New job application received:

Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Location: ${location}
Experience: ${experience}
Resume Path: ${storageData?.path}
      `.trim(),
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err: any) {
    console.error('[API Error]', err)
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 })
  }
}
