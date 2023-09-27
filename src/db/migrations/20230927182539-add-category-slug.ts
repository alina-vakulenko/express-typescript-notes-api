module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.addColumn("categories", "slug", {
      type: Sequelize.STRING,
      unique: true,
    });
  },
  down: async (queryInterface: any) => {
    await queryInterface.removeColumn("categories", "slug");
  },
};
