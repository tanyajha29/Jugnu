export default function GlassCard({
  children,
  className = "",
  variant = "default",
  intensity = "medium",
  hover = true,
  gradientBorder = false,
}) {
  const intensityClass = {
    low: "bg-white/4 backdrop-blur-md border-white/10",
    medium: "bg-white/6 backdrop-blur-lg border-white/12",
    high: "bg-white/10 backdrop-blur-xl border-white/15",
  }[intensity] || "bg-white/6 backdrop-blur-lg border-white/12";

  const variantClass = {
    default: "text-white/90",
    elevated: "bg-white/10 text-white/95",
    subtle: "bg-white/5 text-white/80",
  }[variant] || "text-white/90";

  const hoverClass = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.35)]"
    : "transition-all duration-300";

  const baseClassName = `
    w-full
    rounded-[24px]
    border
    shadow-[0_8px_24px_rgba(15,23,42,0.25)]
    ${intensityClass}
    ${variantClass}
    ${hoverClass}
  `;

  if (gradientBorder) {
    return (
      <div
        className={`rounded-2xl p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent ${className}`.trim()}
      >
        <div className={`p-8 ${baseClassName}`.trim()}>{children}</div>
      </div>
    );
  }

  return (
    <div className={`p-8 ${baseClassName} ${className}`.trim()}>
      {children}
    </div>
  );
}
