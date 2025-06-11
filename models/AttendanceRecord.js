const pool = require("../config/db");

class AttendanceRecord {
  constructor() {
    this.pool = pool;
  }
  async createAttendanceRecord(attendanceListId, studentId, status) {
    const query =
      "INSERT INTO attendance_record (list_id, student_id, status) VALUES (?,?,?)";
    const [result] = await this.pool.query(query, [
      attendanceListId,
      studentId,
      status,
    ]);
    return this.getAttendanceRecordById(result.insertId);
  }
  async getAttendanceRecordById(id) {
    const query = "SELECT * FROM attendance_record WHERE id =?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async getAttendanceRecordsByAttendanceListId(attendanceListId) {
    const query = "SELECT * FROM attendance_record WHERE list_id =?";
    const [rows] = await this.pool.query(query, [attendanceListId]);
    return rows;
  }
  async getAttendanceRecordsByStudentId(studentId) {
    const query = "SELECT * FROM attendance_record WHERE student_id =?";
    const [rows] = await this.pool.query(query, [studentId]);
    return rows;
  }
  async updateAttended(id, status) {
    const query = "UPDATE attendance_record SET status =? WHERE id =?";
    await this.pool.query(query, [status, id]);
    return this.getAttendanceRecordById(id);
  }
  async deleteAttendanceRecord(id) {
    const query = "DELETE FROM attendance_record WHERE id =?";
    await this.pool.query(query, [id]);
    return { message: "Attendance record deleted successfully" };
  }
}

module.exports = AttendanceRecord;
