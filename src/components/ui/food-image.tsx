import { useEffect, useState } from "react";
import { FALLBACK_IMAGE } from "@/lib/media";
import { cn } from "@/lib/utils";

type FoodImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function FoodImage({ src, alt, className, priority = false }: FoodImageProps) {
  const [current, setCurrent] = useState(src);

  useEffect(() => {
    setCurrent(src);
  }, [src]);

  return (
    <img
      src={current}
      alt={alt}
      className={cn(className)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      onError={() => {
        setCurrent((previous) => (previous === FALLBACK_IMAGE ? previous : FALLBACK_IMAGE));
      }}
    />
  );
}
