import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { encode } from "qss";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
} & ({ isStatic: true; imageSrc: string } | { isStatic?: false; imageSrc?: never });

export function LinkPreview({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) {
  const src = isStatic
    ? imageSrc
    : `https://api.microlink.io/?${encode({
        url,
        screenshot: true,
        meta: false,
        embed: "screenshot.url",
        colorScheme: "dark",
        quality,
        "viewport.isMobile": true,
        "viewport.deviceScaleFactor": 1,
        "viewport.width": width * 3,
        "viewport.height": height * 3,
      })}`;

  const [isOpen, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [previewOk, setPreviewOk] = useState(true);
  const [canHover] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false,
  );

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const external = /^https?:\/\//.test(url);
  const linkProps = external
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  if (!canHover) {
    return (
      <a href={url} className={cn("text-charcoal", className)} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <>
      {isMounted && isStatic ? (
        <div className="hidden" aria-hidden="true">
          <img src={src} width={width} height={height} alt="" />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
          if (open) setIsMounted(true);
        }}
      >
        <HoverCardPrimitive.Trigger asChild>
          <a
            href={url}
            onMouseMove={handleMouseMove}
            className={cn("text-charcoal", className)}
            {...linkProps}
          >
            {children}
          </a>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="z-[60] [transform-origin:var(--radix-hover-card-content-transform-origin)]"
            side="top"
            align="center"
            sideOffset={10}
          >
            <AnimatePresence>
              {isOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 260, damping: 20 },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  className="rounded-xl shadow-xl"
                  style={{ x: translateX }}
                >
                  <a
                    href={url}
                    className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-haldi"
                    {...linkProps}
                  >
                    {previewOk ? (
                      <img
                        src={isStatic ? imageSrc : src}
                        width={width}
                        height={height}
                        style={{ width, height }}
                        className="rounded-lg object-cover"
                        alt="Preview of this Namma Dabba link"
                        onError={() => setPreviewOk(false)}
                      />
                    ) : (
                      <span className="block px-4 py-6 text-center font-body text-sm text-charcoal">
                        Preview unavailable. Open the link to continue.
                      </span>
                    )}
                  </a>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
}
