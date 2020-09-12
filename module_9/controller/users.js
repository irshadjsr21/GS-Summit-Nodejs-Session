const userList = ["John", "Ray", "Paul", "Abhishek"];

module.exports = {
  getUsers: (req, res) => {
    res.json({
      data: userList,
    });
  },

  addUser: (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: "Please enter your name." });
      return;
    }

    userList.push(name);
    res.status(201).send({ message: "User added successfully." });
  },
};
