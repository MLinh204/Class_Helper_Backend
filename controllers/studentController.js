const Student = require("../models/Student");
const User = require("../models/User");
const RegistrationList = require("../models/RegistrationList");

const studentController = {
  async createStudent(req, res) {
    try {
      const {
        userFullName,
        age,
        address,
        username,
        password,
        gender,
        nickname,
        isCreatedByTeacher,
      } = req.body;
      const student = new Student();
      const user = new User();
      const role_id = 2;
      const level = 1;
      const point = 0;
      const heart = 10;
      const registration = new RegistrationList();
      const inList = await registration.getRegistrationListByUsername(username);
      if (!inList)
        return res
          .status(400)
          .json({ message: "Registraion is not allowed for this user" });
      const existingUser = await user.getUserByUsername(username);
      if (existingUser)
        return res.status(400).json({
          message: "Registration not allowed: Username already exists",
        });
      const createdStudent = await student.createStudent(
        userFullName,
        age,
        address,
        gender,
        nickname,
        username,
        password,
        role_id,
        level,
        point,
        heart,
        isCreatedByTeacher
      );
      res.json(createdStudent);
    } catch (error) {
      res.status(500).json({ message: "Error creating student", error });
    }
  },
  async getStudentById(req, res) {
    try {
      const { id } = req.params;
      const student = new Student();
      const studentById = await student.getStudentById(id);
      if (!studentById)
        return res.status(404).json({ message: "Student not found" });
      res.json(studentById);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving student", error });
    }
  },
  async updateStudent(req, res) {
    try {
      const { id } = req.params;
      const { userFullName, age, address, nickname } = req.body;
      const student = new Student();
      const updatedStudent = await student.updateStudent(
        id,
        userFullName,
        age,
        address,
        nickname
      );
      if (!updatedStudent)
        return res.status(404).json({ message: "Student not found" });
      res.json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: "Error updating student", error });
    }
  },
  async deleteStudent(req, res) {
    try {
      const { id } = req.params;
      const student = new Student();
      await student.deleteStudent(id);
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting student", error });
    }
  },
  async getAllStudents(req, res) {
    try {
      const student = new Student();
      const students = await student.getAllStudents();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving students", error });
    }
  },
  async getStudentByUserId(req, res) {
    try {
      const { userId } = req.params;
      const student = new Student();
      const studentByUserId = await student.getStudentByUserId(userId);
      if (!studentByUserId)
        return res.status(404).json({ message: "Student not found" });
      res.json(studentByUserId);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving student by user id", error });
    }
  },
  async sortStudentsBy(req, res) {
    try {
      const { column, order } = req.query;
      const student = new Student();
      const sortedStudents = await student.sortStudentsBy(column, order);
      res.json(sortedStudents);
    } catch (error) {
      res.status(500).json({ message: "Error sorting students", error });
    }
  },
  async searchStudentsBy(req, res) {
    try {
      const { q } = req.query;
      const student = new Student();
      const searchedStudents = await student.searchStudentsBy(q);
      res.json(searchedStudents);
    } catch (error) {
      res.status(500).json({ message: "Error searching students", error });
    }
  },
  async addPoint(req, res) {
    try {
      const { id } = req.params;
      const { point } = req.body;
      const student = new Student();
      const existingUser = await student.getStudentById(id);
      if (!existingUser) {
        return res.status(404).json({ message: "Student not found" });
      }

      // Compute the cumulative points so far.
      // For example, if level = 3 and current point = 500, cumulative = (3-1)*2000 + 500 = 4500.
      const cumulativePoints =
        (existingUser.level - 1) * 2000 + existingUser.point;
      // New cumulative points after adding/subtracting the given point.
      const newCumulativePoints = cumulativePoints + point;

      // Prevent negative cumulative points (i.e. level cannot drop below 1)
      if (newCumulativePoints < 0) {
        return res
          .status(400)
          .json({ message: "Not enough points. Level cannot be less than 1" });
      }

      // Determine the new level and the remaining points within that level.
      // Each 2000 points corresponds to a level.
      const newLevel = Math.floor(newCumulativePoints / 2000) + 1;
      const newPoints = newCumulativePoints % 2000;

      let updatedStudent;

      // Check if there is a level change.
      if (newLevel > existingUser.level) {
        const levelIncrease = newLevel - existingUser.level;
        updatedStudent = await student.updateStudentPoint(
          id,
          newLevel,
          newPoints
        );
        return res.json({
          message: `Student increased ${levelIncrease} level(s)`,
          updatedStudent,
        });
      } else if (newLevel < existingUser.level) {
        const levelDecrease = existingUser.level - newLevel;
        updatedStudent = await student.updateStudentPoint(
          id,
          newLevel,
          newPoints
        );
        return res.json({
          message: `Student decreased ${levelDecrease} level(s)`,
          updatedStudent,
        });
      } else {
        // No level change; only update the points.
        updatedStudent = await student.updateStudentPoint(
          id,
          existingUser.level,
          newPoints
        );
        return res.json({
          message: "Student point updated successfully",
          updatedStudent,
        });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error adding point", error });
    }
  },
  async modifyHeart(req, res) {
    try {
      const { id } = req.params;
      const { heart } = req.body;
      const student = new Student();
      const existingUser = await student.getStudentById(id);
      if (!existingUser) {
        return res.status(404).json({ message: "Student not found" });
      }
      let newHeart = existingUser.heart + heart;
      if (newHeart < 0) {
        newHeart = 0;
      }
      if (newHeart > 10) {
        newHeart = 10;
      }
      const updatedStudent = await student.updateStudentHeart(id, newHeart);
      return res.json({
        message: "Student heart updated successfully",
        updatedStudent,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error updating heart", error });
    }
  },
  async modifyLevel(req, res) {
    try {
      const { id } = req.params;
      const { level } = req.body;
      const student = new Student();
      const existingUser = await student.getStudentById(id);
      if (!existingUser) {
        return res.status(404).json({ message: "Student not found" });
      }
      let newLevel = existingUser.level + level;
      if (newLevel < 1) {
        newLevel = 1;
      }
      const updatedStudent = await student.updateStudentLevel(id, newLevel);
      return res.json({
        message: "Student level updated successfully",
        updatedStudent,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error updating level", error });
    }
  },
};

module.exports = studentController;
