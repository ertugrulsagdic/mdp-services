'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const saltRounds = 10;
    const userSalt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash('123456789', userSalt);
    return queryInterface.bulkInsert('Users', [
      {
        first_name: 'Test',
        last_name: 'User',
        email: 'testuser@test.com',
        username: 'testuser',
        salt: userSalt,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};