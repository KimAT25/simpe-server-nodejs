import * as user from '../user';

describe('', () => {
    it('create new user', async () => {
        const req = {
            body: {
                username: 'Tester',
                password: '12345'
            }
        };

        const res = {
            json({ token }) {
                console.log(token);
                expect(token).toBeTruthy();
            }
        }
        const userNew = await user.createNewUser(req, res, null)
    })
})

describe('user handler', () => {
    it('should pass test', () => {
        expect(1).toEqual(1);
    })
})