const pool = require("../config/db");

class SalaryList {
  constructor() {
    this.pool = pool;
  }
  async createSalaryList(
    title,
    monthYear,
    daily_rate,
    status,
    total_records,
    createdAt
  ) {
    const query =
      "INSERT INTO salary_lists (title, month_year, daily_rate, status, total_records, created_at) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await this.pool.query(query, [
      title,
      monthYear,
      daily_rate,
      status,
      total_records,
      createdAt,
    ]);
    return await this.getSalaryListById(result.insertId);
  }
  async getSalaryListById(id) {
    const query = "SELECT * FROM salary_lists WHERE id =?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async getSalaryLists() {
    const query = "SELECT * FROM salary_lists ORDER BY id DESC";
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async getSalaryListsByStatus(status) {
    const query = "SELECT * FROM salary_lists WHERE status =?";
    const [rows] = await this.pool.query(query, [status]);
    return rows;
  }
  async updateSalaryList(id, title, monthYear, status, total_records) {
    const query =
      "UPDATE salary_lists SET title =?, month_year =?, status =?, total_records =? WHERE id =?";
    await this.pool.query(query, [title, monthYear, status, total_records, id]);
    return this.getSalaryListById(id);
  }
  async deleteSalaryList(id) {
    const query = "DELETE FROM salary_lists WHERE id =?";
    await this.pool.query(query, [id]);
    return { message: "Salary list deleted successfully" };
  }
  async searchSalaryList(q) {
    const query = `SELECT * FROM salary_lists WHERE title LIKE '%${q}%' OR month_year LIKE '%${q}%' OR status LIKE '%${q}%' OR id LIKE '%${q}%'`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async sortSalaryList(column, order) {
    const query = `SELECT * FROM salary_lists ORDER BY ${column} ${order}`;
    const [rows] = await this.pool.query(query);
    return rows;
  }
  async updateTotalRecords(id, total_records) {
    const query = "UPDATE salary_lists SET total_records = ? WHERE id = ?";
    await this.pool.query(query, [total_records, id]);
    return await this.getSalaryListById(id);
  }
  async updateSalaryListStatus(id, status) {
    const query = "UPDATE salary_lists SET status = ? WHERE id = ?";
    await this.pool.query(query, [status, id]);
    return await this.getSalaryListById(id);
  }
}

module.exports = SalaryList;
