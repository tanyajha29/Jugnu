/**
 * GlassCard - Premium glassmorphism component
 * Provides subtle blur, refined borders, and minimal elevation
 */
export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = true,
}) {
  const baseStyle = "backdrop-blur-2xl border rounded-[24px] transition-all duration-300 ease-out relative overflow-hidden shadow-[0_10px_50px_rgba(0,0,0,0.6)] bg-white/6 border-white/10";

  const variantStyles = {
    default: "",
    elevated: "bg-white/8 border-white/12",
    subtle: "bg-white/4 border-white/8",
  };

  const hoverStyle = hover
    ? "hover:-translate-y-[3px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] cursor-pointer"
    : "";

  return (
    <div
      className={`
        ${baseStyle}
        ${variantStyles[variant] || variantStyles.default}
        ${hoverStyle}
        ${className}
      `.trim()}
    >
      {children}
    </div>
  );
}
