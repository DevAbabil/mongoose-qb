import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function Logo({
  width = 40,
  height = 40,
  className = "",
  priority = false,
}: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="Logo"
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
