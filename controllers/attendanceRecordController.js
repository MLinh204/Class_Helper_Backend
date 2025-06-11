const AttendanceRecord = require("../models/AttendanceRecord");
const Student = require("../models/Student");
const AttendanceList = require("../models/AttendanceList");

const attendaceRecoredController = {
  async createAttendanceRecord(req, res) {
    try {
      const { attendanceListId, studentId } = req.params;
      const { status } = req.body;
      const attendanceRecord = new AttendanceRecord();
      const student = new Student();
      const existingStudent = await student.getStudentById(studentId);
      if (!existingStudent)
        return res.status(404).json({ message: "Student not found" });
      const attendanceList = new AttendanceList();
      const existingAttendanceList =
        await attendanceList.getAttendanceListById(attendanceListId);
      if (!existingAttendanceList)
        return res.status(404).json({ message: "Attendance list not found" });
      const newAttendanceRecord = await attendanceRecord.createAttendanceRecord(
        attendanceListId,
        studentId,
        status
      );
      res.status(200).json(newAttendanceRecord);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating attendance record", error });
    }
  },
  async getAttendanceRecordById(req, res) {
    try {
      const { id } = req.params;
      const attendanceRecord = new AttendanceRecord();
      const attendanceRecordById =
        await attendanceRecord.getAttendanceRecordById(id);
      if (!attendanceRecordById)
        return res.status(404).json({ message: "Attendance record not found" });
      res.json(attendanceRecordById);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving attendance record", error });
    }
  },
  async getAttendanceRecordsByAttendanceListId(req, res) {
    try {
      const { attendanceListId } = req.params;
      const attendanceRecord = new AttendanceRecord();
      const attendanceList = new AttendanceList();
      const attendanceListById =
        await attendanceList.getAttendanceListById(attendanceListId);
      if (!attendanceListById)
        return res.status(404).json({ message: "Attendance list not found" });
      const attendanceRecords =
        await attendanceRecord.getAttendanceRecordsByAttendanceListId(
          attendanceListId
        );
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving attendance records", error });
    }
  },
  async getAttendanceRecordsByStudentId(req, res) {
    try {
      const { studentId } = req.params;
      const attendanceRecord = new AttendanceRecord();
      const student = await Student.getStudentById(studentId);
      if (!student)
        return res.status(404).json({ message: "Student not found" });
      const attendanceRecords =
        await attendanceRecord.getAttendanceRecordsByStudentId(studentId);
      res.status(200).json(attendanceRecords);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving attendance records", error });
    }
  },
  async updateAttended(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const attendanceRecord = new AttendanceRecord();
      const existingAttendanceRecord =
        await attendanceRecord.getAttendanceRecordById(id);
      const attendanceList = new AttendanceList();
      const existingAttendanceList = await attendanceList.getAttendanceListById(
        existingAttendanceRecord.list_id
      );
      if (existingAttendanceList.status === "closed")
        return res
          .status(400)
          .json({ message: "Attendance is closed, cannot update" });
      const updatedAttendanceRecord = await attendanceRecord.updateAttended(
        id,
        status
      );
      res.status(200).json(updatedAttendanceRecord);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating attendance record", error });
    }
  },
  async deleteAttendanceRecord(req, res) {
    try {
      const { id } = req.params;
      const attendanceRecord = new AttendanceRecord();
      const deletedAttendanceRecord =
        await attendanceRecord.deleteAttendanceRecord(id);
      if (!deletedAttendanceRecord.affectedRows)
        return res.status(404).json({ message: "Attendance record not found" });
      res.json({ message: "Attendance record deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting attendance record", error });
    }
  },
};

module.exports = attendaceRecoredController;
