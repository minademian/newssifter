import { useTranslation } from 'react-i18next';
import { AdminData, AppShell, BackLink } from '@newssifter/ui';

export function AdminDataPage() {
  const { t } = useTranslation();

  return (
    <AppShell headerActions={<BackLink href="/">{t('admin.back')}</BackLink>}>
      <AdminData />
    </AppShell>
  );
}

export default AdminDataPage;
