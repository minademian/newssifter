import { StyledAvatar } from './Avatar.styles';

export interface AvatarProps {
  src?: string;
}

export function Avatar({ src = '/logo.jpeg' }: AvatarProps) {
  return (
    <StyledAvatar aria-hidden="true">
      <img src={src} alt="" />
    </StyledAvatar>
  );
}

export default Avatar;
