import { Building2, House, Smartphone, Sparkles, Users, UtensilsCrossed } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

const benefits = [
  { title: "Home-style North Indian food.", icon: House },
  { title: "Freshly prepared meals.", icon: UtensilsCrossed },
  { title: "Hygienic food handling.", icon: Sparkles },
  { title: "Convenient ordering.", icon: Smartphone },
  { title: "Home and office meal options.", icon: Building2 },
  { title: "Bulk catering availability.", icon: Users },
];

export function Why() {
  const reduce = useReducedMotion() === true;

  return (
    <section id="why" className="section-anchor relative overflow-hidden bg-haldi py-20 md:py-28">
      <div className="pointer-events-none absolute -top-10 right-0 h-40 w-40 rounded-full bg-tomato/80" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-full bg-white/40" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] uppercase">Why Namma Dabba</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold md:text-6xl">
            Why You'll Love Our Dabba
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 0.04}>
                <article className="flex h-full items-start gap-4 rounded-[1.6rem] bg-cream p-5 shadow-[0_8px_0_rgba(33,28,25,0.12)]">
                  <motion.span
                    className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-tomato text-white"
                    initial={reduce ? false : { scale: 0.6, rotate: -12 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                  >
                    <Icon aria-hidden />
                  </motion.span>
                  <h3 className="pt-2 text-2xl leading-tight font-extrabold">{benefit.title}</h3>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
