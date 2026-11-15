import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const Nuance = styled.aside`
  margin-top: 10px;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.blueLight};
  border-radius: 8px;
  background: ${theme.colors.surface};
`;

export const Title = styled.strong`
  display: block;
  color: ${theme.colors.ink};
  font-size: 12px;
  font-weight: 700;
`;

export const Body = styled.p`
  margin: 4px 0 0;
  color: ${theme.colors.muted};
  font-size: 12px;
  line-height: 1.55;
`;
