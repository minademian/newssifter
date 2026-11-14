import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const HeroSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 42px;
  padding: 52px 0 64px;

  @media (max-width: 900px) {
    gap: 34px;
    padding: 42px 0 48px;
  }

  @media (max-width: 520px) {
    gap: 28px;
    padding: 34px 0 34px;
  }
`;

export const StepsColumn = styled.div`
  width: 100%;
  max-width: ${theme.layout.columnWidth};

  @media (max-width: 900px) {
    max-width: ${theme.layout.columnWidthTablet};
  }
`;

export const HeadingWrap = styled.div`
  width: 100%;
  max-width: 860px;
  text-align: center;

  h1 {
    margin: 0;
    color: ${theme.colors.ink};
    font-family: Georgia, 'Times New Roman', serif;
    font-size: clamp(36px, 4vw, 50px);
    font-weight: 500;
    letter-spacing: -0.065em;
    line-height: 0.99;

    @media (max-width: 900px) {
      font-size: clamp(43px, 8vw, 56px);
    }
  }

  h1 em {
    color: #1687d5;
    font-weight: 500;
  }
`;

export const Toggle = styled.div`
  display: inline-flex;
  padding: 3px;
  border: 1px solid ${theme.colors.line};
  border-radius: 999px;
  background: ${theme.colors.surface};
`;

export const ToggleButton = styled.button`
  padding: 4px 12px;
  border: 0;
  border-radius: 999px;
  color: ${theme.colors.muted};
  background: transparent;
  font-size: 11px;
  font-weight: 750;
  letter-spacing: 0.06em;
  cursor: pointer;

  &[aria-pressed='true'] {
    color: ${theme.colors.surface};
    background: ${theme.colors.ink};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.blue};
    outline-offset: 2px;
  }
`;
