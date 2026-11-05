import { Check, Star } from "lucide-react";
import { whatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Lunch Plan",
    tags: ["Flexible Plan", "Customizable Meals"],
    priceLead: "Starting from",
    price: "₹2,500",
    period: "per month",
    disclaimer: "*Final pricing may vary",
    features: [
      "Lunch only (Mon–Sat)",
      "Delivered by 12:30 PM",
      "Full thali every day",
      "Free delivery",
      "Saturday specials included",
    ],
    cta: "Customize Plan",
    enquiry: "I'd like to customise the Lunch Plan. The reference price I saw starts from ₹2,500 per month.",
    popular: false,
  },
  {
    name: "Full Day Plan",
    tags: ["Best Value"],
    priceLead: "",
    price: "₹4,500",
    period: "per month — Full Day",
    disclaimer: "",
    features: [
      "Lunch + Dinner (Mon–Sat)",
      "Two fresh meals daily",
      "Full thali, every meal",
      "Free delivery always",
      "Saturday specials",
      "Priority support",
    ],
    cta: "Order Now",
    enquiry: "I'd like to order the Full Day Plan. The reference price I saw is ₹4,500 per month.",
    popular: true,
  },
  {
    name: "Dinner Plan",
    tags: ["Flexible Plan", "Customizable Meals"],
    priceLead: "Starting from",
    price: "₹2,500",
    period: "per month",
    disclaimer: "*Final pricing may vary",
    features: [
      "Dinner only (Mon–Sat)",
      "Delivered by 7:30 PM",
      "Full thali every night",
      "Free delivery",
      "Saturday specials included",
    ],
    cta: "Customize Plan",
    enquiry: "I'd like to customise the Dinner Plan. The reference price I saw starts from ₹2,500 per month.",
    popular: false,
  },
];

export function Plans() {
  return (
    <section id="plans" className="section-anchor bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl text-4xl leading-[1.05] font-extrabold text-charcoal md:text-6xl">
            Simple, Affordable Plans
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-charcoal/75">
            No contracts, no hidden fees. Subscribe monthly and save big. Cancel anytime.
          </p>
        </Reveal>

        <div className="mt-10 grid items-stretch gap-5 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.06} className="flex">
              <article
                className={cn(
                  "flex h-full w-full flex-col rounded-[1.8rem] p-6 md:p-7",
                  plan.popular
                    ? "bg-charcoal text-cream shadow-[0_18px_40px_rgba(33,28,25,0.18)] lg:-translate-y-3"
                    : "border border-charcoal/10 bg-cream text-charcoal",
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {plan.popular ? (
                    <span className="rounded-full bg-tomato px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
                      Most Popular
                    </span>
                  ) : null}
                  {plan.tags.map((tag) => (
                    <span
                      key={tag}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold",
                        plan.popular ? "bg-white/10 text-haldi" : "bg-white text-charcoal",
                      )}
                    >
                      {tag === "Best Value" ? <Star className="h-3.5 w-3.5 fill-current" aria-hidden /> : null}
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-4 text-4xl leading-[1.1]">{plan.name}</h3>

                <div className="mt-5">
                  <p className={cn("min-h-5 text-sm font-semibold", plan.popular ? "text-cream/70" : "text-charcoal/60")}>
                    {plan.priceLead}
                  </p>
                  <p className={cn("text-5xl leading-[1.05] font-extrabold tracking-[-0.02em]", plan.popular ? "text-haldi" : "text-tomato")}>
                    {plan.price}
                  </p>
                  <p className={cn("mt-2 font-semibold", plan.popular ? "text-cream/80" : "text-charcoal/70")}>{plan.period}</p>
                  <p className={cn("mt-1 min-h-5 text-sm", plan.popular ? "text-cream/50" : "text-charcoal/55")}>{plan.disclaimer}</p>
                </div>

                <ul className="mt-5 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span
                        className={cn(
                          "mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                          plan.popular ? "bg-haldi text-charcoal" : "bg-tomato text-white",
                        )}
                      >
                        <Check className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className={plan.popular ? "text-cream/90" : "text-charcoal/80"}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={whatsAppUrl(plan.enquiry)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: plan.popular ? "secondary" : "primary", size: "lg" }),
                    "mt-6 w-full",
                  )}
                >
                  {plan.cta}
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
