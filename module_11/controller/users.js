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
      const userToReturn = user.toJSON();
      delete userToReturn.password;
      res
        .status(201)
        .json({ message: "User added successfully.", data: userToReturn });
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ message: "This email already exists." });
        return;
      }
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        res.status(401).json({ message: "This email does not exist." });
        return;
      }

      const isMatch = await user.verifyPassword(password);

      if (isMatch) {
        res.json({ message: "Correct password" });
      } else {
        res.status(401).json({ message: "Incorrect password" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  },
};
