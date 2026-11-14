import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const StyledIconButton = styled.button`
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
  border: 1px solid ${theme.colors.blueLight};
  border-radius: 8px;
  color: ${theme.colors.inkSoft};
  background: ${theme.colors.surface};
  cursor: pointer;

  &:hover {
    border-color: ${theme.colors.blue};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.blue};
    outline-offset: 2px;
  }
`;
