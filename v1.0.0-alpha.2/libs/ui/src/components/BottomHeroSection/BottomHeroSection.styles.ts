import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const StepsList = styled.ol`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 900px) {
    gap: 12px;
  }

  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
`;

export const Step = styled.li`
  min-height: 156px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.72);
  color: ${theme.colors.muted};
  font-size: 14px;
  line-height: 1.6;

  @media (max-width: 900px) {
    min-height: 132px;
  }

  @media (max-width: 520px) {
    min-height: auto;
    flex-direction: row;
    gap: 9px;
    padding: 12px;
    font-size: 13px;
  }
`;

export const StepNumber = styled.span`
  color: #1687d5;
  font-size: 29px;
  font-weight: 850;
  letter-spacing: -0.07em;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(23, 54, 79, 0.16);

  @media (max-width: 520px) {
    flex: 0 0 30px;
    font-size: 26px;
  }
`;
