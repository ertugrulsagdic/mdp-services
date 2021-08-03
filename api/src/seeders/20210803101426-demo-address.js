'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Addresses', [
      {
        province: 'Test Province',
        district: 'Test District',
        street: 'Test Street',
        building_number: 1,
        flat: 1,
        apartment_number: 1,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Addresses', null, {});
  }
};
