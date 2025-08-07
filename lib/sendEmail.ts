// lib/sendEmail.ts
import emailjs from '@emailjs/browser';

export const sendEmail = async (formData: {
  name: string;
  email: string;
  mobile: string;
  jobTitle: string;
}) => {
  try {
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        user_name: formData.name,
        user_email: formData.email,
        user_mobile: formData.mobile,
        job_title: formData.jobTitle,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
    return result;
  } catch (error) {
    console.error('EmailJS Error:', error);
    return null;
  }
};
