import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const Row = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.span`
  color: ${theme.colors.muted};
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Option = styled.button`
  padding: 4px 12px;
  border: 1px solid ${theme.colors.blueLight};
  border-radius: 999px;
  color: ${theme.colors.inkSoft};
  background: ${theme.colors.surface};
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  cursor: pointer;

  &[aria-pressed='true'] {
    border-color: ${theme.colors.ink};
    color: ${theme.colors.surface};
    background: ${theme.colors.ink};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.blue};
    outline-offset: 2px;
  }
`;
