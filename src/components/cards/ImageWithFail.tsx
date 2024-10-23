import { useState } from "react";

const FALLBACK_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/mayoristakaurymdp.appspot.com/o/CROSS%20UP%20(2).png?alt=media&token=69c6a629-2c04-4a5c-9d2a-81b33dcf126d";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageWithFallback({
  src,
  alt,
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
    <img src={imgSrc} alt={alt} className={className} onError={handleError} />
  );
}
