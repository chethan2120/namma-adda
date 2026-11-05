import { useEffect, useState, type FormEvent } from "react";
import { Phone } from "lucide-react";
import {
  ADDRESS_LINE,
  LOCATION_LINE,
  MAPS_EMBED,
  MAPS_LINK,
  PHONE_DISPLAY,
  PHONE_TEL,
  whatsAppUrl,
} from "@/lib/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const enquiryOptions = [
  { value: "general", label: "General" },
  { value: "tiffin", label: "Daily tiffin" },
  { value: "meals", label: "Lunch or dinner" },
  { value: "office", label: "Office meals" },
  { value: "delivery", label: "Delivery area" },
  { value: "bulk", label: "Bulk or party order" },
] as const;

type EnquiryValue = (typeof enquiryOptions)[number]["value"];

export function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [enquiry, setEnquiry] = useState<EnquiryValue>("general");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [readyLink, setReadyLink] = useState("");

  useEffect(() => {
    const onEnquiry = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (enquiryOptions.some((option) => option.value === detail)) {
        setEnquiry(detail as EnquiryValue);
      }
    };
    window.addEventListener("namma-enquiry", onEnquiry);
    return () => window.removeEventListener("namma-enquiry", onEnquiry);
  }, []);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Add your name and a short message so the WhatsApp enquiry is useful.");
      setReadyLink("");
      return;
    }
    setError("");
    const label = enquiryOptions.find((option) => option.value === enquiry)?.label ?? "General";
    const href = whatsAppUrl(
      `Name: ${name.trim()}\nPhone: ${phone.trim() || "Not shared"}\nEnquiry: ${label}\nArea: ${area.trim() || "Not shared"}\nMessage: ${message.trim()}`,
    );
    setReadyLink(href);
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="section-anchor bg-[#fffaf0] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-tomato uppercase">Contact & ordering</p>
          <h2 className="mt-3 max-w-4xl font-display text-4xl leading-[1.05] font-extrabold md:text-6xl">
            Your Next Favourite Dabba Is Just a Message Away!
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="rounded-[2rem] bg-charcoal p-6 text-cream md:p-8">
              <p className="font-logo text-3xl leading-none tracking-normal text-haldi">Namma Dabba</p>
              <p className="mt-2 text-cream/80">{LOCATION_LINE}</p>
              <p className="mt-4 text-lg">{ADDRESS_LINE}</p>
              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={whatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  <WhatsAppIcon />
                  Order on WhatsApp
                </a>
                <a href={PHONE_TEL} className={cn(buttonVariants({ variant: "ghost", size: "lg" }))}>
                  <Phone className="h-5 w-5" aria-hidden />
                  Call {PHONE_DISPLAY}
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  className="min-h-11 rounded-full bg-white/10 px-4 font-bold"
                  onClick={() => {
                    setEnquiry("delivery");
                    document.getElementById("enquiry-message")?.focus();
                  }}
                >
                  Delivery area enquiry
                </button>
                <button
                  type="button"
                  className="min-h-11 rounded-full bg-white/10 px-4 font-bold"
                  onClick={() => {
                    setEnquiry("bulk");
                    document.getElementById("enquiry-message")?.focus();
                  }}
                >
                  Bulk order enquiry
                </button>
              </div>
              <div className="mt-6 overflow-hidden rounded-3xl border border-white/10">
                <iframe
                  title="Namma Dabba on Google Maps — 23rd Main, Sector 6, HSR Layout, Bengaluru"
                  src={MAPS_EMBED}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-haldi underline">
                Open this address in Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-sm md:p-8" noValidate>
              <h3 className="text-3xl font-extrabold">Send an enquiry</h3>
              <p className="mt-2 text-charcoal/70">
                There is no form backend on this site. Submitting opens WhatsApp with your message so Namma Dabba can reply there. Nothing is saved on a server.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-semibold">
                  Name
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="mt-1 h-12 w-full rounded-2xl border border-charcoal/15 px-4 font-normal"
                    autoComplete="name"
                    required
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Phone
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    className="mt-1 h-12 w-full rounded-2xl border border-charcoal/15 px-4 font-normal"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                </label>
                <label className="block text-sm font-semibold">
                  Enquiry
                  <select
                    value={enquiry}
                    onChange={(event) => setEnquiry(event.target.value as EnquiryValue)}
                    className="mt-1 h-12 w-full rounded-2xl border border-charcoal/15 bg-white px-4 font-normal"
                  >
                    {enquiryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm font-semibold">
                  Your area
                  <input
                    value={area}
                    onChange={(event) => setArea(event.target.value)}
                    placeholder="HSR Layout, BTM, Koramangala..."
                    className="mt-1 h-12 w-full rounded-2xl border border-charcoal/15 px-4 font-normal"
                  />
                </label>
              </div>
              <label className="mt-4 block text-sm font-semibold">
                Message
                <textarea
                  id="enquiry-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  rows={5}
                  className="mt-1 w-full rounded-2xl border border-charcoal/15 px-4 py-3 font-normal"
                  required
                />
              </label>
              {error ? <p className="mt-3 text-sm font-semibold text-tomato">{error}</p> : null}
              <Button type="submit" variant="primary" size="lg" className="mt-5">
                <WhatsAppIcon />
                Send on WhatsApp
              </Button>
              {readyLink ? (
                <p className="mt-4 text-sm leading-relaxed text-charcoal/75">
                  WhatsApp should have opened with your enquiry. This page did not store it. If nothing opened,{" "}
                  <a href={readyLink} target="_blank" rel="noopener noreferrer" className="font-bold text-tomato underline">
                    open the WhatsApp enquiry
                  </a>
                  .
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
