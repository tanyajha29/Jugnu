export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = true,
}) {
  const baseStyle = "backdrop-blur-lg border rounded-2xl transition-all duration-300 relative overflow-hidden";

  const variantStyles = {
    default: "bg-white/5 border-white/8 shadow-sm",
    elevated: "bg-white/8 border-white/12 shadow-md",
    subtle: "bg-white/[0.02] border-white/5 shadow-none",
  };

  const hoverStyle = hover
    ? "hover:border-white/12 hover:bg-white/[0.07] hover:shadow-md"
    : "";

  return (
    <div className={`
      ${baseStyle}
      ${variantStyles[variant] || variantStyles.default}
      ${hoverStyle}
      ${className}
    `.trim()}>
      {children}
    </div>
  );
}
