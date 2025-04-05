const jwt = require('jsonwebtoken');
const pool = require('../config/db');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const authMiddleware = {
    async verifyToken(req, res, next) {
        try {
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ message: 'Token is required' });
            }
    
            const token = authHeader.split(' ')[1]; // Extract token after "Bearer"
            const decoded = jwt.verify(token, jwtSecret);
            req.user = decoded;
    
            const query = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await pool.query(query, [decoded.id]);
    
            if (rows.length === 0) {
                return res.status(403).json({ message: 'User not found or unauthorized' });
            }
    
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
    },

    verifyRole: (roleId) => async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(403).json({ message: 'Authentication required' });
            }

            const query = 'SELECT role_id FROM users WHERE id = ?';
            const [[user]] = await pool.query(query, [req.user.id]); // Get single user object

            if (!user) {
                return res.status(403).json({ message: 'User role not found' });
            }

            if (user.role_id !== roleId) {
                return res.status(403).json({ message: 'Access denied' });
            }

            next(); 
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = authMiddleware;
