const pool = require("../config/db");
const User = require("./User");

class Teacher extends User {
  constructor() {
    super();
    this.pool = pool;
  }
  async createTeacher(username, password, role_id, scheduleDate) {
    const teacher = await super.createUser(username, password, role_id);
    const query = "INSERT INTO teachers (scheduleDate, user_id) VALUES (?, ?)";

    // Ensure scheduleDate is NULL if empty
    const validScheduleDate = scheduleDate ? scheduleDate : null;
    const scheduleDays = Array.isArray(validScheduleDate)
      ? validScheduleDate.join(",")
      : validScheduleDate;

    const [result] = await this.pool.query(query, [scheduleDays, teacher.id]);
    return await this.getTeacherById(result.insertId);
  }
  async getTeacherById(id) {
    const query = "SELECT * FROM teachers WHERE id =?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async getTeacherByUserId(userId) {
    const query = "SELECT * FROM teachers WHERE user_id =?";
    const [rows] = await this.pool.query(query, [userId]);
    return rows[0];
  }
  async updateTeacher(id, scheduleDate) {
    const teacher = await this.getTeacherById(id);
    if (!teacher) throw new Error("Teacher not found");
    const scheduleDays = Array.isArray(scheduleDate)
      ? scheduleDate.join(",")
      : scheduleDate;
    const query = "UPDATE teachers SET scheduleDate =? WHERE id =?";
    await this.pool.query(query, [scheduleDays, id]);
    return await this.getTeacherById(id);
  }
  async deleteTeacher(id) {
    const teacher = await this.getTeacherById(id);
    const query = "DELETE FROM teachers WHERE id =?";
    await this.pool.query(query, [id]);
    await super.deleteUser(teacher.user_id);
    return { message: "Teacher deleted successfully" };
  }
  async getAllTeacher() {
    const query = "SELECT * FROM teachers ORDER BY id DESC";
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async searchTeacher(q) {
    const query = "SELECT * FROM teachers WHERE userFullName LIKE ?";
    const [rows] = await this.pool.query(query, [`%${q}%`]);
    return rows;
  }
  async sortTeachersBy(column, order) {
    const query = `SELECT * FROM teachers ORDER BY ${column} ${order}`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
}

module.exports = Teacher;
