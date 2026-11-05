import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { foodVideos, galleryImages } from "@/lib/media";
import { whatsAppUrl } from "@/lib/site";
import { FoodImage } from "@/components/ui/food-image";
import { LinkPreview } from "@/components/ui/link-preview";
import { Reveal } from "@/components/motion/Reveal";

type ActiveMedia =
  | { kind: "image"; index: number }
  | { kind: "video"; index: number }
  | null;

export function Gallery() {
  const [active, setActive] = useState<ActiveMedia>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const feature = galleryImages[0];
  const imageReel = [...galleryImages, ...galleryImages];
  const videoReel = [...foodVideos, ...foodVideos];

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll<HTMLVideoElement>("#gallery video"));
    const playAll = () => {
      videos.forEach((video) => {
        video.muted = true;
        if (video.paused) void video.play().catch(() => undefined);
      });
    };
    playAll();
    videos.forEach((video) => video.addEventListener("loadeddata", playAll));
    return () => videos.forEach((video) => video.removeEventListener("loadeddata", playAll));
  }, []);

  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (active.kind !== "image") return;
      if (event.key === "ArrowRight") {
        setActive({ kind: "image", index: (active.index + 1) % galleryImages.length });
      }
      if (event.key === "ArrowLeft") {
        setActive({
          kind: "image",
          index: (active.index - 1 + galleryImages.length) % galleryImages.length,
        });
      }
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const openVideo = (index: number) => {
    setVideoFailed(false);
    setActive({ kind: "video", index });
  };

  return (
    <section id="gallery" className="section-anchor bg-charcoal py-20 text-cream md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.18em] text-haldi uppercase">Food photography</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.05] font-extrabold md:text-6xl">
            A dabba worth looking at.
          </h2>
          <p className="mt-4 max-w-2xl text-lg font-medium text-cream/75">
            Real plates from the Namma Dabba kitchen. Hover a link to preview a box, or open any photo and film.
          </p>
          <p className="mt-4">
            <LinkPreview
              url={whatsAppUrl("I'd like to order a tiffin like the ones in your gallery.")}
              isStatic
              imageSrc={feature.src}
              width={280}
              height={180}
              className="text-lg font-bold text-haldi underline decoration-tomato decoration-4 underline-offset-4"
            >
              Preview this dabba and ask on WhatsApp
            </LinkPreview>
          </p>
        </Reveal>

      </div>

      <div className="mt-10 overflow-hidden">
        <div className="reel-track reel-right px-4">
          {imageReel.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              type="button"
              className="mr-4 w-64 shrink-0 overflow-hidden rounded-[1.4rem] sm:w-80"
              onClick={() => setActive({ kind: "image", index: index % galleryImages.length })}
            >
              <FoodImage src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 md:px-8">
        <h3 className="font-display text-3xl font-extrabold">Films from the kitchen</h3>
      </div>
      <div className="mt-5 overflow-hidden">
        <div className="reel-track reel-left px-4">
          {videoReel.map((video, index) => (
            <button
              key={`${video.src}-${index}`}
              type="button"
              className="relative mr-4 w-64 shrink-0 overflow-hidden rounded-[1.4rem] sm:w-80"
              onClick={() => openVideo(index % foodVideos.length)}
            >
              <video
                className="aspect-[4/3] w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={video.poster}
                aria-label={video.alt}
              >
                <source src={video.src} type="video/mp4" />
              </video>
              <span className="absolute right-3 bottom-3 left-3 text-left text-lg font-semibold text-white drop-shadow">
                {video.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.kind === "image" ? "Food photograph" : "Food video"}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-charcoal"
            onClick={() => setActive(null)}
          >
            <span className="sr-only">Close</span>
            <X />
          </button>

          {active.kind === "image" ? (
            <figure className="w-full max-w-5xl">
              <FoodImage
                key={galleryImages[active.index].src}
                src={galleryImages[active.index].src}
                alt={galleryImages[active.index].alt}
                priority
                className="mx-auto max-h-[min(68vh,40rem)] w-auto max-w-full rounded-2xl object-contain"
              />
              <figcaption className="mt-3 text-center text-cream">{galleryImages[active.index].alt}</figcaption>
              <div className="relative z-10 mt-4 flex justify-center gap-3">
                <button
                  type="button"
                  className="min-h-12 rounded-full bg-white px-5 font-bold text-charcoal"
                  onClick={() =>
                    setActive((current) =>
                      current?.kind === "image"
                        ? {
                            kind: "image",
                            index: (current.index - 1 + galleryImages.length) % galleryImages.length,
                          }
                        : current,
                    )
                  }
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="min-h-12 rounded-full bg-haldi px-5 font-bold text-charcoal"
                  onClick={() =>
                    setActive((current) =>
                      current?.kind === "image"
                        ? { kind: "image", index: (current.index + 1) % galleryImages.length }
                        : current,
                    )
                  }
                >
                  Next
                </button>
              </div>
            </figure>
          ) : (
            <div className="w-full max-w-4xl">
              {videoFailed ? (
                <div className="rounded-2xl bg-cream p-6 text-charcoal">
                  <p className="text-2xl font-bold">This video could not be played.</p>
                  <img
                    src={foodVideos[active.index].poster}
                    alt={foodVideos[active.index].alt}
                    className="mt-4 max-h-[50vh] w-full rounded-xl object-cover"
                  />
                </div>
              ) : (
                <video
                  key={foodVideos[active.index].src}
                  className="max-h-[78vh] w-full rounded-2xl bg-black"
                  controls
                  playsInline
                  autoPlay
                  muted
                  poster={foodVideos[active.index].poster}
                  preload="metadata"
                  onError={() => setVideoFailed(true)}
                >
                  <source src={foodVideos[active.index].src} type="video/mp4" />
                </video>
              )}
              <p className="mt-3 text-center text-cream">{foodVideos[active.index].title}</p>
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
