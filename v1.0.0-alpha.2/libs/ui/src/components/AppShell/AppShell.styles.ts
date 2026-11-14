import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const Shell = styled.main`
  min-height: 100vh;
  overflow: hidden;
  background: radial-gradient(
      ellipse at 10% 12%,
      rgba(52, 166, 255, 0.13),
      transparent 34rem
    ),
    radial-gradient(
      ellipse at 92% 78%,
      rgba(254, 140, 54, 0.08),
      transparent 28rem
    ),
    #f5faff;
`;

export const Container = styled.div`
  width: min(1200px, calc(100% - 64px));
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: min(650px, calc(100% - 40px));
  }

  @media (max-width: 520px) {
    width: calc(100% - 32px);
  }
`;

export const Header = styled.header`
  min-height: 92px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${theme.colors.line};

  @media (max-width: 520px) {
    min-height: 72px;
  }
`;

export const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
`;

export const BrandBanner = styled.img`
  width: 190px;
  height: 74px;
  object-fit: contain;
  mix-blend-mode: multiply;

  @media (max-width: 520px) {
    width: 158px;
    height: 62px;
  }
`;
