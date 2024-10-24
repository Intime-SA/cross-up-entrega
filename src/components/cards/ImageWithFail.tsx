"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageWithFallbackProps } from "@/domain/definitions";

const FALLBACK_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mayoristakaurymdp.appspot.com/o/CROSS%20UP%20(2).png?alt=media&token=69c6a629-2c04-4a5c-9d2a-81b33dcf126d";

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  const handleError = () => {
    if (!hasErrored) {
      setImgSrc(FALLBACK_IMAGE);
      setHasErrored(true);
    }
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      quality={100}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
