import express from 'express';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { z } from 'zod';

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL ?? 'info' });

app.use(
  pinoHttp({
    logger,
    serializers: {
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url?.split('?')[0],
      }),
    },
  })
);

const normalizeHostname = (hostname: string): string =>
  hostname.toLowerCase().replace(/^www\./, '');

const questionableSources = new Set(
  readFileSync(join(__dirname, '../list.csv'), 'utf8')
    .split(/\r?\n/)
    .slice(1)
    .map((source) => normalizeHostname(source.trim()))
    .filter(Boolean)
);

const urlParameterSchema = z
  .string({
    required_error: 'A url query parameter is required',
    invalid_type_error: 'The url query parameter must be a string',
  })
  .trim()
  .min(1, 'A url query parameter is required')
  .transform((value, context) => {
    let parsedUrl: URL;

    try {
      parsedUrl = new URL(value.includes('://') ? value : `http://${value}`);
    } catch {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'The url query parameter is invalid',
      });
      return z.NEVER;
    }

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Only HTTP and HTTPS URLs are supported',
      });
      return z.NEVER;
    }

    return { value, parsedUrl };
  });

export const findQuerySchema = z.object({
  url: urlParameterSchema,
});

app.get('/find', (req, res) => {
  const parsedQuery = findQuerySchema.safeParse(req.query);

  if (!parsedQuery.success) {
    req.log.warn(
      {
        issues: parsedQuery.error.issues.map(({ code, path }) => ({ code, path })),
      },
      'Invalid /find query parameters'
    );
    return res.status(400).json({
      error: parsedQuery.error.issues[0]?.message ?? 'Invalid query parameters',
    });
  }

  const { value, parsedUrl } = parsedQuery.data.url;
  const hostname = normalizeHostname(parsedUrl.hostname);
  const questionable = questionableSources.has(hostname);

  req.log.info(
    { sourceHostname: hostname, questionable },
    'Completed news source lookup'
  );

  return res.json({
    url: value,
    questionable,
  });
});

if (require.main === module) {
  const port = Number(process.env.PORT || 3567);
  const server = app.listen(port, () => {
    logger.info({ port }, 'Server listening');
  });

  server.on('error', (error: Error) => {
    logger.error({ err: error, port }, 'Server failed to start');
    process.exitCode = 1;
  });
}

export default app;
