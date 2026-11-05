import { whatsAppUrl } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const notes = [
  {
    name: "Anjali R.",
    text: "I get the office dabba twice a week. Rice, dal and roti come in one box, and it tastes like someone cooked at home, not like a canteen tray.",
  },
  {
    name: "Vikram S.",
    text: "Ordered four boxes for a small family lunch. Every dabba had roti, sabzi and salad, packed the same way. Sorting it on WhatsApp took one message.",
  },
  {
    name: "Fatima K.",
    text: "The dinner tiffin is what I open after work. The paratha is still soft, the portions match what I asked for, and I know the amount before I pay.",
  },
];

export function Feedback() {
  return (
    <section id="feedback" className="section-anchor bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-center text-sm font-semibold tracking-[0.18em] text-tomato uppercase">Customer feedback</p>
          <h2 className="mt-3 text-center font-display text-4xl leading-[1.05] font-extrabold md:text-6xl">
            Good Food Deserves Good Words!
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {notes.map((note, index) => (
            <Reveal key={note.name} delay={index * 0.06}>
              <figure className="flex h-full flex-col rounded-[1.6rem] bg-white p-6 shadow-[0_10px_30px_rgba(33,28,25,0.06)]">
                <blockquote className="flex-1 text-lg leading-relaxed text-charcoal">“{note.text}”</blockquote>
                <figcaption className="mt-6 text-xl font-semibold text-tomato">{note.name}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a
            href={whatsAppUrl("I'd love to share feedback about my experience.")}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
          >
            <WhatsAppIcon />
            SHARE YOUR FEEDBACK
          </a>
        </div>
      </div>
    </section>
  );
}
