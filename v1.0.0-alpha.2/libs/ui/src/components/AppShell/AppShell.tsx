import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Actions,
  Brand,
  BrandBanner,
  Container,
  Header,
  Nav,
  NavLink,
  Shell,
} from './AppShell.styles';

export interface AppShellProps {
  headerActions?: ReactNode;
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
          <Nav>
            <NavLink href="/chat">{t('site.chat-now')}</NavLink>
            <NavLink href="/contact">{t('site.contact')}</NavLink>
          </Nav>
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
