module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable("Categories", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("Notes", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      archived: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  down: async (queryInterface: any) => {
    await queryInterface.dropTable("Notes");
    await queryInterface.dropTable("Categories");
  },
};
