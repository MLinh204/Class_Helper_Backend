const AttendanceList = require("../models/AttendanceList");

async function getTeachingDateCount(query) {
  const attendanceList = new AttendanceList();
  const result = await attendanceList.searchAttendanceList(query);
  return result.length;
}
function calculateTotalPayment(dailyRate, teachingDaysCount) {
  return dailyRate * teachingDaysCount;
}

module.exports = {
  getTeachingDateCount,
  calculateTotalPayment,
};
