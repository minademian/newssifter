import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const StyledAvatar = styled.span`
  width: 27px;
  height: 27px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  overflow: hidden;
  background: ${theme.colors.blueLight};
  border-radius: 9px;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    mix-blend-mode: multiply;
  }
`;
