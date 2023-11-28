import supertest from 'supertest';

const request = supertest('http://localhost:3333');

test('Deve escutar na porta 3333', async () => {
  // Acessar a url http://localhost:3001/
  const res = await request.get('/');
  expect(res.statusCode).toBe(200);
  // Verificar status 200
});
