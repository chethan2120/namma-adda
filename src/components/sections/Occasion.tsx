import { motion, useReducedMotion } from "framer-motion";
import { occasionImage } from "@/lib/media";
import { whatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { FoodImage } from "@/components/ui/food-image";
import { cn } from "@/lib/utils";

export function Occasion() {
  const reduce = useReducedMotion() === true;

  return (
    <section id="occasions" className="section-anchor relative overflow-hidden bg-tomato py-20 text-white md:py-28">
      <motion.span
        aria-hidden
        className="absolute -top-10 -left-8 h-36 w-36 rounded-full bg-haldi"
        animate={reduce ? undefined : { y: [0, 12, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden
        className="absolute right-8 bottom-8 h-20 w-20 rounded-[1.5rem] bg-white/20"
        animate={reduce ? undefined : { rotate: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl leading-[1.05] font-extrabold md:text-6xl">
            Big Hunger? Big Gathering? We've Got Your Dabba!
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl">
            From everyday office lunches to family celebrations, Namma Dabba is here to make food one less thing to worry about.
          </p>
          <a
            href={whatsAppUrl("I'd like to enquire about a bulk or party order.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-8")}
          >
            ENQUIRE FOR BULK ORDERS
          </a>
        </div>
        <FoodImage
          src={occasionImage.src}
          alt={occasionImage.alt}
          className="aspect-[4/3] w-full rounded-[2rem] border-4 border-white/80 object-cover shadow-2xl"
        />
      </div>
    </section>
  );
}
