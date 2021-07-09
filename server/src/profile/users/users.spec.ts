import * as request from 'supertest';
const app = 'http://localhost:8080';
describe('User create 테스트', () => {
  beforeEach(async () => {
    await request(app).delete('/users').send({ email: 'sayi' });
    await request(app).delete('/users').send({ email: 'taekkim' });
  });

  it('email 중복 확인', async () => {
    await request(app)
      .post('/users')
      .send({
        intra_id: 'string',
        nickname: 'string',
        auth_token: 'string',
        icon_path: 'string',
      })
      .expect(201);

    const res = await request(app)
      .post('/users')
      .send({
        email: 'test1@example.com',
        username: 'abcd',
        password: '12345',
      })
      .expect(400);
    expect(res.body.error).toBe('Email is already exist');
  });

  it('username 중복 확인', async () => {
    await request(app)
      .post('/users')
      .send({
        email: 'test2@example.com',
        username: 'testuser',
        password: '12345',
      })
      .expect(201);

    const res = await request(app)
      .post('/users')
      .send({
        email: 'test1@example.com',
        username: 'testuser',
        password: '12345',
      })
      .expect(400);
    expect(res.body.error).toBe('UserName is already exist');
  });
});
