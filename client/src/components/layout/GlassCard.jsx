export default function GlassCard({
  children,
  className = "",
  variant = "default",
  hover = false,
}) {
  const baseStyle = "rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-lg shadow-[0_12px_40px_rgba(2,6,23,0.45)]";

  const variantStyles = {
    default: "",
    elevated: "bg-white/[0.08]",
    subtle: "bg-white/[0.04]",
  };

  const hoverStyle = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(2,6,23,0.6)]"
    : "";

  return (
    <div className={`${baseStyle} ${variantStyles[variant] || ""} ${hoverStyle} ${className}`.trim()}>
      {children}
    </div>
  );
}
