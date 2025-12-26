import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const COPY_TEXT = (text) => {
  if (typeof (navigator) != "undefined") {
    navigator.clipboard.writeText(text)
  }
}

export const CompanyName = "GadgIt"
