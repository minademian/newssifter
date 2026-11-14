import { AvatarVariant, StyledAvatar } from './Avatar.styles';

export interface AvatarProps {
  variant: AvatarVariant;
  src?: string;
}

export function Avatar({ variant, src = '/logo.jpeg' }: AvatarProps) {
  return (
    <StyledAvatar variant={variant} aria-hidden="true">
      <img src={src} alt="" />
    </StyledAvatar>
  );
}

export default Avatar;
