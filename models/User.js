const bcrypt = require("bcryptjs");
const pool = require("../config/db");

class User {
  constructor() {
    this.pool = pool;
  }
  async createUser(username, password, role_id) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)`;
    const [result] = await this.pool.query(query, [
      username,
      hashedPassword,
      role_id,
    ]);
    const [rows] = await this.pool.query(
      `SELECT * FROM users where id =?`,
      result.insertId
    );
    return rows[0];
  }
  async getUserByUsername(username) {
    const query = "SELECT * FROM users WHERE username =?";
    const [rows] = await this.pool.query(query, [username]);
    return rows[0];
  }
  async getUserById(id) {
    const query = "SELECT * FROM users WHERE id =?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async updateUser(id, username, role_id) {
    const query = "UPDATE users SET username =?, role_id =? WHERE id =?";
    await this.pool.query(query, [username, role_id, id]);
    const [rows] = await this.pool.query(`SELECT * FROM users where id =?`, id);
    return rows[0];
  }
  async deleteUser(id) {
    const query = "DELETE FROM users WHERE id =?";
    const [result] = await this.pool.query(query, [id]);
    return result;
  }
  async updateUserRole(id, role_id) {
    const query = "UPDATE users SET role_id =? WHERE id =?";
    await this.pool.query(query, [role_id, id]);
    const [rows] = await this.pool.query(`SELECT * FROM users where id =?`, id);
    return rows[0];
  }
  async getAllUsers() {
    const query = "SELECT * FROM users ORDER BY id DESC";
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async searchUser(q) {
    const query = `SELECT * FROM users WHERE username LIKE '%${q}%' OR role_id LIKE '%${q}%'`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async sortUsersBy(column, order) {
    const query = `SELECT * FROM users ORDER BY ${column} ${order}`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
}

module.exports = User;
