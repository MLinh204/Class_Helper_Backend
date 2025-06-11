const Teacher = require("../models/Teacher");
const RegistrationList = require("../models/RegistrationList");

const teacherController = {
  async getTeacherById(req, res) {
    try {
      const { id } = req.params;
      const teacher = new Teacher();
      const teacherById = await teacher.getTeacherById(id);
      if (!teacherById)
        return res.status(404).json({ message: "Teacher not found" });
      res.json(teacherById);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving teacher", error });
    }
  },
  async updateTeacher(req, res) {
    try {
      const { id } = req.params;
      const { scheduleDate } = req.body;
      const teacher = new Teacher();
      const updatedTeacher = await teacher.updateTeacher(id, scheduleDate);
      if (!updatedTeacher)
        return res.status(404).json({ message: "Teacher not found" });
      res.json(updatedTeacher);
    } catch (error) {
      res.status(500).json({ message: "Error updating teacher", error });
    }
  },
  async deleteTeacher(req, res) {
    try {
      const { id } = req.params;
      const teacher = new Teacher();
      await teacher.deleteTeacher(id);
      res.json({ message: "Teacher deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting teacher", error });
    }
  },
  async getAllTeachers(req, res) {
    try {
      const teacher = new Teacher();
      const allTeachers = await teacher.getAllTeacher();
      res.json(allTeachers);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving all teachers", error });
    }
  },
  async getTeacherByCurrentUser(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ message: "Unauthorized" });
      const teacher = new Teacher();
      const teacherByUserId = await teacher.getTeacherByUserId(userId);
      if (!teacherByUserId)
        return res.status(404).json({ message: "Teacher not found" });
      res.json(teacherByUserId);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving teacher by user ID", error });
    }
  },
  async createTeacher(req, res) {
    try {
      const { username, password, scheduleDate } = req.body;
      const role_id = 1;
      const teacher = new Teacher();
      const existingUser = await teacher.getUserByUsername(username);
      if (existingUser)
        return res.status(400).json({
          message: "Registration not allowed: Username already exists",
        });
      const registrationList = new RegistrationList();
      const isUserAllowed =
        await registrationList.isUserAllowedRegistration(username);
      if (!isUserAllowed) {
        return res
          .status(400)
          .json({ message: "Registration is not allowed for this user" });
      }
      const createdTeacher = await teacher.createTeacher(
        username,
        password,
        role_id,
        scheduleDate
      );
      res.json(createdTeacher);
    } catch (error) {
      res.status(500).json({ message: "Error creating teacher", error });
    }
  },
  async searchTeacher(req, res) {
    try {
      const { query } = req.query;
      const teacher = new Teacher();
      const searchResults = await teacher.searchTeacher(query);
      res.json(searchResults);
    } catch (error) {
      res.status(500).json({ message: "Error searching for teacher", error });
    }
  },
  async sortTeacherBy(req, res) {
    try {
      const { column, order } = req.query;
      const teacher = new Teacher();
      const results = await teacher.sortTeachersBy(column, order);
      res.json(results);
    } catch (error) {
      res.status(500).json({ message: "Error sorting teachers", error });
    }
  },
};

module.exports = teacherController;
