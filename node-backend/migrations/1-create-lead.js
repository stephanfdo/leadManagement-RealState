module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('Leads', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        type: Sequelize.STRING,
        name: Sequelize.STRING,
        location: Sequelize.STRING,
        price: Sequelize.FLOAT,
        budget: Sequelize.FLOAT,
        propertyType: Sequelize.STRING,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
      });
    },
    down: async (queryInterface) => {
      await queryInterface.dropTable('Leads');
    }
  };