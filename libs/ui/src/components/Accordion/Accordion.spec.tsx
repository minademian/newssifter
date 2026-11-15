import { fireEvent, render, screen } from '@testing-library/react';

import { Accordion } from './Accordion';

const panelOf = (text: string) =>
  screen.getByText(text).closest('[role="region"]') as HTMLElement;

describe('Accordion', () => {
  it('starts collapsed, with the panel hidden from the page', () => {
    render(
      <Accordion title="How does it work?">
        <p>Panel content</p>
      </Accordion>
    );

    const trigger = screen.getByRole('button', { name: 'How does it work?' });
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(getComputedStyle(panelOf('Panel content')).visibility).toBe(
      'hidden'
    );
    expect(
      screen.queryByRole('region', { name: 'How does it work?' })
    ).toBeNull();
  });

  it('slides the panel open when toggled and closes it again', () => {
    render(
      <Accordion title="How does it work?">
        <p>Panel content</p>
      </Accordion>
    );
    const trigger = screen.getByRole('button', { name: 'How does it work?' });
    const panel = panelOf('Panel content');

    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('true');
    expect(getComputedStyle(panel).visibility).toBe('visible');
    expect(getComputedStyle(panel).gridTemplateRows).toBe('1fr');
    expect(screen.getByRole('region', { name: 'How does it work?' })).toBe(
      panel
    );

    fireEvent.click(trigger);
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    expect(getComputedStyle(panel).gridTemplateRows).toBe('0fr');
  });

  it('animates the row height rather than switching the panel on and off', () => {
    render(
      <Accordion title="How does it work?">
        <p>Panel content</p>
      </Accordion>
    );

    const transition = getComputedStyle(panelOf('Panel content')).transition;
    expect(transition).toContain('grid-template-rows');
    expect(transition).toContain('250ms');
  });

  it('can start open', () => {
    render(
      <Accordion title="Open by default" defaultOpen>
        <p>Panel content</p>
      </Accordion>
    );

    expect(
      screen
        .getByRole('button', { name: 'Open by default' })
        .getAttribute('aria-expanded')
    ).toBe('true');
    expect(getComputedStyle(panelOf('Panel content')).visibility).toBe(
      'visible'
    );
  });
});
