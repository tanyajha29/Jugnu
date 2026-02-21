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
  const baseStyle = "backdrop-blur-md border rounded-[24px] transition-color duration-300 relative overflow-hidden";

  const variantStyles = {
    default: "bg-white/4 border-white/8",
    elevated: "bg-white/6 border-white/10",
    subtle: "bg-white/3 border-white/6",
  };

  const hoverStyle = hover
    ? "hover:border-white/12 hover:bg-white/7 cursor-pointer"
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
