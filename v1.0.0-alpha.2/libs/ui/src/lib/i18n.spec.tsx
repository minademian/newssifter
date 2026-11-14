import { render, screen } from '@testing-library/react';
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

  it('translates the steps and the info note', () => {
    render(<StepsVariant1 />);

    expect(screen.getByText('Enter a source')).toBeTruthy();
    expect(screen.getByText('Get more context')).toBeTruthy();
    expect(screen.getByText("Inspired by Melissa Zimdar's")).toBeTruthy();
  });

  it('translates the notices', () => {
    render(
      <>
        <SourceNotice type="fake" />
        <SourceNuance />
      </>
    );

    expect(screen.getByText('This is fake news')).toBeTruthy();
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
        components={{ company: <a href="https://ursine.enterprises/" /> }}
      />
    );

    const link = screen.getByRole('link', { name: 'Ursine Enterprises' });
    expect(link.getAttribute('href')).toBe('https://ursine.enterprises/');
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
