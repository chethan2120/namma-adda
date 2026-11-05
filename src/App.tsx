import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IntroAnimation, shouldPlayIntro } from "@/components/sections/IntroAnimation";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Why } from "@/components/sections/Why";
import { Delivery } from "@/components/sections/Delivery";
import { Plans } from "@/components/sections/Plans";
import { Gallery } from "@/components/sections/Gallery";
import { Occasion } from "@/components/sections/Occasion";
import { Feedback } from "@/components/sections/Feedback";
import { Contact } from "@/components/sections/Contact";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsAppUrl } from "@/lib/site";

export default function App() {
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro());

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-3"
      >
        Skip to content
      </a>
      <AnimatePresence>
        {showIntro ? (
          <IntroAnimation
            onDone={() => {
              setShowIntro(false);
              setIntroDone(true);
            }}
          />
        ) : null}
      </AnimatePresence>
      <Navbar />
      <main id="main">
        <Hero playTypewriter={introDone} />
        <Marquee />
        <About />
        <Services />
        <Why />
        <Delivery />
        <Plans />
        <Gallery />
        <Occasion />
        <Feedback />
        <Contact />
      </main>
      <Footer />
      {introDone ? (
        <a
          href={whatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order on WhatsApp"
          className="fixed right-4 bottom-4 z-50 inline-flex min-h-14 items-center gap-2 rounded-full bg-[#25D366] px-5 font-bold text-white shadow-[0_8px_24px_rgba(33,28,25,0.28)]"
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      ) : null}
    </>
  );
}
