import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export type Tone = 1 | 2 | 3 | 4;

const TONES: Record<
  Tone,
  { tabBackground: string; tabColor: string; title: string }
> = {
  1: {
    tabBackground: theme.colors.ink,
    tabColor: theme.colors.surface,
    title: theme.colors.ink,
  },
  2: {
    tabBackground: theme.colors.orange,
    tabColor: theme.colors.surface,
    title: '#d87827',
  },
  3: {
    tabBackground: theme.colors.blueLight,
    tabColor: theme.colors.ink,
    title: theme.colors.inkSoft,
  },
  4: {
    tabBackground: theme.colors.blue,
    tabColor: theme.colors.surface,
    title: '#1687d5',
  },
};

export const Container = styled.div`
  width: 100%;
  max-width: 720px;
`;

export const Ladder = styled.ol`
  display: grid;
  gap: 2px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const Item = styled.li`
  position: relative;
  min-height: 112px;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 18px 24px 18px calc(132px + 24px);
  background: ${theme.colors.surface};
  box-shadow: 0 2px 6px rgba(23, 54, 79, 0.08);

  @media (max-width: 640px) {
    padding-left: calc(76px + 16px);
    gap: 14px;
  }
`;

export const Tab = styled.span<{ tone: Tone }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 132px;
  display: grid;
  place-items: center;
  color: ${({ tone }) => TONES[tone].tabColor};
  background: ${({ tone }) => TONES[tone].tabBackground};
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -0.04em;

  @media (max-width: 640px) {
    width: 76px;
    font-size: 28px;
  }
`;

export const Title = styled.h3<{ tone: Tone }>`
  margin: 0 0 4px;
  color: ${({ tone }) => TONES[tone].title};
  font-size: 17px;
  font-weight: 700;
`;

export const Text = styled.p`
  margin: 0;
  max-width: 520px;
  color: ${theme.colors.muted};
  font-size: 14px;
  line-height: 1.6;
`;
