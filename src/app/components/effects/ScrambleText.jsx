import React, { useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function scramble(original, progress) {
  // progress: 0 (all scrambled) to 1 (all original)
  return original
    .split("")
    .map((char, i) => {
      if (char === " " || Math.random() < progress) return char;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    })
    .join("");
}

export default function ScrambleText({ text, className, render }) {
  const [display, setDisplay] = useState(text);
  const timeoutRef = useRef();

  const handleMouseEnter = () => {
    let frame = 0;
    const totalFrames = 20;
    clearTimeout(timeoutRef.current);

    function animate() {
      frame++;
      const progress = frame / totalFrames;
      setDisplay(scramble(text, progress));
      if (frame < totalFrames) {
        timeoutRef.current = setTimeout(animate, 20);
      } else {
        setDisplay(text);
      }
    }
    animate();
  };

  const handleMouseLeave = () => {
    setDisplay(text);
    clearTimeout(timeoutRef.current);
  };

  return (
    <span
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transition: "color 0.3s" }}
    >
      {render ? render(display) : display}
    </span>
  );
}
