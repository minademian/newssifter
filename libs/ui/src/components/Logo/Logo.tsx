import { LogoImage } from './Logo.styles';

export interface LogoProps {
  alt: string;
}

/** The full News Sifter logo: the stripe mark together with the lettering. */
export function Logo({ alt }: LogoProps) {
  return <LogoImage src="/logo-full.jpeg" alt={alt} />;
}

export default Logo;
