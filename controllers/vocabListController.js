const VocabList = require("../models/vocabList");
const Teacher = require("../models/Teacher");

const vocabListController = {
  async getVocabLists(req, res) {
    try {
      const vocabList = new VocabList();
      const vocabLists = await vocabList.getVocabLists();
      res.json(vocabLists);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving vocab lists", error });
    }
  },
  async getVocabListById(req, res) {
    try {
      const { id } = req.params;
      const vocabList = new VocabList();
      const vocabListById = await vocabList.getVocabListById(id);
      if (!vocabListById)
        return res.status(404).json({ message: "Vocab list not found" });
      res.json(vocabListById);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving vocab list", error });
    }
  },
  async createVocabList(req, res) {
    try {
      //Get userId
      const userId = req.user?.id;
      if (!userId) return res.status(404).json({ message: "User not found" });
      //Check teacherId exists
      const teacher = new Teacher();
      const teacherByUserId = await teacher.getTeacherByUserId(userId);
      if (!teacherByUserId)
        return res.status(404).json({ message: "Teacher not found" });

      const { title, description, category } = req.body;
      const word_count = 0;
      const createdAt = new Date();
      const vocabList = new VocabList();
      const newVocabList = await vocabList.createVocabList(
        title,
        description,
        category,
        word_count,
        teacherByUserId.id,
        createdAt
      );
      res.status(200).json(newVocabList);
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating vocab list", error: err.message });
    }
  },
  async updateVocabList(req, res) {
    try {
      const { id } = req.params;
      const vocabList = new VocabList();
      const existingVocabList = await vocabList.getVocabListById(id);
      if (!existingVocabList)
        return res.status(404).json({ message: "Vocab list not found" });
      const { title, description, category } = req.body;
      const updatedVocabList = await vocabList.updateVocabList(
        id,
        title,
        description,
        category
      );
      res.status(200).json(updatedVocabList);
    } catch (error) {
      res.status(500).json({ message: "Error updating vocab list", error });
    }
  },
  async deleteVocabList(req, res) {
    try {
      const { id } = req.params;
      const vocabList = new VocabList();
      const existingVocabList = await vocabList.getVocabListById(id);
      if (!existingVocabList)
        return res.status(404).json({ message: "Vocab list not found" });
      const deletedVocabList = await vocabList.deleteVocabList(id);
      res.status(200).json(deletedVocabList);
    } catch (error) {
      res.status(500).json({ message: "Error deleting vocab list", error });
    }
  },
  async searchVocabList(req, res) {
    try {
      const { query } = req.query;
      const vocabList = new VocabList();
      const vocabLists = await vocabList.searchVocabList(query);
      res.status(200).json(vocabLists);
    } catch (error) {
      res.status(500).json({ message: "Error searching vocab lists", error });
    }
  },
  async sortVocabListsBy(req, res) {
    try {
      const { column, order } = req.query;
      const vocabList = new VocabList();
      const sortedLists = await vocabList.sortVocabListsBy(column, order);
      res.json(sortedLists);
    } catch (error) {
      res.status(500).json({ message: "Error sorting vocab lists", error });
    }
  },
  async getWordCount(req, res) {
    try {
      const { id } = req.params;
      const vocabList = new VocabList();
      const vocabListById = await vocabList.getVocabListById(id);
      if (!vocabListById)
        return res.status(404).json({ message: "Vocab list not found" });
      res.json({ word_count: vocabListById.word_count });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving word count", error });
    }
  },
  async increaseWordCount(req, res) {
    try {
      const { list_id } = req.params;
      const existingVocabList = await vocabList.getVocabListById(list_id);
      if (!existingVocabList)
        return res.status(404).json({ message: "Vocab list not found" });
      const word_count = existingVocabList.word_count + 1;
      const vocabList = new VocabList();
      const updatedVocabList = await vocabList.updateWordCount(
        list_id,
        word_count
      );
      res.status(200).json(updatedVocabList);
    } catch (error) {
      res.status(500).json({ message: "Error increasing word count", error });
    }
  },
};
module.exports = vocabListController;
