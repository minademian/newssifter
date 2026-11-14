import sourceData from '../assets/data_2.json';

export type SourceRecord = {
  url: string;
  type1?: string;
  type2?: string;
};

// The first row of the data file is the spreadsheet header, not a source.
export const sourceRecords: SourceRecord[] = sourceData.filter(
  (record) => record.url.toLowerCase() !== 'url'
);
