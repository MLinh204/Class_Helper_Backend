const User = require("../models/User");
const RegistrationList = require("../models/RegistrationList");

const userController = {
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = new User();
      const userById = await user.getUserById(id);
      if (!userById) return res.status(404).json({ message: "User not found" });
      res.json(userById);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user", error });
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { username, role_id } = req.body;
      const user = new User();
      const updatedUser = await user.updateUser(id, username, role_id);
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = new User();
      const deletedUser = await user.deleteUser(id);
      if (!deletedUser.affectedRows)
        return res.status(404).json({ message: "User not found" });
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user", err });
    }
  },
  async updateUserRole(req, res) {
    try {
      const { id } = req.params;
      const { role_id } = req.body;
      const user = new User();
      const updatedUser = await user.updateUserRole(id, role_id);
      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "Error updating user role", err });
    }
  },
  async getUserByUsername(req, res) {
    try {
      const { username } = req.query;
      const user = new User();
      const userByUsername = await user.getUserByUsername(username);
      if (!userByUsername)
        return res.status(404).json({ message: "User not found" });
      res.json(userByUsername);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error retrieving user by username", err });
    }
  },
  async createUser(req, res) {
    try {
      const { username, password, role_id } = req.body;
      const user = new User();
      const registrationList = new RegistrationList();
      const isUserAllowed =
        await registrationList.isUserAllowedRegistration(username);
      if (!isUserAllowed) {
        return res
          .status(400)
          .json({ message: "Registration is not allowed for this user" });
      }
      const createdUser = await user.createUser(username, password, role_id);
      res.json(createdUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user", error });
    }
  },
  async getAllUsers(req, res) {
    try {
      const user = new User();
      const allUsers = await user.getAllUsers();
      res.json(allUsers);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving all users", error });
    }
  },
  async searchUser(req, res) {
    try {
      const { query } = req.query;
      const user = new User();
      const searchedUsers = await user.searchUser(query);
      res.json(searchedUsers);
    } catch (error) {
      res.status(500).json({ message: "Error searching users", error });
    }
  },
  async sortUsersBy(req, res) {
    try {
      const { column, order } = req.query;
      const user = new User();
      const sortedUsers = await user.sortUsersBy(column, order);
      res.json(sortedUsers);
    } catch (error) {
      res.status(500).json({ message: "Error sorting users", error });
    }
  },
};

module.exports = userController;
