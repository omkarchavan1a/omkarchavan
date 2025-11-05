import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function MandalaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
      className={cn("text-primary/50", props.className)}
    >
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M5.636 5.636l1.414 1.414" />
      <path d="M16.95 16.95l1.414 1.414" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M5.636 18.364l1.414-1.414" />
      <path d="M16.95 7.05l1.414-1.414" />
      <circle cx="12" cy="12" r="10" />
      <path d="M12 12c-2.344-1.352-4.22-3.83-4.686-7" />
      <path d="M12 12c2.344-1.352 4.22-3.83 4.686-7" />
      <path d="M12 12c-2.344 1.352-4.22 3.83-4.686 7" />
      <path d="M12 12c2.344 1.352 4.22 3.83 4.686 7" />
      <path d="M12 12c-4.688.536-8.25-2.014-9-6" />
      <path d="M12 12c4.688.536 8.25-2.014 9-6" />
      <path d="M12 12c-4.688-.536-8.25 2.014-9 6" />
      <path d="M12 12c4.688-.536 8.25 2.014 9 6" />
    </svg>
  );
}
