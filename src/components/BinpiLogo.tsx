import binpiLogo from "@/assets/binpi-logo.png";

interface BinpiLogoProps {
  size?: number;
  className?: string;
}

const BinpiLogo = ({ size = 32, className = "" }: BinpiLogoProps) => {
  return (
    <img
      src={binpiLogo}
      alt="Binpi AI Logo"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
    />
  );
};

export default BinpiLogo;
