import { Router } from 'express';
import { IndexRoute } from './routes/index.route';
import { GoogleRoute } from './routes/google.route';
import { AuthRoute } from './routes/auth.route';
import { LookupRoute } from './routes/lookup.route';

export const routes = Router();

routes.use(IndexRoute);
routes.use(GoogleRoute);
routes.use(AuthRoute);
routes.use(LookupRoute);
