"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function DocumentLanguage() {
  const pathname = usePathname();

  useEffect(() => {
    const isChinese = pathname === "/zh" || pathname.startsWith("/zh/");
    document.documentElement.lang = isChinese ? "zh-CN" : "en";
  }, [pathname]);

  return null;
}
