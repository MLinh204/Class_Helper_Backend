const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Student = require('../models/Student');
const RegistrationList = require('../models/RegistrationList');

const authController = {
    async register(req, res) {
        try {
            const { userFullName, gender, nickname,  age, address, username, password } = req.body;
            const role_id = 2; // Default role: student
            const level = 1; // Default level
            const heart = 10; // Default heart
            const point = 0; // Default point
            const user = new User();
            const student = new Student();
            const registrationList = new RegistrationList();

            const isUserAllowed = await registrationList.isUserAllowedRegistration(username);
            if (!isUserAllowed) {
                return res.status(400).json({ message: 'Registration is not allowed for this user' });
            }
            const existingUser = await user.getUserByUsername(username);
            if (existingUser) return res.status(400).json({ message: 'Username already exists' });
            const newStudent = await student.createStudent(userFullName, gender, nickname, age, address, username, password, role_id, level, point, heart);
            return res.status(200).json(newStudent);
        } catch (err) {
            res.status(500).json({ message: 'Error registering user', err });
        }
    },
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = new User();
            const existingUser = await user.getUserByUsername(username);
            if (!existingUser) return res.status(401).json({ message: 'Invalid username or password' });
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
            if (!isPasswordMatch) return res.status(401).json({ message: 'Invalid username or password' });
            const token = jwt.sign({
                id: existingUser.id
            }, jwtSecret, {expiresIn: '24h' });
            const { password: _, ...userWithoutPassword } = existingUser;
            return res.status(200).json({ token, user: userWithoutPassword });
        } catch (err) {
            res.status(500).json({ message: 'Error logging in', err });
        }
    },
    async logout(req, res){
        res.json({ message: 'Log out successfully' });
    }
}

module.exports = authController;