"use client";

import { useEffect, useRef, useState } from "react";

type ContactActionsProps = {
  email: string;
  emailLabel?: string;
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
  emailLabel,
  mailto,
  copyLabel,
  copiedLabel,
  copyErrorLabel,
}: ContactActionsProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = (delay: number) => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      resetTimerRef.current = null;
      setCopyStatus("idle");
    }, delay);
  };

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
      scheduleReset(1800);
    } catch {
      setCopyStatus("error");
      scheduleReset(2200);
    }
  };

  const statusLabel =
    copyStatus === "copied"
      ? copiedLabel
      : copyStatus === "error"
        ? copyErrorLabel
        : copyLabel;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={mailto}
        className="inline-flex min-h-11 items-center rounded-md border border-[rgba(198,161,91,0.42)] bg-[#070809] px-5 text-sm font-medium text-[#F2EFE8] transition hover:border-[#C6A15B] hover:text-[#C6A15B]"
      >
        {emailLabel ?? email}
      </a>
      <button
        type="button"
        onClick={copyEmail}
        aria-label={statusLabel}
        className="inline-flex min-h-11 min-w-[6.5rem] items-center justify-center rounded-md border border-[#2A2D33] px-4 text-sm text-[#A6A39A] transition hover:border-[rgba(198,161,91,0.36)] hover:text-[#F2EFE8]"
      >
        <span role="status" aria-live="polite" aria-atomic="true">
          {statusLabel}
        </span>
      </button>
    </div>
  );
}
