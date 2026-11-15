import { act, fireEvent, render, screen } from '@testing-library/react';

import { Accordion } from './Accordion';

// jsdom's window is 768px tall; the accordion's rect is faked so layout can be tested.
const VIEWPORT = 768;

const fakeRect = (top: number, bottom: number) =>
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
    top,
    bottom,
    left: 0,
    right: 0,
    width: 0,
    height: bottom - top,
    x: 0,
    y: top,
    toJSON: () => undefined,
  });

const toggle = () =>
  fireEvent.click(screen.getByRole('button', { name: 'How does it work?' }));

const renderAccordion = (defaultOpen = false) =>
  render(
    <Accordion title="How does it work?" defaultOpen={defaultOpen}>
      <p>Panel content</p>
    </Accordion>
  );

const runAnimation = (ms = 300) =>
  act(() => {
    jest.advanceTimersByTime(ms);
  });

describe('Accordion keeps itself in view while opening', () => {
  let scrollBy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    scrollBy = jest
      .spyOn(window, 'scrollBy')
      .mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('scrolls down by exactly the part that is below the viewport', () => {
    fakeRect(400, 900);
    renderAccordion();

    toggle();
    runAnimation();

    // bottom 900 + 16px margin - 768px viewport = 148px
    expect(scrollBy).toHaveBeenCalledWith({
      top: 900 + 16 - VIEWPORT,
      behavior: 'instant',
    });
  });

  it('follows the animation over several frames, not in one jump', () => {
    fakeRect(400, 900);
    renderAccordion();

    toggle();
    runAnimation();

    expect(scrollBy.mock.calls.length).toBeGreaterThan(3);
  });

  it('does not scroll when the panel fits in the viewport', () => {
    fakeRect(200, 500);
    renderAccordion();

    toggle();
    runAnimation();

    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('stops short of pushing the toggle bar off the top of the screen', () => {
    fakeRect(100, 2000);
    renderAccordion();

    toggle();
    runAnimation();

    // only 100 - 16 = 84px of room above, however much is hidden below
    expect(scrollBy).toHaveBeenCalledWith({ top: 84, behavior: 'instant' });
    const biggest = Math.max(...scrollBy.mock.calls.map(([o]) => o.top));
    expect(biggest).toBe(84);
  });

  it('does not scroll at all once the toggle bar is at the top edge', () => {
    fakeRect(10, 2000);
    renderAccordion();

    toggle();
    runAnimation();

    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('does not scroll on first render, even when it starts open', () => {
    fakeRect(400, 900);
    renderAccordion(true);
    runAnimation();

    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('does not scroll when closing', () => {
    fakeRect(400, 900);
    renderAccordion(true);

    toggle();
    runAnimation();

    expect(scrollBy).not.toHaveBeenCalled();
  });

  it('stops following once the animation is over', () => {
    fakeRect(400, 900);
    renderAccordion();

    toggle();
    runAnimation(600);
    const callsAfterAnimation = scrollBy.mock.calls.length;
    runAnimation(600);

    expect(scrollBy.mock.calls.length).toBe(callsAfterAnimation);
  });
});
