const SalaryRecord = require("../models/salaryRecord");
const Student = require("../models/Student");
const SalaryList = require("../models/salaryList");
const { get } = require("../routes/authRoutes");
const e = require("express");

const salaryRecordController = {
  async createSalaryRecord(req, res) {
    try {
      const { salaryListId, studentId } = req.params;
      const { totalPayment, teachingDaysCount, dailyRate, isPaid } = req.body;
      const salaryRecord = new SalaryRecord();
      const student = new Student();
      const existingStudent = await student.getStudentById(studentId);
      if (!existingStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      const salaryList = new SalaryList();
      const existingSalaryList =
        await salaryList.getSalaryListById(salaryListId);
      if (!existingSalaryList) {
        return res.status(404).json({ message: "Salary list not found" });
      }
      const newSalaryRecord = await salaryRecord.createSalaryRecord(
        salaryListId,
        studentId,
        totalPayment,
        teachingDaysCount,
        dailyRate,
        isPaid
      );
      res.status(200).json(newSalaryRecord);
    } catch (error) {
      res.status(500).json({ message: "Error creating salary record", error });
    }
  },
  async getSalaryRecordById(req, res) {
    try {
      const { id } = req.params;
      const salaryRecord = new SalaryRecord();
      const salaryRecordById = await salaryRecord.getSalaryRecordById(id);
      if (!salaryRecordById) {
        return res.status(404).json({ message: "Salary record not found" });
      }
      res.json(salaryRecordById);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving salary record", error });
    }
  },
  async getSalaryRecordsBySalaryListId(req, res) {
    try {
      const { salaryListId } = req.params;
      const salaryRecord = new SalaryRecord();
      const salaryList = new SalaryList();
      const salaryListById = await salaryList.getSalaryListById(salaryListId);
      if (!salaryListById) {
        return res.status(404).json({ message: "Salary list not found" });
      }
      const salaryRecords =
        await salaryRecord.getSalaryRecordsByListId(salaryListId);
      res.status(200).json(salaryRecords);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving salary records", error });
    }
  },
  async updatePaymentStatus(req, res) {
    try {
      const { id } = req.params;
      const { isPaid, notes } = req.body;
      const salaryRecord = new SalaryRecord();
      const salaryList = new SalaryList();
      const existingSalaryRecord = await salaryRecord.getSalaryRecordById(id);
      if (!existingSalaryRecord) {
        return res.status(404).json({ message: "Salary record not found" });
      }
      const existingSalaryList = await salaryList.getSalaryListById(
        existingSalaryRecord.list_id
      );
      if (existingSalaryList.status !== "active") {
        return res.status(400).json({
          message: "Cannot update payment status for inactive salary list",
        });
      }
      if (existingSalaryRecord.is_paid === true) {
        return res.status(400).json({
          message:
            "Cannot update payment status for already paid salary record",
        });
      }
      if (typeof isPaid !== "boolean") {
        return res.status(400).json({
          message: "Payment status must be defined as a boolean",
        });
      }
      const paid_at = isPaid ? new Date() : null;

      const updatedSalaryRecord = await salaryRecord.updatePaymentStatus(
        id,
        isPaid,
        notes,
        paid_at
      );
      const existingRecordByListId =
        await salaryRecord.getSalaryRecordsByListId(
          existingSalaryRecord.list_id
        );
      const isAllPaid = existingRecordByListId.every(
        (record) => record.is_paid === 1 || record.is_paid === true
      );
      if (isAllPaid) {
        await salaryList.updateSalaryListStatus(
          existingSalaryRecord.list_id,
          "completed"
        );
      }
      res.json(updatedSalaryRecord);
    } catch (error) {
      res.status(500).json({ message: "Error updating payment status", error });
    }
  },
  async deleteSalaryRecord(req, res) {
    try {
      const { id } = req.params;
      const salaryRecord = new SalaryRecord();
      const deletedSalaryRecord = await salaryRecord.deleteSalaryRecord(id);
      res.json(deletedSalaryRecord);
    } catch (error) {
      res.status(500).json({ message: "Error deleting salary record", error });
    }
  },
  async searchSalaryRecord(req, res) {
    try {
      const { query } = req.query;
      const salaryRecord = new SalaryRecord();
      const results = await salaryRecord.searchSalaryRecord(query);
      res.status(200).json(results);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error searching salary records", error });
    }
  },
  async sortSalaryRecords(req, res) {
    try {
      const { orderBy, order } = req.query;
      const salaryRecord = new SalaryRecord();
      const sortedRecords = await salaryRecord.sortSalaryRecords(
        orderBy,
        order
      );
      res.status(200).json(sortedRecords);
    } catch (error) {
      res.status(500).json({ message: "Error sorting salary records", error });
    }
  },
  async getSalaryRecordsByStudentId(req, res) {
    try {
      const { id } = req.params;
      const salaryRecord = new SalaryRecord();
      const student = new Student();
      const existingStudent = await student.getStudentById(id);
      if (!existingStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      const salaryRecords = await salaryRecord.getSalaryRecordsByStudentId(id);
      res.status(200).json(salaryRecords);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving salary records", error });
    }
  },
};

module.exports = salaryRecordController;
