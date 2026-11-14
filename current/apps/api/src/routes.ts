import { Router } from 'express';
import { IndexRoute } from './routes/index.route';
import { LookupRoute } from './routes/lookup.route';
import { SourcesRoute } from './routes/sources.route';

export const routes = Router();

routes.use(IndexRoute);
routes.use(LookupRoute);
routes.use(SourcesRoute);
