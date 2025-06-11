const Role = require("../models/Role");

const roleController = {
  async getRoles(req, res) {
    try {
      const role = new Role();
      const roles = await role.getRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving roles", error });
    }
  },
  async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = new Role();
      const roleById = await role.getRoleById(id);
      if (!roleById) return res.status(404).json({ message: "Role not found" });
      res.json(roleById);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving role", error });
    }
  },
  async getRoleByName(req, res) {
    try {
      const { name } = req.params;
      const role = new Role();
      const roleByName = await role.getRoleByName(name);
      if (!roleByName)
        return res.status(404).json({ message: "Role not found" });
      res.json(roleByName);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving role", error });
    }
  },
};

module.exports = roleController;
