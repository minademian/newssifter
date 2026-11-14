import { useEffect, useMemo, useState } from 'react';
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

export function AdminData() {
  const [data, setData] = useState<SourcesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [activeType1, setActiveType1] = useState('');
  const [activeType2, setActiveType2] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/sources', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`The request failed with status ${response.status}.`);
        }
        return response.json() as Promise<SourcesResponse>;
      })
      .then(setData)
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(
          err instanceof Error ? err.message : 'Could not load sources.'
        );
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
          <a className="brand" href="/" aria-label="News Sifter home">
            <img className="brand-banner" src="/banner.jpeg" alt="" />
          </a>
          <BackLink href="/">Back to lookup</BackLink>
        </header>

        <Page>
          <Title>Source data</Title>

          {error && (
            <Status isError role="alert">
              {error}
            </Status>
          )}
          {!data && !error && <Status>Loading sources...</Status>}

          {data && (
            <>
              <Controls>
                <label className="sr-only" htmlFor="admin-search">
                  Search sources
                </label>
                <Search
                  id="admin-search"
                  type="search"
                  placeholder="Search by URL"
                  value={query}
                  onChange={(event) => setQuery(event.currentTarget.value)}
                />
                <TypeFilter
                  label="Type"
                  types={types1}
                  value={activeType1}
                  onChange={setActiveType1}
                />
                <TypeFilter
                  label="2nd type"
                  types={types2}
                  value={activeType2}
                  onChange={setActiveType2}
                />
              </Controls>

              <Status aria-live="polite">
                Showing {visible.length} of {data.total} sources
              </Status>

              <TableWrap>
                <Table>
                  <thead>
                    <tr>
                      <th scope="col">URL</th>
                      <th scope="col">Type</th>
                      <th scope="col">2nd type</th>
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
