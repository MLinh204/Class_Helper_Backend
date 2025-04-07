// studentService.js
const Student = require('../models/Student');

async function calculateAndUpdatePoints(studentId, deltaPoints) {
    const student = new Student();
    const existingStudent = await student.getStudentById(studentId);
    if (!existingStudent) return null;

    const cumulativePoints = (existingStudent.level - 1) * 2000 + existingStudent.point;
    const newCumulativePoints = cumulativePoints + deltaPoints;

    if (newCumulativePoints < 0) return null;

    const newLevel = Math.floor(newCumulativePoints / 2000) + 1;
    const newPoints = newCumulativePoints % 2000;

    return await student.updateStudentPoint(studentId, newLevel, newPoints);
}

module.exports = { calculateAndUpdatePoints };
