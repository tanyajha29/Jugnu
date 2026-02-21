import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function FireflyEngine({ count, animation }) {
  const { theme } = useContext(EmotionContext);
  const resolvedCount = Math.min(count ?? theme.fireflyCount ?? 5, 8); // Cap at 8, default 5
  const resolvedAnimation = animation ?? theme.fireflyAnimation ?? "drift";
  const baseDuration = theme.fireflyDuration ?? 52;

  const pickSafePosition = () => {
    const bands = [
      { x: [0, 18], y: [0, 100] },
      { x: [82, 100], y: [0, 100] },
      { x: [0, 100], y: [0, 18] },
      { x: [0, 100], y: [82, 100] },
    ];
    const band = bands[Math.floor(Math.random() * bands.length)];
    const x = band.x[0] + Math.random() * (band.x[1] - band.x[0]);
    const y = band.y[0] + Math.random() * (band.y[1] - band.y[0]);
    return { x, y };
  };

  return (
    <div className="fireflies" aria-hidden="true">
      {Array.from({ length: resolvedCount }).map((_, index) => {
        const pos = pickSafePosition();
        return (
          <span
            key={index}
            className={`firefly firefly--${resolvedAnimation}`}
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              animationDelay: `${Math.random() * -35}s`,
              animationDuration: `${baseDuration + Math.random() * 8}s`,
            }}
          />
        );
      })}
    </div>
  );
}
