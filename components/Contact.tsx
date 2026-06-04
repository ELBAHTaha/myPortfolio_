"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}
type FormErrors = Partial<Record<keyof FormState, string>>;

const directLinks = [
  { k: "Email", label: "tahaelbah@gmail.com", href: "mailto:tahaelbah@gmail.com" },
  { k: "Phone", label: "+212 6 55 75 75 81", href: "tel:+212655757581" },
  { k: "LinkedIn", label: "linkedin.com/in/tahaelbah", href: "https://linkedin.com/in/tahaelbah" },
  { k: "GitHub", label: "github.com/ELBAHTaha", href: "https://github.com/ELBAHTaha" },
];

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1] as const;

  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t("contact.nameError");
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = t("contact.emailError");
    if (!form.subject.trim()) e.subject = t("contact.subjectError");
    if (!form.message.trim()) e.message = t("contact.messageError");
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          user_name: form.name,
          from_email: form.email,
          user_email: form.email,
          reply_to: form.email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setSubmitted(true);
    } catch {
      setErrors({ message: t("contact.errorMessage") });
    } finally {
      setSending(false);
    }
  };

  const field = (
    key: keyof FormState,
    label: string,
    placeholder: string,
    type = "text",
    rows?: number
  ) => {
    const shared =
      "w-full bg-transparent border-b py-2.5 text-ink placeholder-ink-faint text-[0.95rem] outline-none transition-colors duration-200 focus:border-accent " +
      (errors[key] ? "border-accent" : "border-rule");
    return (
      <div>
        <label htmlFor={key} className="label text-ink-muted block mb-1">
          {label}
        </label>
        {rows ? (
          <textarea
            id={key}
            rows={rows}
            value={form[key]}
            onChange={(e) => {
              setForm((f) => ({ ...f, [key]: e.target.value }));
              setErrors((err) => ({ ...err, [key]: undefined }));
            }}
            placeholder={placeholder}
            className={shared + " resize-none"}
          />
        ) : (
          <input
            id={key}
            type={type}
            value={form[key]}
            onChange={(e) => {
              setForm((f) => ({ ...f, [key]: e.target.value }));
              setErrors((err) => ({ ...err, [key]: undefined }));
            }}
            placeholder={placeholder}
            className={shared}
          />
        )}
        <AnimatePresence>
          {errors[key] && (
            <motion.p
              className="font-mono text-[0.7rem] text-accent mt-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {errors[key]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section id="contact" className="py-[var(--section-y)]">
      <div className="shell" ref={ref}>
        {/* Header */}
        <header className="grid grid-cols-12 items-end gap-4 border-t border-ink pt-5 mb-12 md:mb-16">
          <div className="col-span-12 md:col-span-9 flex items-baseline gap-4">
            <span className="label text-accent">05</span>
            <h2
              className="font-display text-ink"
              style={{ fontSize: "var(--step-3)", lineHeight: 1 }}
            >
              {t("contact.title")}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <span className="label text-ink-muted flex items-center gap-2 md:justify-end">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" aria-hidden="true" />
              Open to opportunities
            </span>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-x-8 gap-y-14">
          {/* Direct links */}
          <motion.div
            className="col-span-12 md:col-span-5"
            initial={reduced ? {} : { opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
          >
            <p
              className="font-display italic text-ink-muted mb-10 max-w-sm"
              style={{ fontSize: "var(--step-1)", lineHeight: 1.3 }}
            >
              Have a project, a role, or a question? Reach out directly.
            </p>
            <dl>
              {directLinks.map((l, i) => (
                <div
                  key={l.k}
                  className={`flex flex-col gap-1 py-4 rule-b ${i === 0 ? "rule-t" : ""}`}
                >
                  <dt className="label text-ink-faint">{l.k}</dt>
                  <dd>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-ink u-link text-[0.95rem]"
                    >
                      {l.label}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          {/* Form */}
          <motion.div
            className="col-span-12 md:col-span-6 md:col-start-7"
            initial={reduced ? {} : { opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="border-t border-ink pt-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p
                    className="font-display text-ink mb-3"
                    style={{ fontSize: "var(--step-2)", lineHeight: 1.1 }}
                  >
                    Message sent<span className="text-accent">.</span>
                  </p>
                  <p className="text-ink-muted">{t("contact.successMessage")}</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    {field("name", t("contact.nameLabel"), t("contact.namePlaceholder"))}
                    {field("email", t("contact.emailLabel"), t("contact.emailPlaceholder"), "email")}
                  </div>
                  {field("subject", t("contact.subjectLabel"), t("contact.subjectPlaceholder"))}
                  {field("message", t("contact.messageLabel"), t("contact.messagePlaceholder"), "text", 4)}

                  <button
                    type="submit"
                    disabled={sending}
                    className="label self-start px-6 py-3 border border-ink text-ink hover:bg-ink hover:text-paper transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {sending ? "Sending…" : `${t("contact.sendButton")} →`}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
