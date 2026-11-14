import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

const typing = keyframes`
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  30% {
    transform: translateY(-3px);
    opacity: 1;
  }
`;

const readyPulse = keyframes`
  0%,
  100% {
    box-shadow: 0 0 0 3px rgba(52, 166, 255, 0.15);
    opacity: 1;
  }
  50% {
    box-shadow: 0 0 0 6px rgba(52, 166, 255, 0.04);
    opacity: 0.75;
  }
`;

type Sender = 'user' | 'assistant';

export const Card = styled.section`
  width: 100%;
  max-width: ${theme.layout.columnWidth};
  overflow: hidden;
  border: 1px solid ${theme.colors.line};
  border-radius: 24px;
  background: ${theme.colors.surface};
  box-shadow: 0 28px 75px rgba(28, 73, 108, 0.1),
    0 3px 12px rgba(28, 73, 108, 0.04);

  &::before {
    height: 4px;
    display: block;
    content: '';
    background: linear-gradient(
      90deg,
      ${theme.colors.blue} 0 76%,
      ${theme.colors.orange} 76% 100%
    );
  }

  @media (max-width: 900px) {
    max-width: ${theme.layout.columnWidthTablet};
  }

  @media (max-width: 520px) {
    border-radius: 19px;
  }
`;

export const Header = styled.header`
  min-height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 17px 24px;
  border-bottom: 1px solid ${theme.colors.line};

  @media (max-width: 520px) {
    min-height: 72px;
    padding: 14px 16px;
  }
`;

export const Identity = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Title = styled.span`
  display: block;
  color: ${theme.colors.ink};
  font-size: 14px;
  font-weight: 750;
  letter-spacing: -0.02em;
`;

export const Ready = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: ${theme.colors.muted};
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.12em;

  @media (max-width: 520px) {
    font-size: 8px;
  }
`;

export const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  display: inline-block;
  flex: 0 0 auto;
  border-radius: 50%;
  background: ${theme.colors.blue};
  box-shadow: 0 0 0 3px rgba(52, 166, 255, 0.15);
  animation: ${readyPulse} 1.8s ease-in-out infinite;
`;

export const Conversation = styled.div`
  min-height: 335px;
  max-height: 420px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  overflow-y: auto;
  padding: 26px 24px;
  background: radial-gradient(
      ellipse at 100% 0%,
      rgba(52, 166, 255, 0.08),
      transparent 55%
    ),
    #fafdff;

  @media (max-width: 520px) {
    min-height: 300px;
    max-height: 380px;
    gap: 18px;
    padding: 21px 15px;
  }
`;

export const Entry = styled.div<{ sender?: Sender }>`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  justify-content: ${({ sender }) =>
    sender === 'user' ? 'flex-end' : 'flex-start'};
`;

export const EntryContent = styled.div<{ sender?: Sender }>`
  max-width: min(82%, 390px);
  display: flex;
  flex-direction: column;
  align-items: ${({ sender }) =>
    sender === 'user' ? 'flex-end' : 'flex-start'};
  gap: 6px;
`;

export const Speaker = styled.span`
  color: ${theme.colors.mutedLight};
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.1em;
`;

export const Bubble = styled.div<{ sender?: Sender; isError?: boolean }>`
  padding: 12px 15px;
  border-radius: ${({ sender }) =>
    sender === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px'};
  color: ${({ sender, isError }) =>
    isError
      ? '#8e3b32'
      : sender === 'user'
      ? theme.colors.ink
      : theme.colors.inkSoft};
  background: ${({ sender, isError }) =>
    isError ? '#fff0ed' : sender === 'user' ? '#d9efff' : '#eaf6ff'};
  font-size: 13px;
  line-height: 1.6;
  overflow-wrap: anywhere;

  p {
    margin: 0;
  }
`;

export const Hint = styled.p`
  margin-top: 7px !important;
  color: ${theme.colors.muted};
  font-size: 11px;
`;

export const TypeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 8px;
  margin-top: 8px;
`;

export const TypeLabel = styled.span`
  color: ${theme.colors.muted};
  font-size: 12px;
`;

export const TypePill = styled.span`
  display: block;
  width: fit-content;
  padding: 2px 10px;
  border: 1px solid ${theme.colors.blueLight};
  border-radius: 999px;
  color: ${theme.colors.ink};
  background: ${theme.colors.surface};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const TypingBubble = styled(Bubble)`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 54px;
  padding: 15px;
`;

export const Dot = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: ${theme.colors.blue};
  animation: ${typing} 1.1s infinite ease-in-out;

  &:nth-of-type(2) {
    animation-delay: 0.15s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.3s;
  }
`;

export const Composer = styled.form`
  padding: 18px 22px 16px;
  border-top: 1px solid ${theme.colors.line};
  background: ${theme.colors.surface};

  @media (max-width: 520px) {
    padding: 14px 13px 13px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  gap: 8px;
  padding: 5px;
  border: 1px solid ${theme.colors.line};
  border-radius: 14px;
  background: #fbfdff;
  transition: border-color 160ms ease, box-shadow 160ms ease;

  &:focus-within {
    border-color: ${theme.colors.blue};
    box-shadow: 0 0 0 3px rgba(52, 166, 255, 0.16);
  }

  input {
    width: 0;
    min-width: 0;
    flex: 1;
    padding: 0 10px;
    color: ${theme.colors.ink};
    border: 0;
    outline: 0;
    background: transparent;
    font-size: 13px;
  }

  input::placeholder {
    color: ${theme.colors.mutedLight};
  }

  @media (max-width: 520px) {
    gap: 4px;

    input {
      padding-left: 7px;
      font-size: 12px;
    }
  }
`;

export const Submit = styled.button`
  min-height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 0 15px;
  color: ${theme.colors.ink};
  border: 0;
  border-radius: 10px;
  background: ${theme.colors.orange};
  cursor: pointer;
  font-size: 12px;
  font-weight: 750;
  white-space: nowrap;
  transition: background 160ms ease, transform 160ms ease;

  &:hover:not(:disabled) {
    background: #f6a253;
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid rgba(52, 166, 255, 0.38);
    outline-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.58;
  }

  svg {
    width: 16px;
    height: 16px;
  }

  @media (max-width: 520px) {
    gap: 5px;
    padding: 0 10px;
    font-size: 11px;
  }
`;
