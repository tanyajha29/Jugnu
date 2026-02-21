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
  const baseStyle = "rounded-[24px] border border-white/10 bg-white/6 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out";

  const variantStyles = {
    default: "",
    elevated: "bg-white/8 border-white/12",
    subtle: "bg-white/4 border-white/8",
  };

  const hoverStyle = hover
    ? "hover:-translate-y-[2px] hover:shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
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
