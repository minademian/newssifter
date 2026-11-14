import { Request, Response } from 'express';
import { getDomain } from 'tldts';
import { HasTypeSpecification } from '@newssifter/specifications';
import sourceData from '../assets/data_2.json';

type SourceRecord = {
  url: string;
  type1?: string;
  type2?: string;
};

const hasType = new HasTypeSpecification();

export const ExtractDomainName =(fullUrl: string) => getDomain(fullUrl);

const sourceRecords: SourceRecord[] = sourceData.filter(
  (record) => record.url.toLowerCase() !== 'url'
);

const getLookupDomain = (value: string): string | null => {
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(value.includes('://') ? value : `https://${value}`);
  } catch {
    return null;
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return null;
  }

  const domain = ExtractDomainName(parsedUrl.hostname) ?? parsedUrl.hostname;
  return domain.toLowerCase().replace(/^www\./, '');
};

export const Lookup = async (req: Request, res: Response) => {
  const { url } = req.query;

  if (typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({ error: 'A url query parameter is required' });
  }

  const value = url.trim();
  const domain = getLookupDomain(value);
  if (!domain) {
    return res.status(400).json({ error: 'The url query parameter is invalid' });
  }

  const record = sourceRecords.find(
    (source) => getLookupDomain(source.url) === domain
  );
  if (!record) {
    return res.status(404).json({ error: 'No source found', url: value });
  }

  return res.status(200).json({
    ...record,
    type1: hasType.isSatisfiedBy(record) ? record.type1?.trim() : undefined,
  });
};
