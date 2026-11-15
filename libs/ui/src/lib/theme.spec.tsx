import styled from '@emotion/styled';
import { render } from '@testing-library/react';
import { theme } from './theme';

const Box = styled.div`
  color: ${theme.colors.ink};
`;

describe('emotion scaffold', () => {
  it('renders a styled component with theme tokens', () => {
    const { container } = render(<Box>hello</Box>);
    const element = container.firstElementChild as HTMLElement;

    expect(element.textContent).toBe('hello');
    expect(element.className).toMatch(/^css-/);
    const rules = Array.from(document.styleSheets).flatMap((sheet) =>
      Array.from(sheet.cssRules).map((rule) => rule.cssText)
    );
    expect(rules.join('\n')).toContain('color: var(--ink)');
  });
});
