import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const Note = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 11px 2px 0;
  color: ${theme.colors.mutedLight};
  font-size: 10px;

  svg {
    width: 13px;
    height: 13px;
    flex: 0 0 auto;
    color: #258fda;
  }

  @media (max-width: 520px) {
    align-items: flex-start;
    font-size: 9px;
    line-height: 1.4;
  }
`;
