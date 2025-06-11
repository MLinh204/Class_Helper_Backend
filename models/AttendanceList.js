const pool = require("../config/db");

class AttendanceList {
  constructor() {
    this.pool = pool;
  }
  async createAttendanceList(title, teacherId, status, createdAt) {
    const query =
      "INSERT INTO attendance_lists (title, teacher_id, status, created_at) VALUES (?, ?, ?, ?)";
    const [result] = await this.pool.query(query, [
      title,
      teacherId,
      status,
      createdAt,
    ]);
    return await this.getAttendanceListById(result.insertId);
  }
  async getAttendanceListsByTeacherId(teacherId) {
    const query = "SELECT * FROM attendance_lists WHERE teacher_id =?";
    const [rows] = await this.pool.query(query, [teacherId]);
    return rows;
  }
  async getAttendanceListById(id) {
    const query = "SELECT * FROM attendance_lists WHERE id =?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async getAttendanceLists() {
    const query = "SELECT * FROM attendance_lists ORDER BY id DESC";
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async updateAttendanceList(id, title, status) {
    const query = "UPDATE attendance_lists SET title =?, status =? WHERE id =?";
    await this.pool.query(query, [title, status, id]);
    return this.getAttendanceListById(id);
  }
  async deleteAttendanceList(id) {
    const query = "DELETE FROM attendance_lists WHERE id =?";
    await this.pool.query(query, [id]);
    return { message: "Attendance list deleted successfully" };
  }
  async searchAttendanceList(q) {
    const query = `SELECT * FROM attendance_lists WHERE title LIKE '%${q}%' OR status like '%${q}%' OR id like '%${q}%'`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async sortAttendanceList(column, order) {
    const query = `SELECT * FROM attendance_lists ORDER BY ${column} ${order}`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
}

module.exports = AttendanceList;
