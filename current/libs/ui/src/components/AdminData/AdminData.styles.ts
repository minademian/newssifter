import styled from '@emotion/styled';
import { theme } from '../../lib/theme';

export const Page = styled.section`
  flex: 1;
  padding: 40px 0 64px;
  color: ${theme.colors.ink};
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 800;
`;

export const Controls = styled.div`
  display: grid;
  gap: 12px;
  margin-top: 20px;
`;

export const Search = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${theme.colors.line};
  border-radius: 10px;
  color: ${theme.colors.ink};
  background: ${theme.colors.surface};
  font-size: 14px;

  &:focus-visible {
    outline: 2px solid ${theme.colors.blue};
    outline-offset: 2px;
  }
`;

export const Status = styled.p<{ isError?: boolean }>`
  margin: 14px 0 8px;
  color: ${({ isError }) => (isError ? '#8e3b32' : theme.colors.muted)};
  font-size: ${({ isError }) => (isError ? '13px' : '12px')};
`;

export const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid ${theme.colors.line};
  border-radius: 10px;
  background: ${theme.colors.surface};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  th,
  td {
    padding: 8px 14px;
    border-bottom: 1px solid ${theme.colors.line};
    text-align: left;
  }

  th {
    position: sticky;
    top: 0;
    color: ${theme.colors.inkSoft};
    background: ${theme.colors.bluePale};
    font-size: 11px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`;

export const UrlCell = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

export const UrlActions = styled.span`
  display: inline-flex;
  flex: 0 0 auto;
  gap: 6px;
`;
