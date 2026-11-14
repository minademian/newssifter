import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export type AvatarVariant = 'header' | 'bot';

const VARIANTS: Record<
  AvatarVariant,
  { size: string; background: string; radius: string }
> = {
  header: { size: '42px', background: theme.colors.bluePale, radius: '14px' },
  bot: { size: '27px', background: theme.colors.blueLight, radius: '9px' },
};

export const StyledAvatar = styled.span<{ variant: AvatarVariant }>`
  width: ${({ variant }) => VARIANTS[variant].size};
  height: ${({ variant }) => VARIANTS[variant].size};
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  overflow: hidden;
  background: ${({ variant }) => VARIANTS[variant].background};
  border-radius: ${({ variant }) => VARIANTS[variant].radius};

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    mix-blend-mode: multiply;
  }
`;
