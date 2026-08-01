"use client";

import { useState } from "react";

type ContactActionsProps = {
  email: string;
  mailto: string;
  copyLabel: string;
  copiedLabel: string;
};

export function ContactActions({
  email,
  mailto,
  copyLabel,
  copiedLabel,
}: ContactActionsProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement("textarea");
        input.value = email;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        const copiedWithFallback = document.execCommand("copy");
        input.remove();

        if (!copiedWithFallback) {
          throw new Error("Clipboard unavailable");
        }
      }

      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={mailto}
        className="inline-flex rounded-full border border-[rgba(198,161,91,0.42)] bg-[#070809] px-5 py-2.5 text-sm font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
      >
        {email}
      </a>
      <button
        type="button"
        onClick={copyEmail}
        className="inline-flex min-h-10 items-center rounded-full border border-[#2A2D33] px-4 py-2 text-sm text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.36)] hover:text-[#F2EFE8]"
      >
        <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}
