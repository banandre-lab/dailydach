"use client";

import { Mail, Linkedin } from "lucide-react";
import { useState } from "react";
import { XLogoIcon } from "./ui/x-logo";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const fullUrl = `${baseUrl}${url}`;

  const shareOnX = () => {
    const text = encodeURIComponent(`Check out: ${title}`);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(
        fullUrl
      )}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(
        fullUrl
      )}`,
      "_blank"
    );
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`Check this out: ${title}`);
    const body = encodeURIComponent(
      `I thought you'd find this interesting:\n\n${title}\n${fullUrl}`
    );
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(mailtoLink, "_self");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground hidden sm:inline">
        Share:
      </span>
      <button
        onClick={shareOnX}
        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-accent transition-colors cursor-pointer"
        aria-label="Share on X"
        title="Share on X"
      >
        <XLogoIcon className="w-5 h-5" />
      </button>
      <button
        onClick={shareViaEmail}
        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-accent transition-colors cursor-pointer"
        aria-label="Share via Email"
        title="Share via Email"
      >
        <Mail size={20} />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-accent transition-colors cursor-pointer"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin size={20} />
      </button>
    </div>
  );
}
