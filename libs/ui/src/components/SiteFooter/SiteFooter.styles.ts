import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 0 24px;
  color: ${theme.colors.mutedLight};
  border-top: 1px solid ${theme.colors.line};
  font-size: 10px;
  letter-spacing: 0.04em;

  @media (max-width: 520px) {
    font-size: 9px;
  }
`;
