import { Router } from 'express';
import { Sources } from '../controllers/sources.controller';

export const SourcesRoute = Router();

SourcesRoute.get('/sources', Sources);
