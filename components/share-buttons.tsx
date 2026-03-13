"use client"

import { Mail, Linkedin, Link2 } from "lucide-react"
import { useState } from "react"
import { XLogoIcon } from "./ui/x-logo"
import { InkBorder } from "./ui/ink-border"

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

interface ShareButtonsProps {
  title: string
  url: string
  variant?: "default" | "hero"
}

export function ShareButtons({ title, url, variant = "default" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

  const shareOnX = () => {
    const text = encodeURIComponent(`Read on DailyDach: ${title}`)
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(fullUrl)}`,
      "_blank"
    )
  }

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/shareArticle?url=${encodeURIComponent(fullUrl)}`, "_blank")
  }

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${title} ${fullUrl}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Read this on DailyDach: ${title}`)
    const body = encodeURIComponent(`${title}\n\n${fullUrl}`)
    window.open(`mailto:?subject=${subject}&body=${body}`, "_self")
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(fullUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const labelClass =
    variant === "hero"
      ? "mr-1 text-[0.64rem] font-black uppercase tracking-[0.12em] text-white/75"
      : "mr-1 text-[0.64rem] font-black uppercase tracking-[0.12em] text-muted-foreground"

  const copiedClass =
    variant === "hero"
      ? "text-[0.64rem] font-black uppercase tracking-[0.12em] text-white"
      : "text-[0.64rem] font-black uppercase tracking-[0.12em] text-primary"

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className={labelClass}>Share</span>
      <ShareIconButton label="Share on X" onClick={shareOnX} variant={variant}>
        <XLogoIcon className="size-4" />
      </ShareIconButton>
      <ShareIconButton label="Share on Facebook" onClick={shareOnFacebook} variant={variant}>
        <FacebookIcon className="size-4" />
      </ShareIconButton>
      <ShareIconButton label="Share on LinkedIn" onClick={shareOnLinkedIn} variant={variant}>
        <Linkedin className="size-4" />
      </ShareIconButton>
      <ShareIconButton label="Share on WhatsApp" onClick={shareOnWhatsApp} variant={variant}>
        <WhatsAppIcon className="size-4" />
      </ShareIconButton>
      <ShareIconButton label="Share via email" onClick={shareViaEmail} variant={variant}>
        <Mail className="size-4" />
      </ShareIconButton>
      <ShareIconButton label="Copy link" onClick={copyToClipboard} variant={variant}>
        <Link2 className="size-4" />
      </ShareIconButton>
      {copied && <span className={copiedClass}>Copied</span>}
    </div>
  )
}

function ShareIconButton({
  label,
  onClick,
  children,
  variant = "default",
}: {
  label: string
  onClick: () => void
  children: React.ReactNode
  variant?: "default" | "hero"
}) {
  const buttonClass =
    variant === "hero"
      ? "brand-radius relative isolate overflow-hidden inline-flex size-9 cursor-pointer items-center justify-center bg-white/10 text-white shadow-[2px_2px_0_0_rgba(255,255,255,0.2)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-white/20 hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.3)]"
      : "brand-radius relative isolate overflow-hidden inline-flex size-9 cursor-pointer items-center justify-center bg-card text-foreground shadow-[2px_2px_0_0_var(--foreground)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-secondary/65 hover:shadow-[4px_4px_0_0_var(--foreground)]"

  return (
    <button onClick={onClick} className={buttonClass} aria-label={label} title={label}>
      <InkBorder rx={12} className={variant === "hero" ? "text-white" : undefined} />
      {children}
    </button>
  )
}
