interface BinpiLogoProps {
  size?: number;
  className?: string;
}

const BinpiLogo = ({ size = 32, className = "" }: BinpiLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="binpi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
          <stop offset="100%" stopColor="hsl(280, 85%, 65%)" />
        </linearGradient>
        <linearGradient id="binpi-inner" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      
      {/* Main circle */}
      <circle cx="24" cy="24" r="22" fill="url(#binpi-gradient)" />
      
      {/* Inner glow */}
      <circle cx="24" cy="24" r="18" fill="none" stroke="url(#binpi-inner)" strokeWidth="0.5" opacity="0.3" />
      
      {/* Brain/AI neural network paths */}
      <g fill="url(#binpi-inner)">
        {/* Central node */}
        <circle cx="24" cy="20" r="3.5" />
        
        {/* Left branch */}
        <circle cx="15" cy="24" r="2.5" />
        <rect x="17" y="21.5" width="4" height="1.5" rx="0.75" transform="rotate(15 19 22)" />
        
        {/* Right branch */}
        <circle cx="33" cy="24" r="2.5" />
        <rect x="27" y="21.5" width="4" height="1.5" rx="0.75" transform="rotate(-15 29 22)" />
        
        {/* Bottom node */}
        <circle cx="24" cy="32" r="2.5" />
        <rect x="23.25" y="23.5" width="1.5" height="6" rx="0.75" />
        
        {/* Bottom left connection */}
        <circle cx="17" cy="31" r="1.8" />
        <rect x="18" y="27" width="4" height="1.2" rx="0.6" transform="rotate(40 20 28)" />
        
        {/* Bottom right connection */}
        <circle cx="31" cy="31" r="1.8" />
        <rect x="26" y="27" width="4" height="1.2" rx="0.6" transform="rotate(-40 28 28)" />
      </g>
      
      {/* Sparkle accents */}
      <circle cx="12" cy="14" r="1" fill="white" opacity="0.6" />
      <circle cx="36" cy="16" r="0.8" fill="white" opacity="0.5" />
      <circle cx="38" cy="34" r="0.6" fill="white" opacity="0.4" />
    </svg>
  );
};

export default BinpiLogo;
