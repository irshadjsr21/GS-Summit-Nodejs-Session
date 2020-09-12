const User = require("../models/User");

module.exports = {
  getUsers: async (req, res) => {
    try {
      let { page = 1, itemsPerPage = 10 } = req.query;

      page = parseInt(page, 10);
      itemsPerPage = parseInt(itemsPerPage, 10);

      const users = await User.find({})
        .skip((page - 1) * itemsPerPage)
        .limit(itemsPerPage);
      const count = await User.countDocuments({});

      const lastPage = Math.ceil(count / itemsPerPage);
      res.json({
        data: users,
        page,
        itemsPerPage,
        lastPage,
        itemCount: count,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  addUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        res.status(400).json({ message: "Please enter your name." });
        return;
      }
      if (!email) {
        res.status(400).json({ message: "Please enter your email." });
        return;
      }
      if (!password) {
        res.status(400).json({ message: "Please enter your password." });
        return;
      }

      const user = await User.create({ name, email, password });
      res.status(201).json({ message: "User added successfully.", data: user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};
