import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Dock = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: auto;

  /* Beat the card's own radius, including the narrow-screen override. */
  && section {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

export const Welcome = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
  pointer-events: none;
`;

export const WelcomeHeading = styled.h1`
  margin: 0;
  max-width: 12em;
  color: var(--ink);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(36px, 4vw, 50px);
  font-weight: 500;
  letter-spacing: -0.065em;
  line-height: 0.99;
  text-align: center;
  text-wrap: balance;
`;

export const Rise = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
`;
