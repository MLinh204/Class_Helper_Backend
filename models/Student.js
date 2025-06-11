const pool = require("../config/db");
const User = require("./User");

class Student extends User {
  constructor() {
    super();
    this.pool = pool;
  }
  async createStudent(
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
  ) {
    const student = await super.createUser(username, password, role_id);
    const query =
      "INSERT INTO students (userFullName, gender, nickname, age, address, level, point, heart, is_created_by_teacher, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const [result] = await this.pool.query(query, [
      userFullName,
      gender,
      nickname,
      age,
      address,
      level,
      point,
      heart,
      isCreatedByTeacher,
      student.id,
    ]);
    return await this.getStudentById(result.insertId);
  }
  async getStudentById(studentId) {
    const query = `
            SELECT s.*, 
                   u.id AS user_id, u.username, u.role_id 
            FROM students s
            JOIN users u ON s.user_id = u.id
            WHERE s.id = ?;
        `;
    const [rows] = await this.pool.query(query, [studentId]);

    if (rows.length === 0) return null;

    const { user_id, username, role_id, ...studentData } = rows[0];

    return {
      ...studentData,
      user: { user_id, username, role_id },
    };
  }

  async updateStudent(id, userFullName, age, address, nickname) {
    const student = await this.getStudentById(id);
    if (!student) throw new Error("Student not found");
    const updateUserQuery =
      "UPDATE students SET userFullName = ?, age = ?, address = ?, nickname = ? WHERE id = ?";
    await this.pool.query(updateUserQuery, [
      userFullName,
      age,
      address,
      nickname,
      id,
    ]);
    return await this.getStudentById(id);
  }
  async getAllStudents() {
    const query = "SELECT * FROM students";
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async deleteStudent(id) {
    const student = await this.getStudentById(id);
    if (!student) throw new Error("Student not found");
    const query = "DELETE FROM students WHERE id =?";
    await this.pool.query(query, [id]);
    await super.deleteUser(student.user_id);
    return { message: "Student deleted successfully" };
  }
  async getAllStudent() {
    const query = "SELECT * FROM students ORDER BY id DESC";
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async getStudentByUserId(userId) {
    const query = "SELECT * FROM students WHERE user_id =?";
    const [rows] = await this.pool.query(query, [userId]);
    return rows[0];
  }
  async sortStudentsBy(column, order) {
    const query = `SELECT * FROM students ORDER BY ${column} ${order}`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async searchStudentsBy(q) {
    const query = `SELECT * FROM students WHERE userFullName LIKE '%${q}%' OR gender like '%${q}%' OR nickname like '%${q}%' OR age like '%${q}%' OR address like '%${q}%' OR id like '%${q}%' OR level LIKE '%${q}%' OR point LIKE '%${q}%' OR heart LIKE '%${q}%'`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async updateStudentPoint(id, level, point) {
    const query = "UPDATE students SET point = ?, Level = ? WHERE id = ?";
    await this.pool.query(query, [point, level, id]);
    return await this.getStudentById(id);
  }
  async updateStudentHeart(id, heart) {
    const query = "UPDATE students SET heart =? WHERE id =?";
    await this.pool.query(query, [heart, id]);
    return await this.getStudentById(id);
  }
  async updateStudentLevel(id, level) {
    const query = "UPDATE students SET level =? WHERE id =?";
    await this.pool.query(query, [level, id]);
    return await this.getStudentById(id);
  }
}

module.exports = Student;
