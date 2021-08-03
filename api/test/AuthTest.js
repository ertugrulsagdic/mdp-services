/* eslint-disable camelcase */
/* eslint-disable no-undef */
import api from '..';
import chai from 'chai';
import chaiHttp from 'chai-http';

const authRoute = '/account/v1/Auth';

chai.use(chaiHttp);
chai.should();

describe('auth', async () => {
	
	it('Signup new user', (done) => {
		chai.request(api)
			.post(authRoute + '/Signup')
			.set('content-type', 'application/json')
			.send(
				{
					first_name: 'Ertugrul',
					last_name: 'Sagdic',
					email: 'ertugrulsagdic98@gmail.com',
					username: 'ertugrulsagdic',
					password: '123456789',
					phone_numbers: [
					  {
							phone_number: '5394455645'
					  }
					],
					addresses: [
					  {
							province: 'Istanbul',
							district: 'Dumlupinar',
							street: 'Volkan',
							building_number: 24,
							flat: 1,
							apartment_number: 5
					  }
					]
				  }
			).end((err, res) => {
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

	it('Signup user already exists', (done) => {
		chai.request(api)
			.post(authRoute + '/Signup')
			.set('content-type', 'application/json')
			.send(
				{
					first_name: 'Test',
					last_name: 'User',
					email: 'testuser@test.com',
					username: 'testuser',
					password: '123456789',
					phone_numbers: [
					  {
							phone_number: '1234567890'
					  }
					],
					addresses: [
					  {
							province: 'Test Province',
							district: 'Test District',
							street: 'Test Street',
							building_number: 1,
							flat: 1,
							apartment_number: 1
					  }
					]
				  }
			).end((err, res) => {
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

	it('Log the user in with correct username and password', (done) => {
		chai.request(api).post(authRoute + '/Login').set('content-type', 'application/json').send({
			username: 'testuser',
			password: '123456789'
		}).end((err, res) => {
			if (err) {
				done(err);
			}
			res.should.have.status(200);
			res.should.be.a('object');
			res.body.should.have.keys('status', 'message', 'data');
			res.body.should.have.property('status').equal(true);
			res.body.should.have.property('data').that.includes.all.keys([
				'id',
				'first_name',
				'last_name',
				'email',
				'phone_numbers',
				'addresses',
				'token'
			]);
			done();
		});
	});

	it('Log the user in with correct email and password', (done) => {
		chai.request(api).post(authRoute + '/Login').set('content-type', 'application/json').send({
			email: 'testuser@test.com',
			password: '123456789'
		}).end((err, res) => {
			if (err) {
				done(err);
			}
			res.should.have.status(200);
			res.should.be.a('object');
			res.body.should.have.keys('status', 'message', 'data');
			res.body.should.have.property('status').equal(true);
			res.body.should.have.property('data').that.includes.all.keys([
				'id',
				'first_name',
				'last_name',
				'email',
				'phone_numbers',
				'addresses',
				'token'
			]);
			done();
		});
	});

	it('Log the user in with correct email but incorrect password', (done) => {
		chai.request(api).post(authRoute + '/Login').set('content-type', 'application/json').send({
			username: 'testuser@test.com',
			password: '111111111'
		}).end((err, res) => {
			if (err) {
				done(err);
			}
			res.should.have.status(400);
			res.should.be.a('object');
			res.body.should.have.keys('status', 'message');
			res.body.should.have.property('status').equal(false);
			done();
		});
	});
});