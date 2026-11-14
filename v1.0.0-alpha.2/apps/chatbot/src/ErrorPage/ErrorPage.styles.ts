import styled from '@emotion/styled';

export const Message = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px 0;
  text-align: center;
`;

export const Title = styled.h1`
  margin: 0;
  max-width: 16em;
  color: var(--ink);
  font-family: Georgia, 'Times New Roman', serif;
  font-size: clamp(36px, 4vw, 50px);
  font-weight: 500;
  letter-spacing: -0.065em;
  line-height: 0.99;
`;

export const Body = styled.p`
  margin: 0;
  max-width: 36em;
  color: var(--ink-soft);
  font-size: 15px;
  line-height: 1.5;

  i {
    font-style: italic;
  }
`;
