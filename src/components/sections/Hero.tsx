import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroImage, heroStackImage } from "@/lib/media";
import { whatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { FoodImage } from "@/components/ui/food-image";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

function TypedLine({ text, active }: { text: string; active: boolean }) {
  const reduce = useReducedMotion() === true;
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (reduce) {
      setCount(text.length);
      return;
    }
    if (!active) return;
    if (count >= text.length) return;
    const timer = window.setTimeout(() => setCount((value) => value + 1), 80);
    return () => window.clearTimeout(timer);
  }, [active, count, reduce, text.length]);

  const shown = reduce ? text : text.slice(0, count);

  return (
    <span>
      {shown}
      {active && !reduce && count < text.length ? <span className="type-caret">|</span> : null}
    </span>
  );
}

const particles = [
  "left-[6%] top-28 h-3 w-3 bg-tomato",
  "left-[18%] top-16 h-2 w-2 bg-haldi",
  "right-[8%] top-32 h-4 w-4 bg-haldi",
  "right-[22%] bottom-24 h-3 w-3 bg-tomato",
  "left-[40%] bottom-10 hidden h-2 w-2 bg-tomato md:block",
];

export function Hero({ playTypewriter }: { playTypewriter: boolean }) {
  const reduce = useReducedMotion() === true;

  return (
    <section id="home" className="section-anchor relative flex h-svh overflow-hidden pt-[4.5rem]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-16 -left-20 h-64 w-64 rounded-full bg-haldi/70 blur-2xl" />
        <div className="absolute top-24 -right-16 h-56 w-56 rounded-full bg-tomato/20 blur-2xl" />
        {particles.map((particle) => (
          <motion.span
            key={particle}
            className={`absolute rounded-full ${particle}`}
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="relative mx-auto grid h-full min-h-0 w-full max-w-7xl grid-rows-[auto_minmax(0,1fr)] items-center gap-3 px-4 py-3 md:px-8 lg:grid-cols-2 lg:grid-rows-1 lg:items-stretch lg:gap-10 lg:py-4">
        <div className="flex flex-col justify-start lg:pt-2">
          <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-bold text-charcoal shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-tomato" />
            Homemade tiffin · HSR Layout
          </p>
          <h1 className="mt-3 text-[clamp(2.2rem,4.4vw,4.5rem)] leading-[1.05] font-extrabold text-charcoal">
            <span className="block">Good Food.</span>
            <span className="block">Happy Mood.</span>
            <span className="block font-logo font-normal leading-[0.92] tracking-normal text-tomato">
              <TypedLine text="Namma Dabba!" active={playTypewriter} />
            </span>
          </h1>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-charcoal/80 md:text-lg">
            Missing the taste of home? Bring delicious, comforting North Indian meals into your everyday routine with Namma Dabba.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              <WhatsAppIcon />
              ORDER ON WHATSAPP
            </a>
            <a href="#food" className={cn(buttonVariants({ variant: "secondary", size: "md" }))}>
              EXPLORE OUR FOOD
            </a>
          </div>
        </div>

        <div className="min-h-0">
          <div className="relative mx-auto h-full max-w-xl lg:max-w-none">
            <div className="absolute -top-3 -left-3 h-16 w-16 rounded-full bg-haldi sm:-left-6 sm:h-20 sm:w-20" aria-hidden />
            <div className="absolute -right-3 -bottom-3 h-14 w-14 rounded-[1.4rem] bg-tomato sm:h-16 sm:w-16" aria-hidden />
            <div className="relative h-full overflow-hidden rounded-[2rem] border-4 border-white shadow-[0_20px_50px_rgba(33,28,25,0.18)]">
              <FoodImage
                src={heroImage.src}
                alt={heroImage.alt}
                priority
                className="h-full min-h-40 w-full object-cover"
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
            <div className="absolute -top-4 right-4 rotate-6 rounded-2xl bg-haldi px-3 py-2 font-logo text-sm leading-none tracking-normal text-charcoal shadow-[0_4px_0_#211C19]">
              Hot dabba
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
