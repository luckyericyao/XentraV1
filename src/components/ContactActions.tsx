"use client";

import { useState } from "react";

type ContactActionsProps = {
  email: string;
  mailto: string;
  copyLabel: string;
  copiedLabel: string;
  copyErrorLabel: string;
};

function copyTextFallback(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  const copied = document.execCommand("copy");
  input.remove();

  if (!copied) {
    throw new Error("Clipboard unavailable");
  }
}

export function ContactActions({
  email,
  mailto,
  copyLabel,
  copiedLabel,
  copyErrorLabel,
}: ContactActionsProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  const copyEmail = async () => {
    try {
      setCopyStatus("idle");
      if (navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(email);
        } catch {
          copyTextFallback(email);
        }
      } else {
        copyTextFallback(email);
      }

      setCopyStatus("copied");
      window.setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("error");
      window.setTimeout(() => setCopyStatus("idle"), 2200);
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
        className="inline-flex min-h-10 min-w-[6.5rem] items-center justify-center rounded-full border border-[#2A2D33] px-4 py-2 text-sm text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.36)] hover:text-[#F2EFE8]"
      >
        <span aria-live="polite">
          {copyStatus === "copied"
            ? copiedLabel
            : copyStatus === "error"
              ? copyErrorLabel
              : copyLabel}
        </span>
      </button>
    </div>
  );
}
