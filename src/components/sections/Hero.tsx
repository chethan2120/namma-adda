import { motion, useReducedMotion } from "framer-motion";
import { heroImage, heroStackImage } from "@/lib/media";
import { whatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { FoodImage } from "@/components/ui/food-image";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const logoSrc = `${import.meta.env.BASE_URL}images/logo.png`;

const floaters = [
  { className: "left-[4%] top-24 h-3 w-3 bg-tomato", delay: 0 },
  { className: "left-[14%] top-16 h-2.5 w-2.5 bg-haldi", delay: 0.4 },
  { className: "right-[6%] top-28 h-4 w-4 bg-haldi", delay: 0.8 },
  { className: "right-[18%] bottom-16 h-3 w-3 bg-tomato", delay: 0.2 },
  { className: "left-[42%] bottom-8 hidden h-2.5 w-2.5 bg-tomato md:block", delay: 1 },
];

export function Hero({ playTypewriter }: { playTypewriter: boolean }) {
  const reduce = useReducedMotion() === true;
  const show = playTypewriter || reduce;

  return (
    <section id="home" className="section-anchor relative overflow-hidden pt-[4.5rem]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-20 -left-24 h-72 w-72 rounded-full bg-haldi/70 blur-2xl" />
        <div className="absolute top-16 -right-20 h-64 w-64 rounded-full bg-tomato/15 blur-2xl" />
        <div className="absolute bottom-0 left-1/3 h-40 w-40 rounded-full bg-haldi/40 blur-3xl" />
        <Leaf className="absolute top-24 left-[8%] hidden w-10 -rotate-12 text-tomato/70 sm:block" />
        <Chili className="absolute right-[8%] bottom-24 hidden w-8 rotate-12 text-tomato/80 lg:block" />
        <Bowl className="absolute top-32 right-[22%] hidden w-9 text-haldi lg:block" />
        {floaters.map((floater) => (
          <motion.span
            key={floater.className}
            className={`absolute rounded-full ${floater.className}`}
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: floater.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-6 md:px-8 lg:grid-cols-2 lg:gap-12 lg:py-8">
        <div className="flex min-w-0 flex-col items-start">
          <motion.img
            src={logoSrc}
            alt="Namma Dabba"
            width={912}
            height={574}
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            animate={show ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="h-auto w-[min(100%,22rem)] object-contain drop-shadow-[0_10px_18px_rgba(33,28,25,0.12)] sm:w-[min(100%,26rem)] xl:w-[min(100%,28rem)]"
          />
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.12, ease: "easeOut" }}
          >
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-charcoal shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-tomato" />
              Homemade tiffin · HSR Layout
            </p>
            <h1 className="mt-3 max-w-xl text-[clamp(2.15rem,4vw,3.5rem)] leading-[1.05] font-extrabold text-charcoal">
              <span className="block">Good Food.</span>
              <span className="block">Happy Mood.</span>
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal/80 md:text-lg">
              Missing the taste of home? Bring delicious, comforting North Indian meals into your everyday routine with Namma Dabba.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="#food" className={cn(buttonVariants({ variant: "primary", size: "md" }))}>
                Explore Our Menu
              </a>
              <a
                href={whatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "secondary", size: "md" }))}
              >
                <WhatsAppIcon />
                Order Now
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="min-w-0"
          initial={reduce ? false : { opacity: 0, x: 28 }}
          animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 28 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.18, ease: "easeOut" }}
        >
          <div className="relative mx-auto aspect-[4/3] w-[min(100%,calc(min(28rem,100svh_-_10rem)*4/3))]">
            <div className="absolute -top-3 -left-3 h-14 w-14 rounded-full bg-haldi sm:h-16 sm:w-16" aria-hidden />
            <div className="absolute -right-3 -bottom-3 h-12 w-12 rounded-[1.4rem] bg-tomato sm:h-14 sm:w-14" aria-hidden />
            <div className="relative h-full overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_20px_50px_rgba(33,28,25,0.18)]">
              <FoodImage
                src={heroImage.src}
                alt={heroImage.alt}
                priority
                width={2000}
                height={1125}
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-6 h-16" aria-hidden>
                {[0, 1, 2, 3].map((puff) => (
                  <span
                    key={puff}
                    className="steam-puff"
                    style={{ left: `${18 + puff * 18}%`, animationDelay: `${puff * 0.4}s` }}
                  />
                ))}
              </div>
            </div>
            <div className="absolute bottom-3 left-3 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:w-32">
              <FoodImage src={heroStackImage.src} alt={heroStackImage.alt} className="aspect-square w-full object-cover" />
            </div>
            <div className="absolute -top-4 right-4 rotate-6 rounded-2xl border-2 border-charcoal bg-haldi px-3 py-2 text-sm font-extrabold text-charcoal shadow-[0_4px_0_#211C19]">
              Hot dabba
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Leaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden>
      <path d="M8 34c12-2 20-12 28-26-10 6-18 16-20 28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M16 30c4-6 8-10 14-14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Chili({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} fill="none" aria-hidden>
      <path
        d="M22 8c2 6-2 10-2 10 8 2 14 12 12 22-2 8-10 10-14 6-6-6-4-16 0-22 1-6-2-12 4-16z"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path d="M20 10c2-4 6-4 8-2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Bowl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} fill="none" aria-hidden>
      <path d="M8 16h32c-1 12-8 18-16 18S9 28 8 16z" stroke="currentColor" strokeWidth="3" />
      <path d="M16 16c1-6 4-8 8-8s7 2 8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
