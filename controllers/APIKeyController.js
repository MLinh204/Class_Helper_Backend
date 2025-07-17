const APIKey = require("../models/APIKey");

const apiKeyController = {
  async createPasswordResetToken(req, res) {
    try {
      const { username } = req.body;
      const apiKey = new APIKey();
      if (!username) {
        return res.status(400).json({ message: "Username is required" });
      }
      const token = Math.random().toString(36).substring(2, 15);
      const existingTokens = await apiKey.getPasswordResetToken(
        username,
        "password_reset"
      );

      // Set expired for existing tokens
      if (existingTokens.length > 0) {
        existingTokens.forEach(async (existingToken) => {
          await apiKey.setExpired(existingToken.token);
        });
      }
      const result = await apiKey.createPasswordResetToken(
        username,
        token,
        "password_reset"
      );
      res
        .status(201)
        .json({ message: "Password reset token created successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating password reset token", error });
    }
  },
  async getPasswordResetToken(req, res) {
    try {
      const { username } = req.query;
      const apiKey = new APIKey();
      const result = await apiKey.getPasswordResetToken(
        username,
        "password_reset"
      );
      if (!result)
        return res
          .status(404)
          .json({ message: "Token not found for username", username });
      res.json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving password reset token", error });
    }
  },
  async setExpired(req, res) {
    try {
      const { token } = req.body;
      const apiKey = new APIKey();
      const result = await apiKey.setExpired(token);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Token not found" });
      res.json({ message: "Token marked as expired successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error marking token as expired", error });
    }
  },
  async resetPassword(req, res) {
    try {
      const { username, newPassword, token } = req.body;
      const apiKey = new APIKey();
      const existingToken = await apiKey.getPasswordResetTokenNotExpired(
        username,
        "password_reset"
      );
      if (existingToken[0].token !== token) {
        return res.status(404).json({ message: "Invalid or expired token" });
      }
      const result = await apiKey.resetPassword(username, newPassword);
      if (result.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });
      res.json({ message: "Password reset successfully" });

      //set the token as expired after successful password reset
      await apiKey.setExpired(existingToken.token);
    } catch (error) {
      res.status(500).json({ message: "Error resetting password", error });
    }
  },
};

module.exports = apiKeyController;
