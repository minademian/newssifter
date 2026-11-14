import { Trans, useTranslation } from 'react-i18next';
import { Footer } from './SiteFooter.styles';

export function SiteFooter() {
  const { t } = useTranslation();

  return (
    <Footer>
      <span>{t('site.footer-tagline')}</span>
      <span>
        <Trans
          i18nKey="site.footer-rights"
          components={{ company: <a href="https://ursinenterprises.com/" /> }}
        />
      </span>
    </Footer>
  );
}

export default SiteFooter;
