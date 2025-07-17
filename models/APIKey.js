const pool = require("../config/db");
const bcrypt = require("bcryptjs");

class APIKey {
  constructor() {
    this.pool = pool;
  }
  async createPasswordResetToken(username, token, type) {
    const query =
      "INSERT INTO api_keys (username, token, type, is_expired, expires_at, created_at) VALUES (?, ?, ?, ?, ?, ?)";
    const [result] = await this.pool.query(query, [
      username,
      token,
      type,
      false,
      new Date(Date.now() + 24 * 60 * 60 * 1000),
      new Date(Date.now()),
    ]);
    return result;
  }

  async getPasswordResetToken(username, type) {
    const query = "SELECT * FROM api_keys WHERE username = ? AND type = ?";
    const [rows] = await this.pool.query(query, [username, type]);
    return rows.length > 0 ? rows : [];
  }
  async getPasswordResetTokenNotExpired(username, type) {
    const query =
      "SELECT * FROM api_keys WHERE username = ? AND type = ? AND is_expired = false";
    const [rows] = await this.pool.query(query, [username, type]);
    return rows.length > 0 ? rows : [];
  }
  async setExpired(token) {
    const query = "UPDATE api_keys SET is_expired = 1 WHERE token = ?";
    const [result] = await this.pool.query(query, [token]);
    return result;
  }
  async resetPassword(username, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const query = "UPDATE users SET password = ? WHERE username = ?";
    const [result] = await this.pool.query(query, [hashedPassword, username]);
    return result;
  }
}

module.exports = APIKey;
