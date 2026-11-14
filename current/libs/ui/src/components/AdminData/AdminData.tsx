import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MatchesTypeSpecification } from '@newssifter/specifications';
import { CopyButton } from '../CopyButton';
import { SampleUrlButton } from '../SampleUrlButton';
import { TypeFilter } from '../TypeFilter';
import {
  BackLink,
  Controls,
  Page,
  Search,
  Status,
  Table,
  TableWrap,
  Title,
  UrlActions,
  UrlCell,
} from './AdminData.styles';

type Source = {
  url: string;
  type1?: string;
  type2?: string;
};

type SourcesResponse = {
  total: number;
  types: string[];
  sources: Source[];
};

type LoadError =
  | { key: 'request-failed'; status: number }
  | { key: 'load-error' };

export function AdminData() {
  const { t } = useTranslation();
  const [data, setData] = useState<SourcesResponse | null>(null);
  const [error, setError] = useState<LoadError | null>(null);
  const [query, setQuery] = useState('');
  const [activeType1, setActiveType1] = useState('');
  const [activeType2, setActiveType2] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/sources', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          setError({ key: 'request-failed', status: response.status });
          return;
        }
        setData((await response.json()) as SourcesResponse);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError({ key: 'load-error' });
      });

    return () => controller.abort();
  }, []);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const matchesTypes = new MatchesTypeSpecification('type1', activeType1).and(
      new MatchesTypeSpecification('type2', activeType2)
    );
    return (data?.sources ?? []).filter(
      (source) =>
        matchesTypes.isSatisfiedBy(source) &&
        (!needle || source.url.toLowerCase().includes(needle))
    );
  }, [data, query, activeType1, activeType2]);

  const { types1, types2 } = useMemo(() => {
    const distinct = (pick: (source: Source) => string | undefined) =>
      Array.from(
        new Set((data?.sources ?? []).map(pick).filter(Boolean) as string[])
      ).sort();
    return {
      types1: distinct((source) => source.type1),
      types2: distinct((source) => source.type2),
    };
  }, [data]);

  return (
    <main className="app-shell">
      <div className="app-container">
        <header className="site-header">
          <a className="brand" href="/" aria-label={t('site.home-label')}>
            <img className="brand-banner" src="/banner.jpeg" alt="" />
          </a>
          <BackLink href="/">{t('admin.back')}</BackLink>
        </header>

        <Page>
          <Title>{t('admin.title')}</Title>

          {error && (
            <Status isError role="alert">
              {error.key === 'request-failed'
                ? t('admin.request-failed', { status: error.status })
                : t('admin.load-error')}
            </Status>
          )}
          {!data && !error && <Status>{t('admin.loading')}</Status>}

          {data && (
            <>
              <Controls>
                <label className="sr-only" htmlFor="admin-search">
                  {t('admin.search-label')}
                </label>
                <Search
                  id="admin-search"
                  type="search"
                  placeholder={t('admin.search-placeholder')}
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                />
                <TypeFilter
                  label={t('admin.columns.type')}
                  types={types1}
                  value={activeType1}
                  onChange={setActiveType1}
                />
                <TypeFilter
                  label={t('admin.columns.type2')}
                  types={types2}
                  value={activeType2}
                  onChange={setActiveType2}
                />
              </Controls>

              <Status aria-live="polite">
                {t('admin.count', { shown: visible.length, total: data.total })}
              </Status>

              <TableWrap>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col">{t('admin.columns.url')}</th>
                      <th scope="col">{t('admin.columns.type')}</th>
                      <th scope="col">{t('admin.columns.type2')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map((source, index) => (
                      <tr key={`${source.url}-${index}`}>
                        <td>
                          <UrlCell>
                            <span>{source.url}</span>
                            <UrlActions>
                              <CopyButton text={source.url} />
                              <SampleUrlButton source={source.url} />
                            </UrlActions>
                          </UrlCell>
                        </td>
                        <td>{source.type1}</td>
                        <td>{source.type2}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrap>
            </>
          )}
        </Page>
      </div>
    </main>
  );
}

export default AdminData;
