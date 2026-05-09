"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Mail, Phone, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();

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
  ) => (
    <div>
      <label className="block text-sm font-semibold text-slate-300 mb-1.5">
        {label}
      </label>
      {rows ? (
        <textarea
          rows={rows}
          value={form[key]}
          onChange={(e) => {
            setForm((f) => ({ ...f, [key]: e.target.value }));
            setErrors((err) => ({ ...err, [key]: undefined }));
          }}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl glass border ${
            errors[key] ? "border-red-500/60" : "border-white/10 focus:border-blue-500/50"
          } text-white placeholder-slate-600 text-sm outline-none transition-colors duration-200 resize-none font-body`}
        />
      ) : (
        <input
          type={type}
          value={form[key]}
          onChange={(e) => {
            setForm((f) => ({ ...f, [key]: e.target.value }));
            setErrors((err) => ({ ...err, [key]: undefined }));
          }}
          placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl glass border ${
            errors[key] ? "border-red-500/60" : "border-white/10 focus:border-blue-500/50"
          } text-white placeholder-slate-600 text-sm outline-none transition-colors duration-200 font-body`}
        />
      )}
      <AnimatePresence>
        {errors[key] && (
          <motion.p
            className="text-red-400 text-xs mt-1"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            {errors[key]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  const socials = [
    { icon: Mail, label: "tahaelbah@gmail.com", href: "mailto:tahaelbah@gmail.com" },
    { icon: Phone, label: "+212 6 55 75 75 81", href: "tel:+212655757581" },
    { icon: Linkedin, label: "linkedin.com/in/tahaelbah", href: "https://linkedin.com/in/tahaelbah" },
    { icon: Github, label: "github.com/ELBAHTaha", href: "https://github.com/ELBAHTaha" },
  ];

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={reduced ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-heading gradient-text inline-block">
            {t("contact.title")}
          </h2>
          <div className="mt-3 mx-auto w-24 h-1 rounded-full bg-gradient-to-r from-blue-600 to-sky-500" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — contact info */}
          <motion.div
            className="flex flex-col gap-5"
            initial={reduced ? {} : { opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {socials.map(({ icon: Icon, label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 glass-card group hover:scale-[1.02] transition-all duration-200"
                initial={reduced ? {} : { opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-sky-500 flex items-center justify-center text-white group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-shadow duration-200">
                  <Icon size={18} />
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors text-sm font-medium">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="glass-card p-8"
            initial={reduced ? {} : { opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className="flex flex-col items-center justify-center py-16 gap-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.4 }}
                >
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-500/30">
                    <CheckCircle size={40} className="text-white" />
                  </div>
                  <p className="text-white font-bold text-lg text-center">
                    {t("contact.successMessage")}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  noValidate
                >
                  {field("name", t("contact.nameLabel"), t("contact.namePlaceholder"))}
                  {field("email", t("contact.emailLabel"), t("contact.emailPlaceholder"), "email")}
                  {field("subject", t("contact.subjectLabel"), t("contact.subjectPlaceholder"))}
                  {field("message", t("contact.messageLabel"), t("contact.messagePlaceholder"), "text", 4)}

                  <motion.button
                    type="submit"
                    disabled={sending}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50 transition-shadow duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    whileHover={reduced ? {} : { scale: 1.02 }}
                    whileTap={reduced ? {} : { scale: 0.98 }}
                  >
                    {sending ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                    {sending ? "Sending..." : t("contact.sendButton")}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
