import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const Note = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 13px;
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid ${theme.colors.line};

  @media (max-width: 900px) {
    margin-top: 18px;
  }

  @media (max-width: 520px) {
    margin-top: 22px;
  }
`;

export const Icon = styled.span`
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  color: #d87827;
  border: 1px solid #f3b77f;
  border-radius: 50%;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 13px;
  font-style: italic;
`;

export const Text = styled.p`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8px 12px;
  margin: 0;
  color: ${theme.colors.muted};
  font-size: 12px;
  line-height: 1.65;
  text-align: center;

  @media (max-width: 520px) {
    gap: 4px 8px;
  }
`;

export const Lead = styled.strong`
  color: ${theme.colors.inkSoft};
  font-size: 13px;
  font-weight: 700;
`;

export const SourceLink = styled.a`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 0;
  color: #1269a5;
  font-size: 13px;
  font-weight: 750;
  text-decoration: underline;
  text-decoration-color: ${theme.colors.orange};
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  transition: color 150ms ease, text-decoration-color 150ms ease;

  &:hover {
    color: #d87827;
    text-decoration-color: #d87827;
  }

  &:focus-visible {
    border-radius: 2px;
    outline: 2px solid ${theme.colors.blue};
    outline-offset: 3px;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;
