/* eslint-disable camelcase */
import db from '../../src/models';
import bcrypt from 'bcrypt';
import Helpers from '../../utils/Helpers';
import jwt from 'jsonwebtoken';
import { login_secret } from '../../src/config/settings';

class AuthService {
    
	static async signupUser(req) {
		try {
			// check if the user exists
			const userCheck = await db.User.findOne({
				where: {
					[db.Sequelize.Op.or]: [
						{username: req.body.username},
						{email: req.body.email}
					]
				}
			});

			if (!userCheck) {
				// Hash the password
				const saltRounds = 10;
				const userSalt = await bcrypt.genSalt(saltRounds);
				const passwordHash = await bcrypt.hash(req.body.password, userSalt);

				// Create user
				const userResult = await db.User.create({
					first_name: req.body.first_name,
					last_name: req.body.last_name,
					email: req.body.email,
					username: req.body.username,
					password: passwordHash,
					salt: userSalt
				});

				// If phone numbers exists create phone number
				if (req.body.phone_numbers.length > 0) {
					const phoneNumbers = req.body.phone_numbers;	
					phoneNumbers.map(phone => {
						return db.Phone.create({
							phone_number: phone.phone_number,
							user_id: userResult.id
						});
					});				
				}

				// If address exists create address
				if (req.body.addresses.length > 0) {
					const addresses = req.body.addresses;
					console.log(addresses);
					addresses.map(address => {
						return db.Address.create({
							province: address.province,
							district: address.district,
							street: address.street,
							building_number: address.building_number,
							flat: address.flat,
							apartment_number: address.apartment_number,
							user_id: userResult.id
						});
					});
					
				}

				return Helpers.setSuccessJson('User has registered successfully', userResult);
			}
			else if (userCheck.email === req.body.email) {
				return Helpers.setFailJson('User already exist with this email!');
			}
			else if (userCheck.username === req.body.username) {
				return Helpers.setFailJson('User already exist with this username!');
			}
			else {
				return Helpers.setFailJson('Something went wrong.');
			}
		}
		catch (error) {
			throw error;
		}
	}

	static async loginUser(req) {
		try {
			const userCheck = await db.User.findOne({
				where: {
					username: req.body.username
				},
				include: [
					{
						model: db.Phone,
						as: 'phone_numbers'
					},
					{
						model: db.Address,
						as: 'addresses'
					}
				]
			});

			if (!userCheck) {
				return Helpers.setFailJson('User does not found with this username!');
			}

			if (!bcrypt.compareSync(req.body.password, userCheck.password)) {
				return Helpers.setFailJson('Password does not match!');
			}
			
			// Create JWT token for user with user id
			let token = jwt.sign({ id: userCheck.id }, login_secret, {
				expiresIn: 86400 // 24 hours
			});

			const user = {
				id: userCheck.id,
				first_name: userCheck.first_name,
				last_name: userCheck.last_name,
				email: userCheck.email,
				phone_numbers: userCheck.phone_numbers.map(phone => {
					const { id, phone_number } = phone;
					return { id, phone_number };
				}),
				addresses: userCheck.addresses.map(address => {
					const { id, province, district, street, building_number, flat, apartment_number } = address;
					return { id, province, district, street, building_number, flat, apartment_number };
				}),
				token: token
			};

			return Helpers.setSuccessJson('Welcome ' + userCheck.username + '!', user);
			
		}
		catch (error) {
			throw error;
		}
	}

}

export default AuthService;