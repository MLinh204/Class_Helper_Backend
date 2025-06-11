const RegistrationList = require("../models/RegistrationList");

const registrationListController = {
  async addRegistrationList(req, res) {
    try {
      const { username } = req.body;
      const registrationList = new RegistrationList();
      const existingUser =
        await registrationList.getRegistrationListByUsername(username);
      if (existingUser)
        return res.status(401).json({
          message:
            "Registration not allowed: Username already exists in registration list",
        });
      const newRegistrationList =
        await registrationList.addRegistrationList(username);
      res.status(200).json(newRegistrationList);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error adding registration list", error });
    }
  },
  async getRegistrationLists(req, res) {
    try {
      const registrationList = new RegistrationList();
      const registrationLists = await registrationList.getRegistrationLists();
      res.json(registrationLists);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving registration lists", error });
    }
  },
  async getRegistrationListById(req, res) {
    try {
      const { id } = req.params;
      const registrationList = new RegistrationList();
      const registrationListById =
        await registrationList.getRegistrationListById(id);
      if (!registrationListById)
        return res.status(404).json({ message: "Registration list not found" });
      res.json(registrationListById);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving registration list", error });
    }
  },
  async updateRegistrationList(req, res) {
    try {
      const { id } = req.params;
      const { username } = req.body;
      const registrationList = new RegistrationList();
      const existingRegistrationList =
        await registrationList.getRegistrationListByUsername(username);
      if (existingRegistrationList)
        return res.status(400).json({
          message:
            "Registration not allowed: Username already exists in registration list",
        });
      const updatedRegistrationList =
        await registrationList.updateRegistrationList(id, username);
      if (!updatedRegistrationList)
        return res.status(404).json({ message: "Registration list not found" });
      res.json(updatedRegistrationList);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating registration list", error });
    }
  },
  async deleteRegistrationList(req, res) {
    try {
      const { id } = req.params;
      const registrationList = new RegistrationList();
      await registrationList.deleteRegistrationList(id);
      res.json({ message: "Registration list deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting registration list", error });
    }
  },
  async getRegistrationListByUsername(req, res) {
    try {
      const { username } = req.params;
      const registrationList = new RegistrationList();
      const registrationListByName =
        await registrationList.getRegistrationListByUsername(username);
      if (!registrationListByName)
        return res.status(404).json({ message: "Registration list not found" });
      res.json(registrationListByName);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving registration list", error });
    }
  },
  async isUserAllowedRegistration(req, res) {
    try {
      const { username } = req.params;
      const registrationList = new RegistrationList();
      const isAllowed =
        await registrationList.isUserAllowedRegistration(username);
      res.json({ isAllowed });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error checking user registration", error });
    }
  },
  async searchRegistrationList(req, res) {
    try {
      const { query } = req.query;
      const registrationList = new RegistrationList();
      const results = await registrationList.searchRegistrationList(query);
      res.json(results);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error searching registration list", error });
    }
  },
  async sortRegistrationListsBy(req, res) {
    try {
      const { column, order } = req.query;
      const registrationList = new RegistrationList();
      const sortedLists = await registrationList.sortRegistrationListsBy(
        column,
        order
      );
      res.json(sortedLists);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error sorting registration lists", error });
    }
  },
};

module.exports = registrationListController;
