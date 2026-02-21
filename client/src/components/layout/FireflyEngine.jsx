import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function FireflyEngine({ count, animation }) {
  const { theme } = useContext(EmotionContext);
  const resolvedCount = Math.min(count ?? theme.fireflyCount ?? 5, 8); // Cap at 8, default 5
  const resolvedAnimation = animation ?? theme.fireflyAnimation ?? "drift";
  const baseDuration = theme.fireflyDuration ?? 52;

  return (
    <div className="fireflies" aria-hidden="true">
      {Array.from({ length: resolvedCount }).map((_, index) => (
        <span
          key={index}
          className={`firefly firefly--${resolvedAnimation}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * -35}s`,
            animationDuration: `${baseDuration + Math.random() * 8}s`,
          }}
        />
      ))}
    </div>
  );
}
