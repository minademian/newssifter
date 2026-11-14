import { Request, Response } from 'express';
import { HasTypeSpecification } from '@newssifter/specifications';
import { sourceRecords } from '../services/sources';

const hasType = new HasTypeSpecification();

const cleanType = (value?: string) => value?.trim().toLowerCase() || undefined;

const sources = sourceRecords.map((record) => ({
  url: record.url,
  type1: hasType.isSatisfiedBy(record) ? cleanType(record.type1) : undefined,
  type2: cleanType(record.type2),
}));

const types = Array.from(
  new Set(sources.flatMap((source) => [source.type1, source.type2]))
)
  .filter((type): type is string => Boolean(type))
  .sort();

export const Sources = async (_req: Request, res: Response) => {
  return res.status(200).json({ total: sources.length, types, sources });
};
