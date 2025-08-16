// src/hooks/useContactForm.tsx

import { useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export const useContactForm = () => {
  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [key]: e.target.value }));

  const isValidPhone = (v: string) => {
    const digits = v.replace(/\D/g, "");
    return digits.length >= 7 && digits.length <= 15;
  };

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email.";
    if (!isValidPhone(form.phone))
      return "Please enter a valid phone number (7–15 digits).";
    if (!form.subject.trim()) return "Please enter a subject.";
    if (form.message.trim().length < 10)
      return "Message should be at least 10 characters.";
    return null;
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    setOk(null);

    const v = validate();
    if (v) {
      setErr(v);
      return;
    }

    setErr(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data?.error || "Failed to send message.");

      setOk("Thanks! Your message has been sent. We’ll get back to you shortly.");
      formEl.reset();
      setForm(initial);
    } catch (e: any) {
      setErr(e?.message || "Something went wrong while sending your message.");
    } finally {
      setLoading(false);
    }
  }

  return {
    form,
    loading,
    ok,
    err,
    onChange,
    handleSubmit,
  };
};