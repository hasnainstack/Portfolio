"use client";

import { useEffect, useState } from "react";

export default function TypingWord({
  word,
  delay = 0,
  className = "",
}: {
  word: string;
  delay?: number;
  className?: string;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const start = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(word.slice(0, i));
        if (i >= word.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, 80);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(start);
  }, [word, delay]);

  return (
    <em className={`italic ${className}`}>
      {displayed}
      {!done && <span className="animate-pulse">|</span>}
    </em>
  );
}
