import app from '../server';
import supertest from 'supertest';

describe('GET /', () => {
    it('should return msg: \'Hello Express\'', async () => {
        const result = await supertest(app)
        .get('/');

        expect(result.body.message).toBe('Hello Express');
    })
})