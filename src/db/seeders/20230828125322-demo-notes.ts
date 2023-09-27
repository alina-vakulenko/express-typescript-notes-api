module.exports = {
  async up(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          id: "1",
          name: "Task",
          created_at: new Date(),
        },
        {
          id: "2",
          name: "Idea",
          created_at: new Date(),
        },
        {
          id: "3",
          name: "Random Thought",
          created_at: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "notes",
      [
        {
          id: "79405603-c167-4f0f-85ef-2b28b8fe8e09",
          name: "Idea 1",
          created_at: new Date(),
          category_id: 2,
          content: "This is Idea 1 content.",
          archived: true,
        },
        {
          id: "7c71def5-72e1-4b39-9b89-a78df079b7cc",
          name: "Random Thought 1",
          created_at: new Date(),
          category_id: 3,
          content: "This is Random Thought 1 content.",
          archived: false,
        },
        {
          id: "5684151e-2659-4ad0-9327-3959a9cc7134",
          name: "Task 2",
          created_at: new Date(),
          category_id: 1,
          content: "This is Task 2 content.",
          archived: false,
        },
        {
          id: "7e8dc43c-be78-4c80-aea7-65506511f59f",
          name: "Idea 2",
          created_at: new Date(),
          category_id: 2,
          content: "This is Idea 2 content.",
          archived: false,
        },
        {
          id: "8cbadc86-efed-4e01-93fe-1dc1b1cf6876",
          name: "Random Thought 2",
          created_at: new Date(),
          category_id: 3,
          content: "This is Random Thought 2 content.",
          archived: true,
        },
        {
          id: "d7cf5750-7943-4700-9e38-a9f4705d3f4b",
          name: "Task 3",
          created_at: new Date(),
          category_id: 1,
          content: "This is Task 3 content.",
          archived: false,
        },
        {
          id: "3759b977-3379-4fba-88be-bed3fe4fa0a2",
          name: "Idea 3",
          created_at: new Date(),
          category_id: 2,
          content: "This is Idea 3 content.",
          archived: false,
        },
      ],
      {}
    );
  },

  async down(queryInterface: any, Sequelize: any) {
    await queryInterface.bulkDelete("notes", null, {});
    await queryInterface.bulkDelete("categories", null, {});
  },
};
