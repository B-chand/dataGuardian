export default function AppIcon({ name, className, size = 20, color = "currentColor" }) {
  // Placeholder icon component - returns a simple SVG circle
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <text x="12" y="16" fontSize="10" textAnchor="middle" fill={color} stroke="none">
        {name?.charAt(0)?.toUpperCase() || '?'}
      </text>
    </svg>
  );
}
