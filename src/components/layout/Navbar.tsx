import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, whatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

function useScrollSpy() {
  const [active, setActive] = useState<string>(NAV_LINKS[0].href);

  useEffect(() => {
    const update = () => {
      const marker = window.scrollY + 110;
      let current: string = NAV_LINKS[0].href;
      for (const link of NAV_LINKS) {
        const section = document.querySelector(link.href);
        if (!section) continue;
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= marker) current = link.href;
      }
      setActive(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return active;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion() === true;
  const active = useScrollSpy();

  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="border-b border-charcoal/10 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 md:px-8">
          <a href="#home" className="flex shrink-0 items-center" onClick={close}>
            <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Namma Dabba" className="h-12 w-auto drop-shadow-[0_3px_0_rgba(33,28,25,0.12)] sm:h-14" />
          </a>

          <nav className="hidden min-w-0 items-center gap-3 xl:gap-5 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-1 py-2 text-base font-semibold whitespace-nowrap text-charcoal hover:text-tomato",
                    isActive && "text-tomato",
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute right-0 -bottom-0.5 left-0 h-[3px] rounded-full bg-tomato"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "md" }), "hidden shrink-0 whitespace-nowrap sm:inline-flex")}
            >
              <WhatsAppIcon />
              ORDER ON WHATSAPP
            </a>
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 border-charcoal lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-b border-charcoal/10 bg-cream px-4 py-4 shadow-lg lg:hidden"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = active === link.href;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-2xl px-3 py-3 text-2xl font-semibold text-charcoal hover:bg-haldi",
                      isActive && "text-tomato",
                    )}
                  >
                    {link.label}
                    {isActive ? (
                      <motion.span
                        layoutId="mobile-nav-underline"
                        className="absolute bottom-2 left-3 h-1 w-12 rounded-full bg-tomato"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      />
                    ) : null}
                  </a>
                );
              })}
              <a
                href={whatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-3 sm:hidden")}
              >
                <WhatsAppIcon />
                ORDER ON WHATSAPP
              </a>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
