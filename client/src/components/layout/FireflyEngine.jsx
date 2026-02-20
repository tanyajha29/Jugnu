import { useContext } from "react";
import { EmotionContext } from "../../context/EmotionContext";

export default function FireflyEngine({ count, animation }) {
  const { theme } = useContext(EmotionContext);
  const resolvedCount = Math.min(count ?? theme.fireflyCount ?? 6, 8); // Cap at 8
  const resolvedAnimation = animation ?? theme.fireflyAnimation ?? "drift";

  return (
    <div className="fireflies pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: resolvedCount }).map((_, index) => (
        <span
          key={index}
          className={`firefly firefly--${resolvedAnimation}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * -30}s`,
            animationDuration: `${40 + Math.random() * 20}s`, // 40-60s for subtler movement
          }}
        />
      ))}
    </div>
  );
}
