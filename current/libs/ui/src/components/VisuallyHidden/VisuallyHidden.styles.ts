import { css } from '@emotion/react';
import styled from '@emotion/styled';

// Hides content from the screen while keeping it available to screen readers.
export const visuallyHidden = css`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  clip-path: inset(50%);
`;

export const HiddenText = styled.span`
  ${visuallyHidden}
`;

export const HiddenLabel = styled.label`
  ${visuallyHidden}
`;
