import { fireEvent, render, screen } from '@testing-library/react';
import { Trans } from 'react-i18next';
import '@newssifter/services/i18n.browser.service';
import { CopyButton } from '../components/CopyButton';
import { HeroLayout, LayoutToggle } from '../components/HeroLayout';
import { SampleUrlButton } from '../components/SampleUrlButton';
import { SourceNotice } from '../components/SourceNotice';
import { SourceNuance } from '../components/SourceNuance';
import { StepsVariant1 } from '../components/StepsVariant1';
import { TypeFilter } from '../components/TypeFilter';

describe('ui strings come from en_US.json', () => {
  beforeAll(() => {
    // jsdom does not implement scrollTo, which the chat card calls on render.
    HTMLElement.prototype.scrollTo = jest.fn();
  });

  it('translates the steps', () => {
    render(<StepsVariant1 />);

    expect(screen.getByText('Enter a source')).toBeTruthy();
    expect(screen.getByText('Get more context')).toBeTruthy();
  });

  it.each(['original', 'variant-1'] as const)(
    'keeps the %s steps in a collapsed accordion, with the credit note below it',
    (variant) => {
      render(<HeroLayout variant={variant} />);

      const trigger = screen.getByRole('button', {
        name: 'How does Newssifter work?',
      });
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(
        screen.queryByRole('region', { name: 'How does Newssifter work?' })
      ).toBeNull();
      // the credit note is not part of the panel, so it is visible while collapsed
      expect(screen.getByText("Inspired by Melissa Zimdar's")).toBeTruthy();

      fireEvent.click(trigger);

      const panel = screen.getByRole('region', {
        name: 'How does Newssifter work?',
      });
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
      expect(panel.textContent).toContain('Enter a news source or article.');
      expect(panel.textContent).not.toContain('Inspired by');
    }
  );

  it('translates the notices', () => {
    render(
      <>
        <SourceNotice type="fake" />
        <SourceNuance />
      </>
    );

    expect(screen.getByText('This was coded originally as fake news')).toBeTruthy();
    expect(screen.getByText('Add some nuance')).toBeTruthy();
    expect(screen.getByText(/Placeholder: additional context/)).toBeTruthy();
  });

  it('translates the layout toggle and the hero heading', () => {
    render(
      <>
        <LayoutToggle value="original" onChange={() => undefined} />
        <HeroLayout variant="variant-1" />
      </>
    );

    expect(screen.getByText('Original')).toBeTruthy();
    expect(screen.getByText('Variant 1')).toBeTruthy();
    expect(screen.getByText('More fair,')).toBeTruthy();
    expect(screen.getByText('less partisan factchecking.')).toBeTruthy();
    expect(screen.getByText('Check source')).toBeTruthy();
    expect(screen.getByText('READY')).toBeTruthy();
    expect(screen.getByText('NEWS SIFTER · NOW')).toBeTruthy();
    expect(
      screen.getByText('We only check the source URL against our database.')
    ).toBeTruthy();
  });

  it('renders the footer sentence with the company as a link', () => {
    render(
      <Trans
        i18nKey="site.footer-rights"
        components={{
          company: (
            <a href="https://ursinenterprises.com/">Ursine Enterprises</a>
          ),
        }}
      />
    );

    const link = screen.getByRole('link', { name: 'Ursine Enterprises' });
    expect(link.getAttribute('href')).toBe('https://ursinenterprises.com/');
    expect(document.body.textContent).toContain(
      '© 2026 Newssifter. All rights reserved by Ursine Enterprises.'
    );
  });

  it('translates the filter and button labels, with values filled in', () => {
    render(
      <>
        <TypeFilter
          label="Type"
          types={['fake']}
          value=""
          onChange={() => undefined}
        />
        <CopyButton text="dailywire.com" />
        <SampleUrlButton source="dailywire.com" />
      </>
    );

    expect(screen.getByText('all')).toBeTruthy();
    expect(screen.getByText('none')).toBeTruthy();
    expect(screen.getByLabelText('Copy dailywire.com')).toBeTruthy();
    expect(
      screen.getByLabelText(
        'Generate a sample URL for dailywire.com and copy it'
      )
    ).toBeTruthy();
  });
});
