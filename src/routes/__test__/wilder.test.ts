import request from 'supertest';
import app from '../../app';

it('returns a 201 on successful wilder creation', async () => {
  return request(app)
    .post('/api/wilders')
    .send({
      name: 'test name',
      city: 'New York',
    })
    .expect(201);
});
