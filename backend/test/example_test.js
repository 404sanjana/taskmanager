// Minimal CI-safe tests: no DB needed
const request = require('supertest');
const app = require('../server'); // make sure server.js does: module.exports = app

describe('Smoke tests', function () {
  this.timeout(5000);

  it('GET /health -> 200 and { ok: true }', async () => {
    const res = await request(app).get('/health');
    if (res.status !== 200) throw new Error(`Expected 200, got ${res.status}`);
    if (!res.body || res.body.ok !== true) {
      throw new Error(`Expected { ok: true }, got ${JSON.stringify(res.body)}`);
    }
  });

  it('GET /__not_found__ -> 404 JSON', async () => {
    const res = await request(app).get('/__not_found__');
    if (res.status !== 404) throw new Error(`Expected 404, got ${res.status}`);
    if (!String(res.headers['content-type']).includes('application/json')) {
      throw new Error('Expected JSON content-type');
    }
  });
});