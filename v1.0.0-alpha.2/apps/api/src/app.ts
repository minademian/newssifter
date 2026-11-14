import express from 'express';
import bodyParser from 'body-parser';

import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import hpp from 'hpp';

import { routes } from './routes';
import config from './services/config';

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false,
  // TODO: refactor with a lib that's compatible with both limiter and express
});

app.use(
  bodyParser.json({
    limit: '8mb',
  })
);

app.use(hpp() as unknown as express.RequestHandler);
app.disable('x-powered-by');
app.use(helmet());
app.use(
  cors({
    credentials: true,
    origin: [config.appUrl],
  })
);
app.use(limiter);

app.use(`/${config.apiPrefix}`, routes);

export default app;
