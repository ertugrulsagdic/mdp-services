/* eslint-disable camelcase */
/* eslint-disable no-undef */
import api from '..';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import { forgot_password_secret } from '../src/config/settings';

const passwordRoute = '/account/v1/Password';

chai.use(chaiHttp);
chai.should();

describe('password', async () => {

	it('Send forgot password mail with correct email', (done) => {
		chai.request(api)
			.post(passwordRoute + '/Forgot')
			.set('content-type', 'application/json')
			.send({
				email: 'testuser@test.com'
			}).end((err, res) => {
				if (err) {
					done(err);
				}
				res.should.have.a.status(200);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message', 'data');
				res.body.should.have.property('status').equal(true);
				done();
			});
	});

	it('Send forgot password mail with incorrect email', (done) => {
		chai.request(api)
			.post(passwordRoute + '/Forgot')
			.set('content-type', 'application/json')
			.send({
				email: 'test@test.com'
			}).end((err, res) => {
				if (err) {
					done(err);
				}
				res.should.have.a.status(200);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message');
				res.body.should.have.property('status').equal(false);
				done();
			});
	});

	it('Reset password of the user with valid token', (done) => {
        	// Create JWT token for user with user id
		let token = jwt.sign({ id: 1 }, forgot_password_secret, {
			expiresIn: 3600 // 1 hour
		});
		chai.request(api)
			.post(passwordRoute + '/Reset/' + token)
			.set('content-type', 'application/json')
			.send({
				password: '987654321'
			}).end((err, res) => {
				if (err) {
					done(err);
				}
				res.should.have.a.status(200);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message');
				res.body.should.have.property('status').equal(true);
				done();
			});
	});

	it('Reset password of the user with invalid token', (done) => {
		chai.request(api)
			.post(passwordRoute + '/Reset/hkjhkhk')
			.set('content-type', 'application/json')
			.send({
				password: '987654321'
			}).end((err, res) => {
				if (err) {
					done(err);
				}
				res.should.have.a.status(400);
				res.should.be.a('object');
				res.body.should.have.keys('status', 'message');
				res.body.should.have.property('status').equal(false);
				done();
			});
	});
});