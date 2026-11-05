import { FOOTER_LINKS, ADDRESS_LINE, LOCATION_LINE, PHONE_DISPLAY, PHONE_TEL, whatsAppUrl } from "@/lib/site";
import { WhatsAppIcon } from "@/components/ui/icons";

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-8 md:py-16 lg:grid-cols-[1.3fr_0.8fr_1fr]">
        <div>
          <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Namma Dabba" className="h-16 w-auto" />
          <p className="mt-4 max-w-sm text-base leading-relaxed text-cream/80">
            Homemade North Indian tiffin and meals from HSR Layout, Bengaluru. Good food for everyday hunger and bigger gatherings.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xl font-semibold text-haldi">Explore</h2>
          <ul className="mt-4 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-cream/85 hover:text-haldi">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xl font-semibold text-haldi">Visit & order</h2>
          <address className="mt-4 space-y-2 text-cream/85 not-italic">
            <p>Namma Dabba</p>
            <p>{LOCATION_LINE}</p>
            <p>{ADDRESS_LINE}</p>
            <p>
              <a href={PHONE_TEL} className="hover:text-haldi">
                {PHONE_DISPLAY}
              </a>
            </p>
          </address>
          <a
            href={whatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-haldi px-5 font-extrabold text-charcoal"
          >
            <WhatsAppIcon />
            WhatsApp Namma Dabba
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl pt-5 pb-24 pl-4 text-sm text-cream/60 md:pr-8 md:pb-20 md:pl-8">
          © {new Date().getFullYear()} Namma Dabba. All rights reserved. Designed and Maintained by{" "}
          <a href="https://webnxt.co/" target="_blank" rel="noopener noreferrer" className="font-semibold text-haldi hover:text-white">
            WebNxt
          </a>
        </p>
      </div>
    </footer>
  );
}
