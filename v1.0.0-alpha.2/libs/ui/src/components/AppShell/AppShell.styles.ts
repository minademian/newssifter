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

// Three columns with equal outer ones, so the banner sits in the true middle whatever
// the width of the page controls on the right. On narrow screens they stack instead.
export const Header = styled.header`
  min-height: 92px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.line};

  @media (max-width: 520px) {
    min-height: 72px;
    grid-template-columns: 1fr;
    justify-items: center;
    row-gap: 4px;
    padding-bottom: 8px;
  }
`;

export const Actions = styled.div`
  grid-column: 3;
  justify-self: end;

  @media (max-width: 520px) {
    grid-column: 1;
    justify-self: center;
  }
`;

export const Brand = styled.a`
  grid-column: 2;
  display: inline-flex;
  align-items: center;
  text-decoration: none;

  @media (max-width: 520px) {
    grid-column: 1;
  }
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
