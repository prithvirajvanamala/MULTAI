"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Building2,
  MessageSquareText,
  Loader2,
} from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";

// smooth ease
const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactPageContent() {
  const { form, loading, ok, err, onChange, handleSubmit } = useContactForm();

  return (
    <section className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Get in{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                touch
              </span>
            </h1>
            <p className="mt-3 text-lg text-gray-700 max-w-2xl">
              Tell us about your project, support request, or partnership idea.
              We usually reply within one business day.
            </p>
          </motion.div>

          {/* Top tiles: Email, UK Phone, Location */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.05 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <Tile>
              <InfoTile
                icon={<Mail className="h-5 w-5" />}
                title="Email"
                value="info@multai.co.uk"
                href="mailto:info@multai.co.uk"
              />
            </Tile>

            <Tile>
              <InfoTile
                icon={<Phone className="h-5 w-5" />}
                title="Phone (UK)"
                value="+44 7442245995"
                href="tel:+447442245995"
              />
            </Tile>

            <Tile>
              <InfoTile
                icon={<MapPin className="h-5 w-5" />}
                title="Location"
                value="Waltham Cross, EN99AX"
                href="https://maps.google.com/?q=MULTAI%20LTD%2C%2093%20Leven%20Dr%2C%20Waltham%20Cross%2C%20EN99AX%2C%20England%2C%20United%20Kingdom"
              />
            </Tile>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="rounded-3xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">Send a message</h2>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Prefer email? Reach us at{" "}
              <a
                className="text-blue-600 hover:underline"
                href="mailto:info@multai.co.uk"
              >
                info@multai.co.uk
              </a>
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4" aria-busy={loading}>
              {err && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {err}
                </div>
              )}
              {ok && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                  {ok}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  name="name"
                  value={form.name}
                  onChange={onChange("name")}
                  placeholder="Priya Sharma"
                  required
                  autoComplete="name"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="you@company.com"
                  required
                  autoComplete="email"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={onChange("phone")}
                  placeholder="+44 7442 245 995"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                />
                <Input
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={onChange("subject")}
                  placeholder="Project inquiry / Support / Partnership"
                  required
                />
              </div>

              <Textarea
                label="Message"
                name="message"
                value={form.message}
                onChange={onChange("message")}
                rows={6}
                placeholder="Share a bit about your goals, timeline, and budget (if available)…"
                required
              />

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Send message
                </button>
                <span className="text-xs text-gray-500">
                  We’ll never share your details. See our{" "}
                  <a href="/privacy" className="text-blue-600 hover:underline">
                    privacy policy
                  </a>
                  .
                </span>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Sidebar: Office + Map */}
        <div className="space-y-4 h-max">
          {/* UK Office */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
            className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-6 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">Our Office</h3>
            </div>
            <div className="mt-4 grid gap-4">
              <Office
                title="United Kingdom"
                lines={[
                  "MULTAI LTD",
                  "93 Leven Dr",
                  "Waltham Cross, EN99AX",
                  "England, United Kingdom",
                ]}
                email="info@multai.co.uk"
                phone="+44 7442245995"
                altPhone="+44 7865 273561"
              />
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
            className="rounded-3xl border border-gray-200 bg-white p-3 shadow-sm"
          >
            <div className="aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gray-100">
              <iframe
                title="MULTAI LTD Location"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://maps.google.com/maps?q=${encodeURIComponent(
                  "MULTAI LTD, 93 Leven Dr, Waltham Cross, EN99AX, England, United Kingdom"
                )}&output=embed`}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// UI components remain the same
function Tile({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
      whileHover={{ y: -3 }}
      className="transition"
    >
      {children}
    </motion.div>
  );
}

function InfoTile({
  icon,
  title,
  value,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {title}
          </div>
          <div className="text-sm font-medium text-gray-900">{value}</div>
        </div>
      </div>
    </div>
  );
  return href ? (
    <a
      href={href}
      className="block"
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
    >
      {content}
    </a>
  ) : (
    content
  );
}

function Office({
  title,
  lines,
  email,
  phone,
  altPhone,
}: {
  title: string;
  lines: string[];
  email: string;
  phone: string;
  altPhone?: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <div className="text-sm font-semibold text-gray-900">{title}</div>
      <div className="mt-1 text-sm text-gray-700">
        {lines.map((l) => (
          <div key={l}>{l}</div>
        ))}
      </div>
      <div className="mt-2 text-xs text-gray-600">
        <span className="font-medium">Phone:</span>{" "}
        <a className="hover:underline" href={`tel:${phone}`}>
          {phone}
        </a>
        {altPhone && (
          <>
            <br />
            <span className="font-medium">Alt Phone:</span>{" "}
            <a className="hover:underline" href={`tel:${altPhone}`}>
              {altPhone}
            </a>
          </>
        )}
        <br />
        <span className="font-medium">Email:</span>{" "}
        <a className="hover:underline" href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );
}

function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }
) {
  const { label, className, ...rest } = props;
  return (
    <label className="space-y-1 text-sm block">
      <span className="font-medium text-gray-900">{label}</span>
      <input
        {...rest}
        className={`w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          className ?? ""
        }`}
      />
    </label>
  );
}

function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }
) {
  const { label, className, ...rest } = props;
  return (
    <label className="space-y-1 text-sm block">
      <span className="font-medium text-gray-900">{label}</span>
      <textarea
        {...rest}
        className={`w-full rounded-xl border border-gray-300 bg-white py-2.5 px-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
          className ?? ""
        }`}
      />
    </label>
  );
}