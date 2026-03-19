"use client"

import React from "react"
import { motion } from "framer-motion"
import { Heart, Mail, MapPin, Phone, Github, Linkedin, Send, MessageSquare } from "lucide-react"
import { toast } from "sonner"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ander_manas@hotmail.com",
    href: "mailto:ander_manas@hotmail.com",
  },
  {
    icon: Phone,
    label: "Phone (CH)",
    value: "+41 765 733 309",
    href: "tel:+41765733309",
  },
  {
    icon: Phone,
    label: "Phone (ES)",
    value: "+34 634 505 535",
    href: "tel:+34634505535",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Basel, Switzerland",
    href: null,
  },
]

const socials = [
  { icon: Github,   href: "https://github.com/andermanasalb",             label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/ander-manas",      label: "LinkedIn" },
]

export function Footer() {
  const [form, setForm] = React.useState({ name: "", email: "", message: "" })
  const [sending, setSending] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setSending(true)
    // Simula envío — aquí conectarías tu backend/emailJS/formspree
    setTimeout(() => {
      setSending(false)
      setForm({ name: "", email: "", message: "" })
      toast.success("Message sent!", {
        description: "I'll get back to you within 24 hours.",
        duration: 4000,
      })
    }, 1200)
  }

  return (
    <footer id="contact" className="min-h-screen flex flex-col justify-center py-6 px-4 max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center mb-6 gap-2"
      >
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-white/20" />
          <span className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted/60">
            <MessageSquare className="w-3 h-3" /> Communication
          </span>
          <div className="h-px w-12 bg-white/20" />
        </div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter">
          Let&apos;s <span className="gradient-aurora">Connect</span>
        </h2>
        <p className="text-white/40 max-w-md text-sm leading-relaxed">
          Open to new opportunities in full‑stack development and AI. Let&apos;s connect and build something great together.
        </p>
      </motion.div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 mb-8">

        {/* Left — Contact form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 20, stiffness: 80 }}
          className="rounded-3xl p-6 bg-white/[0.04] backdrop-blur-xl border border-purple-500/[0.2] border-l-2 border-l-violet-400/60"
        >
          <h3 className="text-xl font-bold mb-1">Send a Message</h3>
          <p className="text-white/40 text-sm mb-4">I&apos;ll get back to you within 24 hours.</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                <span className="text-violet-400">✦</span> Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="w-full bg-white/[0.04] border border-purple-500/[0.15] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-purple-400/60 focus:bg-purple-500/[0.06] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                <span className="text-violet-400">✦</span> Your Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="w-full bg-white/[0.04] border border-purple-500/[0.15] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-purple-400/60 focus:bg-purple-500/[0.06] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                <span className="text-violet-400">✦</span> Your Message
              </label>
              <textarea
                placeholder="Tell me about your project..."
                rows={3}
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                className="w-full bg-white/[0.03] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-violet-500/50 focus:bg-white/[0.05] transition-all resize-none"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={sending}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 text-white text-sm font-bold uppercase tracking-widest transition-all disabled:opacity-50"
            >
              {sending ? (
                <span className="animate-pulse">Sending...</span>
              ) : (
                <><Send className="w-4 h-4" /> Send Message</>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Right — Direct contact + socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", damping: 20, stiffness: 80, delay: 0.1 }}
          className="flex flex-col gap-4"
        >
          {/* Direct Contact */}
          <div>
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Send className="w-4 h-4 text-violet-400" /> Direct Contact
            </h3>
            <div className="flex flex-col gap-2">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="rounded-2xl p-3 flex items-center gap-3 group bg-white/[0.04] backdrop-blur-sm border border-purple-500/[0.15] hover:border-purple-400/40 hover:shadow-[0_0_14px_rgba(168,85,247,0.2)] transition-all"
                >
                  <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-white/80">{value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Social Presence */}
          <div>
            <h3 className="text-sm font-bold mb-3">Social Presence</h3>
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white/50 bg-white/[0.04] backdrop-blur-sm border border-purple-500/[0.15] hover:text-white hover:border-purple-400/50 hover:shadow-[0_0_14px_rgba(168,85,247,0.3)] transition-all"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/5 gap-3">
        <div className="text-xs text-muted font-mono flex items-center gap-2">
          DESIGNED WITH <Heart className="w-3 h-3 text-red-500 fill-red-500" /> BY ANDER MAÑAS
        </div>
        <div className="text-xs text-muted font-mono">
          © 2026 ALL RIGHTS RESERVED
        </div>
      </div>
    </footer>
  )
}
