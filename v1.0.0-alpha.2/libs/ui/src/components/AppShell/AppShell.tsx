import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Actions,
  Brand,
  BrandBanner,
  Container,
  Header,
  Shell,
} from './AppShell.styles';

export interface AppShellProps {
  /** Page-specific controls shown at the right of the header. */
  headerActions?: ReactNode;
  /** Optional footer, shown below the page content. */
  footer?: ReactNode;
  children: ReactNode;
}

export function AppShell({ headerActions, footer, children }: AppShellProps) {
  const { t } = useTranslation();

  return (
    <Shell>
      <Container>
        <Header>
          <Brand href="/" aria-label={t('site.home-label')}>
            <BrandBanner src="/banner.jpeg" alt="" />
          </Brand>
          <Actions>{headerActions}</Actions>
        </Header>

        {children}
        {footer}
      </Container>
    </Shell>
  );
}

export function AppBareShell({ children }: AppShellProps) {
  return (
    <Shell>
      <Container>
        {children}
      </Container>
    </Shell>
  );
}

export default AppShell;
