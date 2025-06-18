const pool = require("../config/db");

class SalaryRecord {
  constructor() {
    this.pool = pool;
  }
  async createSalaryRecord(
    list_id,
    student_id,
    total_payment,
    teaching_days_count,
    daily_rate,
    is_paid
  ) {
    const query =
      "INSERT INTO salary_records (list_id, student_id, total_payment, teaching_days_count, daily_rate, is_paid) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await this.pool.query(query, [
      list_id,
      student_id,
      total_payment,
      teaching_days_count,
      daily_rate,
      is_paid,
    ]);
    return this.getSalaryRecordById(result.insertId);
  }
  async getSalaryRecordById(id) {
    const query = "SELECT * FROM salary_records WHERE id =?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async getSalaryRecordsByListId(list_id) {
    const query = "SELECT * FROM salary_records WHERE list_id =?";
    const [rows] = await this.pool.query(query, [list_id]);
    return rows;
  }
  async updatePaymentStatus(id, is_paid, notes, paid_at) {
    const query =
      "UPDATE salary_records SET is_paid =?, notes=?, paid_at=?  WHERE id =?";
    await this.pool.query(query, [is_paid, notes, paid_at, id]);
    return this.getSalaryRecordById(id);
  }
  async deleteSalaryRecord(id) {
    const query = "DELETE FROM salary_records WHERE id =?";
    await this.pool.query(query, [id]);
    return { message: "Salary record deleted successfully" };
  }
  async searchSalaryRecord(query) {
    const sql = `SELECT * FROM salary_records WHERE student_id LIKE ? OR list_id LIKE ?`;
    const [rows] = await this.pool.query(sql, [`%${query}%`, `%${query}%`]);
    return rows;
  }
  async sortSalaryRecords(orderBy, order) {
    const sql = `SELECT * FROM salary_records ORDER BY ?? ${order}`;
    const [rows] = await this.pool.query(sql, [orderBy]);
    return rows;
  }
  async getSalaryRecordsByStudentId(student_id) {
    const query = "SELECT * FROM salary_records WHERE student_id =?";
    const [rows] = await this.pool.query(query, [student_id]);
    return rows;
  }
}

module.exports = SalaryRecord;
