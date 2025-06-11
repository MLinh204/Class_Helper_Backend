const pool = require("../config/db");

class RegistrationList {
  constructor() {
    this.pool = pool;
  }
  async getRegistrationListById(id) {
    const query = "SELECT * FROM registration_lists WHERE id = ?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async getRegistrationLists() {
    const query = "SELECT * FROM registration_lists ORDER BY id DESC";
    const [rows] = await this.pool.query(query);
    return rows;
  }

  async addRegistrationList(username) {
    const query = "INSERT INTO registration_lists (username) VALUES (?)";
    const [result] = await this.pool.query(query, [username]);
    const row = await this.getRegistrationListById(result.insertId);

    if (!row || row.length === 0) {
      throw new Error("Failed to retrieve inserted registration list");
    }

    return row;
  }
  async deleteRegistrationList(id) {
    const query = "DELETE FROM registration_lists WHERE id =?";
    await this.pool.query(query, [id]);
    return { message: "Registration list deleted successfully" };
  }
  async updateRegistrationList(id, username) {
    const query = "UPDATE registration_lists SET username =? WHERE id =?";
    await this.pool.query(query, [username, id]);
    return this.getRegistrationListById(id);
  }
  async getRegistrationListByUsername(username) {
    const query = "SELECT * FROM registration_lists WHERE username =?";
    const [rows] = await this.pool.query(query, [username]);
    return rows[0];
  }
  async isUserAllowedRegistration(username) {
    const registrationList = await this.getRegistrationListByUsername(username);
    if (!registrationList) {
      return false;
    } else {
      return true;
    }
  }
  async searchRegistrationList(query) {
    const sql = `SELECT * FROM registration_lists WHERE username LIKE '%${query}%'`;
    const [rows] = await this.pool.query(sql);
    return rows;
  }
  async sortRegistrationListsBy(column, order) {
    const sql = `SELECT * FROM registration_lists ORDER BY ${column} ${order}`;
    const [rows] = await this.pool.query(sql);
    return rows;
  }
}

module.exports = RegistrationList;
