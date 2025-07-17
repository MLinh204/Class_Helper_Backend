const express = require("express");
require("dotenv").config();
const dbPool = require("./config/db");
const mysql = require("mysql2/promise");
const cors = require("cors");
const sql = String.raw;

const authRoutes = require("./routes/authRoutes");
const registrationListRoutes = require("./routes/registrationListRoutes");
const roleRoutes = require("./routes/roleRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const userRoutes = require("./routes/userRoutes");
const attendanceRecordRoutes = require("./routes/attendanceRecordRoutes");
const attendanceListRoutes = require("./routes/attendanceListRoutes");
const vocabRoutes = require("./routes/vocabRoutes");
const vocabListRoutes = require("./routes/vocabListRoutes");
const salaryListRoutes = require("./routes/salaryListRoutes");
const salaryRecordRoutes = require("./routes/salaryRecordRoutes");
const APIKeyRoutes = require("./routes/APIKeyRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api", registrationListRoutes);
app.use("/api", roleRoutes);
app.use("/api", teacherRoutes);
app.use("/api", studentRoutes);
app.use("/api", userRoutes);
app.use("/api", attendanceRecordRoutes);
app.use("/api", attendanceListRoutes);
app.use("/api", vocabRoutes);
app.use("/api", vocabListRoutes);
app.use("/api", salaryListRoutes);
app.use("/api", salaryRecordRoutes);
app.use("/api", APIKeyRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});
(async () => {
  try {
    const connection = await dbPool.getConnection();
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS roles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(50) NOT NULL
            )
            `);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS registration_lists (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE
            )
            `);

    await connection.execute(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role_id INT,
                FOREIGN KEY (role_id) REFERENCES roles(id),
                CONSTRAINT fk_registration_lists FOREIGN KEY (username) REFERENCES registration_lists(username) ON DELETE CASCADE
            )
            `);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS teachers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                scheduleDate VARCHAR(255),
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            `);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS students (
                id INT AUTO_INCREMENT PRIMARY KEY,
                userFullName VARCHAR(100) NOT NULL,
                gender ENUM('Boy', 'Girl') NOT NULL,
                nickname VARCHAR(100),        
                age INT,
                address VARCHAR(255),
                level INT not null,
                point INT not null,
                heart INT not null,
                user_id INT UNIQUE,
                is_created_by_teacher BOOLEAN DEFAULT false,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
            `);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS attendance_lists (  
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                teacher_id INT NOT NULL,
                status ENUM('active', 'closed') NOT NULL,  
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
                FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE  
            ) 
            `);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS attendance_record (  
                id INT AUTO_INCREMENT PRIMARY KEY,  
                list_id INT NOT NULL,  
                student_id INT NOT NULL,  
                status ENUM('pending', 'attended', 'absent') NOT NULL,  
                FOREIGN KEY (list_id) REFERENCES attendance_lists(id) ON DELETE CASCADE,  
                FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE  
            )
            `);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS vocab_list (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                word_count INT NOT NULL,
                teacher_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
                FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
            )
            `);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS vocab(
                id INT AUTO_INCREMENT PRIMARY KEY,
                list_id INT NOT NULL,
                word VARCHAR(255) NOT NULL,
                translation VARCHAR(255) NOT NULL,
                definition VARCHAR(255) NOT NULL,
                part_of_speech ENUM('noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'phrase verb', 'collocation'),
                example_sentence VARCHAR(255) NOT NULL,
                synonyms VARCHAR(255) NOT NULL,
                antonyms VARCHAR(255),
                created_by INT not null,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
                FOREIGN KEY (created_by) REFERENCES students(id) ON DELETE CASCADE,
                FOREIGN KEY (list_id) REFERENCES vocab_list(id) ON DELETE CASCADE
            )
            `);
    await connection.execute(
      sql`
        CREATE TABLE IF NOT EXISTS salary_lists (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          month_year VARCHAR(255) NOT NULL,
          daily_rate BIGINT NOT NULL, -- VND amount in smallest unit
          status ENUM('active', 'completed') DEFAULT 'active',
          total_records INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          -- Indexes
          INDEX idx_month_year (month_year),
          INDEX idx_status (status)
        )
      `
    );
    await connection.execute(
      sql`        
        CREATE TABLE IF NOT EXISTS salary_records (
          id INT AUTO_INCREMENT PRIMARY KEY,
          list_id INT NOT NULL,
          student_id INT NOT NULL,
          total_payment BIGINT NOT NULL, -- VND amount in smallest unit
          teaching_days_count INT NOT NULL,
          daily_rate BIGINT NOT NULL, -- VND amount in smallest unit
          is_paid BOOLEAN DEFAULT FALSE,
          paid_at TIMESTAMP NULL,
          notes TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

          -- Foreign key constraints
          FOREIGN KEY (list_id) REFERENCES salary_lists(id) ON DELETE CASCADE,
          -- Assuming you have a students table
          -- FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,

          -- Indexes
          INDEX idx_list_id (list_id),
          INDEX idx_student_id (student_id),
          INDEX idx_is_paid (is_paid),
          INDEX idx_paid_at (paid_at),

          -- Unique constraint to prevent duplicate records
          UNIQUE KEY unique_list_student (list_id, student_id)
        );
      `
    );
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS api_keys (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL,
                token VARCHAR(255) NOT NULL UNIQUE,
                type VARCHAR(255) NOT NULL,
                is_expired BOOLEAN DEFAULT false,
                expires_at DATETIME NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `);
    await connection.release();
    console.log("Database tables created");
  } catch (err) {
    console.error("Error creating database tables", err);
  }
})();
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
