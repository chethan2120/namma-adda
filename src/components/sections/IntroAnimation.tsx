import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const INTRO_KEY = "namma-dabba-intro-seen";

type IntroAnimationProps = {
  onDone: () => void;
};

function BurstLetter({
  letter,
  className,
  delay,
}: {
  letter: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.span
      className={`inline-block sticker-type ${className}`}
      initial={{ y: 90, opacity: 0, rotate: -14, scale: 0.55 }}
      animate={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 520, damping: 15, delay }}
    >
      {letter}
    </motion.span>
  );
}

export function IntroAnimation({ onDone }: IntroAnimationProps) {
  const reduce = useReducedMotion() === true;
  const [opened, setOpened] = useState(false);
  const finished = useRef(false);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* private mode */
    }
    onDone();
  };

  useEffect(() => {
    if (reduce) {
      finish();
      return;
    }
    const openTimer = window.setTimeout(() => setOpened(true), 2450);
    const endTimer = window.setTimeout(finish, 4800);
    const safety = window.setTimeout(finish, 8000);
    return () => {
      window.clearTimeout(openTimer);
      window.clearTimeout(endTimer);
      window.clearTimeout(safety);
    };
    // finish is stable enough for this one-shot sequence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const namma = "NAMMA".split("");
  const dabba = "DABBA".split("");

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-cream"
      role="dialog"
      aria-label="Namma Dabba introduction"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="absolute -left-8 top-10 h-28 w-28 rounded-full bg-tomato sm:h-36 sm:w-36"
        initial={{ x: -120, scale: 0.2, rotate: -20 }}
        animate={{ x: 0, scale: 1, rotate: 8 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        aria-hidden
      />
      <motion.span
        className="absolute right-6 top-16 h-16 w-16 rounded-[1.4rem] bg-haldi sm:h-24 sm:w-24"
        initial={{ y: -140, scale: 0.2, rotate: 30 }}
        animate={{ y: 0, scale: 1, rotate: 12 }}
        transition={{ type: "spring", stiffness: 200, damping: 13, delay: 0.12 }}
        aria-hidden
      />
      <motion.span
        className="absolute bottom-14 left-8 h-14 w-14 rounded-full bg-haldi sm:h-20 sm:w-20"
        initial={{ y: 120, scale: 0 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.2 }}
        aria-hidden
      />
      <motion.span
        className="absolute right-10 bottom-20 h-20 w-20 rounded-full bg-tomato sm:h-28 sm:w-28"
        initial={{ x: 140, scale: 0.3 }}
        animate={{ x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 15, delay: 0.18 }}
        aria-hidden
      />
      <motion.span
        className="absolute top-1/3 left-[12%] h-4 w-4 rounded-full bg-tomato"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.35, type: "spring", stiffness: 300, damping: 12 }}
        aria-hidden
      />
      <motion.span
        className="absolute top-[22%] right-[18%] h-3 w-3 rounded-full bg-charcoal"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.42, type: "spring", stiffness: 300, damping: 12 }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        <motion.div
          className="relative mb-2"
          initial={{ y: 30, opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ y: [30, 0, -6, 0], opacity: 1, scale: 1, rotate: [-8, 0, 2, 0] }}
          transition={{ duration: 1.1, delay: 0.28, times: [0, 0.55, 0.8, 1], ease: "easeOut" }}
        >
          <div className="pointer-events-none absolute -inset-8" aria-hidden>
            {opened
              ? [0, 45, 90, 135, 180, 225].map((angle) => (
                  <motion.span
                    key={angle}
                    className="absolute top-1/2 left-1/2 h-1.5 w-8 origin-left rounded-full bg-tomato"
                    style={{ rotate: angle }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16 }}
                  />
                ))
              : null}
          </div>

          <div className="relative h-40 w-32 sm:h-48 sm:w-40">
            {opened ? (
              <div className="pointer-events-none absolute inset-x-6 top-0 h-16" aria-hidden>
                {[0, 1, 2].map((puff) => (
                  <span
                    key={puff}
                    className="steam-puff dark"
                    style={{ left: `${22 + puff * 22}%`, animationDelay: `${puff * 0.35}s` }}
                  />
                ))}
              </div>
            ) : null}
            <svg viewBox="0 0 200 230" className="h-full w-full overflow-visible">
              <motion.g
                animate={opened ? { y: -28, rotate: -6 } : { y: 0, rotate: 0 }}
                transition={{ type: "spring", stiffness: 180, damping: 12 }}
                style={{ originX: "100px", originY: "36px" }}
              >
                <rect x="78" y="8" width="44" height="16" rx="7" fill="#F0271D" stroke="#211C19" strokeWidth="5" />
                <rect x="46" y="22" width="108" height="30" rx="12" fill="#F5C400" stroke="#211C19" strokeWidth="5" />
              </motion.g>
              <rect x="40" y="62" width="120" height="40" rx="12" fill="#FFE56A" stroke="#211C19" strokeWidth="5" />
              <rect x="40" y="110" width="120" height="40" rx="12" fill="#F5C400" stroke="#211C19" strokeWidth="5" />
              <rect x="40" y="158" width="120" height="46" rx="14" fill="#FFD84A" stroke="#211C19" strokeWidth="5" />
              <rect x="28" y="74" width="14" height="24" rx="4" fill="#211C19" />
              <rect x="158" y="74" width="14" height="24" rx="4" fill="#211C19" />
              <rect x="28" y="168" width="14" height="24" rx="4" fill="#211C19" />
              <rect x="158" y="168" width="14" height="24" rx="4" fill="#211C19" />
            </svg>
          </div>
        </motion.div>

        <div className="text-center leading-none">
          <p className="font-logo text-[clamp(3rem,12vw,7.25rem)] leading-[0.82] tracking-normal">
            {namma.map((letter, index) => (
              <BurstLetter key={`n-${letter}-${index}`} letter={letter} className="text-tomato" delay={0.9 + index * 0.06} />
            ))}
          </p>
          <p className="font-logo text-[clamp(3rem,12vw,7.25rem)] leading-[0.82] tracking-normal">
            {dabba.map((letter, index) => (
              <BurstLetter key={`d-${letter}-${index}`} letter={letter} className="text-haldi" delay={1.28 + index * 0.06} />
            ))}
          </p>
          <svg viewBox="0 0 320 36" className="mx-auto mt-2 w-[70%] max-w-md" aria-hidden>
            <motion.path
              d="M8 22 C 80 6, 170 34, 312 12"
              stroke="#F0271D"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.85, duration: 0.55, ease: "easeOut" }}
            />
          </svg>
        </div>
      </div>

      <button
        type="button"
        onClick={finish}
        className="absolute top-4 right-4 z-20 min-h-12 rounded-full border-2 border-charcoal bg-white px-4 text-sm font-bold text-charcoal shadow-[0_4px_0_#211C19] hover:-translate-y-0.5"
      >
        Skip intro
      </button>
    </motion.div>
  );
}

export function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return false;
  }
}
