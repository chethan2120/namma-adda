export const WHATSAPP_TEXT =
  "Hi Namma Dabba! I'd like to know more about your food and tiffin services.";

export function whatsAppUrl(extra?: string) {
  const text = extra ? `${WHATSAPP_TEXT}\n\n${extra}` : WHATSAPP_TEXT;
  return `https://wa.me/918709206116?text=${encodeURIComponent(text)}`;
}

export const PHONE_DISPLAY = "+91 8709206116";
export const PHONE_TEL = "tel:+918709206116";
export const ADDRESS_LINE = "23rd Main, Sector 6, HSR Layout, Bengaluru 560102";
export const LOCATION_LINE = "HSR Layout, Bengaluru, Karnataka";
export const MAPS_QUERY = "23rd Main, Sector 6, HSR Layout, Bengaluru 560102";
export const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=16&output=embed`;
export const MAPS_LINK = `https://maps.google.com/?q=${encodeURIComponent(MAPS_QUERY)}`;

export const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#food", label: "Food" },
  { href: "#plans", label: "Plans" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = [
  ...NAV_LINKS,
  { href: "#why", label: "Why Namma Dabba" },
  { href: "#occasions", label: "Bulk orders" },
  { href: "#feedback", label: "Feedback" },
] as const;
