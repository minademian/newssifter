import request from 'supertest';
import nock from 'nock';
import app from '../app';
import allRows from './data.json';
import config from '../services/config';

let req = request(app);

describe('Google Spreadsheet routes', () => {
  it('/data route should return sheet data', async () => {
    nock(config.GoogleApiUrl.toString())
      .get('/spreadsheets.readonly')
      .reply(200, {
        allRows,
      });
    const response = await req.get('/api/data');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(allRows);
  });
});
