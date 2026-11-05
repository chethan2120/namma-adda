import { aboutImage } from "@/lib/media";
import { FoodImage } from "@/components/ui/food-image";
import { TiffinArt } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

export function About() {
  return (
    <section id="about" className="section-anchor overflow-hidden bg-cream py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -top-8 -left-6 h-32 w-32 rounded-full bg-haldi" aria-hidden />
            <div className="absolute right-6 -bottom-8 h-24 w-24 rounded-full bg-tomato/90" aria-hidden />
            <FoodImage
              src={aboutImage.src}
              alt={aboutImage.alt}
              className="relative aspect-[4/3] max-h-[32rem] w-full rounded-[2rem] border-4 border-white object-cover object-center shadow-xl"
            />
            <TiffinArt className="absolute -right-2 -bottom-6 h-24 w-24 drop-shadow-md sm:h-28 sm:w-28" />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-sm font-semibold tracking-[0.18em] text-tomato uppercase">About Namma Dabba</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.05] font-extrabold text-charcoal md:text-6xl">
            A Little Dabba. A Lot of Happiness.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-charcoal/80">
            <p>At Namma Dabba, we believe every meal should bring the comfort of home.</p>
            <p>
              We aim to make everyday eating easier with delicious North Indian home-style food for busy professionals, students, families and workplaces.
            </p>
            <p>
              Whether you're looking for an everyday meal or food for a special gathering, Namma Dabba brings good food closer to you.
            </p>
          </div>
          <p className="mt-6 inline-flex rounded-full bg-haldi px-4 py-2 font-semibold text-charcoal">
            HSR Layout, Bengaluru
          </p>
        </Reveal>
      </div>
    </section>
  );
}
