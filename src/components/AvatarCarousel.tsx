"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const INTERVAL_MS = 10_000;

export default function AvatarCarousel({
  urls,
  alt,
}: {
  urls: string[];
  alt: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (urls.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % urls.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [urls.length]);

  return (
    <>
      {urls.map((url, i) => (
        <Image
          key={url}
          src={url}
          alt={alt}
          fill
          sizes="144px"
          preload={i === 0}
          aria-hidden={i !== index}
          className={`object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </>
  );
}
