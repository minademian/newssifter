import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const SLIDE_MS = 250;

export const Root = styled.div`
  width: 100%;
  overflow: hidden;
  border: 1px solid ${theme.colors.line};
  border-radius: 14px;
  background: ${theme.colors.surface};
`;

export const Heading = styled.h2`
  margin: 0;
  font-size: inherit;
`;

export const Trigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 20px;
  border: 0;
  color: ${theme.colors.ink};
  background: ${theme.colors.surface};
  font-size: 15px;
  font-weight: 700;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${theme.colors.bluePale};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.blue};
    outline-offset: -2px;
  }

  svg {
    flex: 0 0 auto;
  }
`;

// The row grows from 0fr to 1fr, which slides the content open without measuring it.
// While closed the panel is also visibility: hidden (after the slide ends), so its
// content is out of the tab order and hidden from screen readers.
export const Panel = styled.div<{ isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ isOpen }) => (isOpen ? '1fr' : '0fr')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
  transition: grid-template-rows ${SLIDE_MS}ms ease,
    visibility 0s linear ${({ isOpen }) => (isOpen ? '0ms' : `${SLIDE_MS}ms`)};

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

export const PanelClip = styled.div`
  min-height: 0;
  overflow: hidden;
`;

export const PanelContent = styled.div`
  padding: 22px 20px;
  border-top: 1px solid ${theme.colors.line};
  background: ${theme.colors.bluePale};
`;
