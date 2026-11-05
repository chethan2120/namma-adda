import { Reveal } from "@/components/motion/Reveal";

const notes = [
  {
    mark: "📍",
    title: "Delivery Area",
    body: "Ram Nagar, Hill Road & surrounding areas of Nagpur. Contact us to check your pincode.",
  },
  {
    mark: "⏰",
    title: "Delivery Timings",
    body: "Lunch: Before 12:30 PM\nDinner: Before 7:30 PM\nMonday to Saturday",
  },
  {
    mark: "🚫",
    title: "No Hidden Costs",
    body: "Free delivery always included. No extra charges. What you see is what you pay.",
  },
];

export function Delivery() {
  return (
    <section id="delivery" className="section-anchor bg-cream py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-2 md:px-8 xl:grid-cols-3">
        {notes.map((note, index) => {
          return (
            <Reveal key={note.title} delay={index * 0.05}>
              <article className="flex h-full gap-4 rounded-[1.6rem] bg-white p-6 shadow-[0_10px_30px_rgba(33,28,25,0.06)]">
                <span className="text-3xl leading-none" aria-hidden>
                  {note.mark}
                </span>
                <div>
                  <h3 className="text-2xl font-extrabold">{note.title}</h3>
                  <p className="mt-2 font-medium whitespace-pre-line leading-relaxed text-charcoal/80">{note.body}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
