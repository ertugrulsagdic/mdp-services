/* eslint-disable no-undef */
import api from '..';
import chai, { request } from 'chai';
import chaiHttp from 'chai-http';

const privateRoute = '/private/v1/Private';
const authRoute = '/account/v1/Auth';

chai.use(chaiHttp);
chai.should();

const loginUser = async () => {
	return request(api)
		.post(authRoute + '/Login')
		.set('content-type', 'application/json').send({
			username: 'testuser',
			password: '123456789'
		});
};

describe('private', async () => {
    
	let token;

	before(async () => {
		let res = await loginUser();
		token = res.body.data.token;
	});
    
	it('Get address of the user using valid login token', (done) => {
		chai.request(api)
			.get(privateRoute + '/Address')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', token)
			.end((err, res) => {
				if (err) {
					done(err);
				}
				console.log(res.body);
				res.should.have.status(200);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message', 'data');
				res.body.should.have.property('status').equal(true);
				done();
			});
	});

	it('Get address of the user using invalid login token', (done) => {
		chai.request(api)
			.get(privateRoute + '/Address')
			.set('content-type', 'application/x-www-form-urlencoded')
			.set('Authorization', 'undefinded')
			.end((err, res) => {
				if (err) {
					done(err);
				}
				console.log(res.body);
				res.should.have.status(401);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message');
				res.body.should.have.property('status').equal(false);
				done();
			});
	});
});