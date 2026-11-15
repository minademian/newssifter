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

// Banner at the start, page links in the middle, page controls at the end.
// On narrow screens they stack from the start.
export const Header = styled.header`
  min-height: 92px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  border-bottom: 1px solid ${theme.colors.line};

  @media (max-width: 520px) {
    min-height: 72px;
    grid-template-columns: 1fr;
    justify-items: start;
    row-gap: 4px;
    padding-bottom: 8px;
  }
`;

export const Actions = styled.div`
  grid-column: 3;
  justify-self: end;

  @media (max-width: 520px) {
    grid-column: 1;
    justify-self: start;
  }
`;

export const Nav = styled.nav`
  grid-column: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;

  @media (max-width: 520px) {
    grid-column: 1;
    justify-self: start;
  }
`;

export const NavLink = styled.a`
  color: ${theme.colors.ink};
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.blue};
    outline-offset: 2px;
  }
`;

export const Brand = styled.a`
  grid-column: 1;
  justify-self: start;
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
