import { useMemo } from "react";

const buildFireflies = (count) =>
  Array.from({ length: count }, (_, index) => {
    const size = 6 + (index % 3) * 2;
    const top = 10 + (index * 13) % 80;
    const left = 12 + (index * 19) % 80;
    const delay = (index % 5) * 1.6;
    const duration = 18 + (index % 4) * 6;
    return { id: index, size, top, left, delay, duration };
  });

export default function FireflyField({
  count = 6,
  speedMultiplier = 1,
  color = "rgba(253, 224, 71, 0.6)",
  className = "",
}) {
  const fireflies = useMemo(() => buildFireflies(count), [count]);

  return (
    <div className={`firefly-field ${className}`.trim()} aria-hidden="true">
      {fireflies.map((fly) => (
        <span
          key={fly.id}
          className="firefly"
          style={{
            width: fly.size,
            height: fly.size,
            top: `${fly.top}%`,
            left: `${fly.left}%`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.duration * speedMultiplier}s`,
            background: color,
            boxShadow: `0 0 12px ${color}`,
          }}
        />
      ))}
    </div>
  );
}
