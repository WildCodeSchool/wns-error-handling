import request from 'supertest';
import app from '../../app';

it('returns a 201 on successful wilder creation', async () => {
  const response = await request(app)
    .post('/api/wilders')
    .send({
      name: 'test name',
      city: 'New York',
    })
    .expect(201);
  expect(response.body).toHaveLength(1);
});
