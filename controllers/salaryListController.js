const SalaryList = require("../models/salaryList");
const Student = require("../models/Student");
const SalaryRecord = require("../models/salaryRecord");
const {
  getTeachingDateCount,
  calculateTotalPayment,
} = require("../helper/helper");

const salaryListController = {
  async createSalaryList(req, res) {
    try {
      //Check userId exists
      const userId = req.user?.id;
      if (!userId)
        return res.status(403).json({ message: "Unauthorized access" });

      const salaryList = new SalaryList();
      const { monthYear, dailyRate } = req.body;
      if (!monthYear || !dailyRate) {
        return res
          .status(400)
          .json({ message: "month and year and daily rate are required" });
      }
      const title = `Payment List for ${monthYear}`;
      const status = "active";
      const createdAt = new Date();
      const lastUpdatedAt = new Date();
      const total_records = 0;
      const newSalaryList = await salaryList.createSalaryList(
        title,
        monthYear,
        dailyRate,
        status,
        total_records,
        createdAt,
        lastUpdatedAt
      );
      const student = new Student();
      const students = await student.getAllStudent();
      const activeStudents = students.filter(
        (student) => student.is_created_by_teacher === 0
      );
      const salaryRecord = new SalaryRecord();
      const teachingDateCount = await getTeachingDateCount(monthYear);
      const totalPayment = calculateTotalPayment(dailyRate, teachingDateCount);
      const isPaid = false;

      for (const student of activeStudents) {
        await salaryRecord.createSalaryRecord(
          newSalaryList.id,
          student.id,
          totalPayment,
          teachingDateCount,
          dailyRate,
          isPaid
        );
      }
      const updatedTotalRecords = activeStudents.length;
      const result = await salaryList.updateTotalRecords(
        newSalaryList.id,
        updatedTotalRecords
      );
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: "Error creating salary list", error });
    }
  },
  async getSalaryListById(req, res) {
    try {
      const { id } = req.params;
      const salaryList = new SalaryList();
      const salaryListById = await salaryList.getSalaryListById(id);
      if (!salaryListById)
        return res.status(404).json({ message: "Salary list not found" });
      res.json(salaryListById);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving salary list", error });
    }
  },
  async getAllSalaryLists(req, res) {
    try {
      const salaryList = new SalaryList();
      const salaryLists = await salaryList.getSalaryLists();
      res.status(200).json(salaryLists);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving salary lists", error });
    }
  },
  async updateSalaryList(req, res) {
    try {
      const { id } = req.params;
      const { title, month_year, status } = req.body;
      if (!title || !month_year || !status) {
        return res
          .status(400)
          .json({ message: "Title, monthYear and status are required" });
      }
      const salaryList = new SalaryList();
      const updatedSalaryList = await salaryList.updateSalaryList(
        id,
        title,
        month_year,
        status
      );
      if (!updatedSalaryList)
        return res.status(404).json({ message: "Salary list not found" });
      res.json(updatedSalaryList);
    } catch (error) {
      res.status(500).json({ message: "Error updating salary list", error });
    }
  },
  async deleteSalaryList(req, res) {
    try {
      const { id } = req.params;
      const salaryList = new SalaryList();
      const deletedSalaryList = await salaryList.deleteSalaryList(id);
      if (!deletedSalaryList)
        return res.status(404).json({ message: "Salary list not found" });
      res.json({ message: "Salary list deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting salary list", error });
    }
  },
  async getSalaryRecordsByListId(req, res) {
    try {
      const { listId } = req.params;
      const salaryRecord = new SalaryRecord();
      const salaryRecords = await salaryRecord.getSalaryRecordsByListId(listId);
      if (!salaryRecords || salaryRecords.length === 0)
        return res.status(404).json({ message: "No salary records found" });
      res.status(200).json(salaryRecords);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving salary records", error });
    }
  },
  async searchSalaryList(req, res) {
    try {
      const { q } = req.query;
      const salaryList = new SalaryList();
      const salaryLists = await salaryList.searchSalaryList(q);
      res.status(200).json(salaryLists);
    } catch (error) {
      res.status(500).json({ message: "Error searching salary lists", error });
    }
  },
  async sortSalaryLists(req, res) {
    try {
      const { column, order } = req.query;
      const salaryList = new SalaryList();
      const sortedSalaryLists = await salaryList.sortSalaryList(column, order);
      res.status(200).json(sortedSalaryLists);
    } catch (error) {
      res.status(500).json({ message: "Error sorting salary lists", error });
    }
  },
};

module.exports = salaryListController;
