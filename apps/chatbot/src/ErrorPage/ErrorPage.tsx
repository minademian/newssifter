import { Trans, useTranslation } from 'react-i18next';
import { AppShell, BackLink } from '@newssifter/ui';
import { Body, Message, Title } from './ErrorPage.styles';

export function ErrorPage() {
  const { t } = useTranslation();

  return (
    <AppShell headerActions={<BackLink href="/">{t('error.home')}</BackLink>}>
      <Message>
        <Title>{t('error.title')}</Title>
        <Body>
          <Trans i18nKey="error.body" components={{ i: <i /> }} />
        </Body>
      </Message>
    </AppShell>
  );
}

export default ErrorPage;
