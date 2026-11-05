import { services } from "@/lib/media";
import { whatsAppUrl } from "@/lib/site";
import { FoodImage } from "@/components/ui/food-image";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";

export function Services() {
  return (
    <section id="food" className="section-anchor overflow-x-clip bg-[#fffaf0] py-20 md:py-28">
      <div className="mx-auto min-w-0 max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-tomato uppercase">Our food & services</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold md:text-6xl">
            What's Cooking at Namma Dabba?
          </h2>
        </Reveal>

        <div className="mt-10 flex w-full min-w-0 items-stretch gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-2 lg:overflow-visible xl:grid-cols-4">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 0.05} className="flex w-[78%] shrink-0 lg:w-auto">
              <article className="group flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-charcoal/10 bg-white shadow-[0_16px_40px_rgba(33,28,25,0.06)] transition duration-300 hover:-translate-y-1.5">
                <div className="overflow-hidden">
                  <FoodImage
                    src={service.image}
                    alt={service.alt}
                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 md:p-5">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${service.tone === "red" ? "bg-tomato" : "bg-haldi"}`}
                      aria-hidden
                    />
                    <h3 className="text-xl leading-tight font-extrabold md:text-2xl">{service.title}</h3>
                  </div>
                  <p className="mt-2 flex-1 text-sm font-medium leading-relaxed text-charcoal/75 md:text-base">{service.copy}</p>
                  <a
                    href={whatsAppUrl(service.enquiry)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-charcoal px-4 text-sm font-extrabold text-cream hover:bg-tomato"
                  >
                    <WhatsAppIcon />
                    Enquire
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
