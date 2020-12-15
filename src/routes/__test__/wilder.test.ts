import request from 'supertest';
import app from '../../app';

describe('Create a wilder', () => {
  it('returns a 201 and the created wilder', async () => {
    const name = 'test name';

    const response = await request(app)
      .post('/api/wilders')
      .send({
        name,
        city: 'New York',
      })
      .expect(201);
    expect(response.body.result.name).toEqual(name);
  });
  it('returns a 400 on a duplicate name', async () => {
    const name = 'test name';

    await request(app).post('/api/wilders').send({
      name,
      city: 'New York',
    });
    await request(app)
      .post('/api/wilders')
      .send({
        name,
        city: 'Los Angeles',
      })
      .expect(400);
  });
});
