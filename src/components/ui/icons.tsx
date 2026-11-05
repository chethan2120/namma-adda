import { cn } from "@/lib/utils";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.5 3.5A11 11 0 0 0 2.1 16.8L1 23l6.4-1.1A11 11 0 0 0 12 22a11 11 0 0 0 8.5-18.5zM12 20.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3.8.6.6-3.7-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.4-.7-1.6-.8s-.4-.1-.5.1-.6.8-.7.9-.3.2-.5.1a6.7 6.7 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.3a.5.5 0 0 0 0-.5c0-.1-.5-1.2-.7-1.6s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.8 11.8 0 0 0 4.5 4 15 15 0 0 0 1.5.6 3.6 3.6 0 0 0 1.7.1 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.2-.1-.4-.2z"
      />
    </svg>
  );
}

export function TiffinArt({
  className,
  lidOpen = false,
}: {
  className?: string;
  lidOpen?: boolean;
}) {
  return (
    <svg viewBox="0 0 200 230" className={className} aria-hidden="true">
      <g
        style={{
          transform: lidOpen ? "translateY(-34px) rotate(-10deg)" : "none",
          transformOrigin: "100px 40px",
          transition: "transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        <rect x="78" y="8" width="44" height="16" rx="7" fill="#F0271D" stroke="#211C19" strokeWidth="5" />
        <rect x="46" y="22" width="108" height="30" rx="12" fill="#F5C400" stroke="#211C19" strokeWidth="5" />
      </g>
      <rect x="40" y="62" width="120" height="40" rx="12" fill="#FFE56A" stroke="#211C19" strokeWidth="5" />
      <rect x="40" y="110" width="120" height="40" rx="12" fill="#F5C400" stroke="#211C19" strokeWidth="5" />
      <rect x="40" y="158" width="120" height="46" rx="14" fill="#FFD84A" stroke="#211C19" strokeWidth="5" />
      <rect x="28" y="74" width="14" height="24" rx="4" fill="#211C19" />
      <rect x="158" y="74" width="14" height="24" rx="4" fill="#211C19" />
      <rect x="28" y="168" width="14" height="24" rx="4" fill="#211C19" />
      <rect x="158" y="168" width="14" height="24" rx="4" fill="#211C19" />
    </svg>
  );
}
