const Vocab = require('../models/vocab');
const Student = require('../models/Student');
const VocabList = require('../models/vocabList');
const  {calculateAndUpdatePoints} = require('../services/studentService');
const vocabController = {
    async createVocab(req, res) {
        try {
            const { word, translation, definition, part_of_speech, example_sentence, synonyms, antonyms } = req.body;
            const { list_id } = req.params;

            //Get user Id
            const userId = req.user.id;

            //get student Id
            const student = new Student();
            const studentByUserId = await student.getStudentByUserId(userId);
            if (!studentByUserId) return res.status(404).json({ message: 'User not found' });
            const studentId = studentByUserId.id;
            if (!studentId) return res.status(404).json({ message: 'User not found' });

            const createdAt = new Date();
            const vocab = new Vocab();

            const newVocab = await vocab.createVocab(list_id, word, translation, definition, part_of_speech, example_sentence, synonyms, antonyms, studentId, createdAt);

            //Increase word count in the vocab list
            const vocabList = new VocabList();
            const existingVocabList = await vocabList.getVocabListById(list_id)
            if (!existingVocabList) return res.status(404).json({ message: 'Vocab list not found' });
            const word_count = existingVocabList.word_count + 1;
            await vocabList.updateWordCount(list_id, word_count);
            //Increase student point here
            const pointToAdd = newVocab.antonyms ? 25 : 20;
            const updatedStudent = await calculateAndUpdatePoints(studentId, pointToAdd);
            console.log('Student updated points: ' + updatedStudent.point)
            console.log('Student updated level: ' + updatedStudent.level)

            res.status(200).json(newVocab);
        } catch (err) {
            res.status(500).json({ message: 'Error creating vocabulary', error: err.message });

        }
    },
    async getVocabById(req, res) {
        try {
            const { id } = req.params;
            const vocab = new Vocab();
            const vocabById = await vocab.getVocabById(id);
            if (!vocabById) return res.status(404).json({ message: 'Vocabulary not found' });
            res.status(200).json(vocabById);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving vocabulary by id', error: err.message });
        }
    },
    async getVocabByListId(req, res) {
        try {
            const { id } = req.params;
            const vocab = new Vocab();
            const vocabsByListId = await vocab.getVocabsByListId(id);
            res.status(200).json(vocabsByListId);
        } catch (err) {
            res.status(500).json({ message: 'Error retrieving vocabulary by list id', error: err.message });
        }
    },
    async updateVocab(req, res) {
        try {
            const { id } = req.params;
            const { word, translation, definition, part_of_speech, example_sentence, synonyms, antonyms } = req.body;

            const vocab = new Vocab();
            const updatedVocab = await vocab.updateVocab(id, word, translation, definition, part_of_speech, example_sentence, synonyms, antonyms);
            res.status(200).json(updatedVocab);
        } catch (err) {
            res.status(500).json({ message: 'Error updating vocabulary', error: err.message });
        }
    },
    async deleteVocab(req, res) {
        try {
            const { list_id } = req.params;
            const vocab = new Vocab();
            const existingVocab = await vocab.getVocabsByListId(list_id);
            if (!existingVocab) return res.status(404).json({ message: 'Vocabulary not found' });
            const deletedVocab = await vocab.deleteVocab(list_id);
            res.status(200).json(deletedVocab);
        } catch (err) {
            res.status(500).json({ message: 'Error deleting vocabulary', error: err.message });
        }
    },
    async searchVocab(req, res) {
        try {
            const { query } = req.query;
            const { list_id } = req.params;
            const vocab = new Vocab();
            const existingVocabList = await vocab.getVocabsByListId(list_id);
            if (!existingVocabList) return res.status(404).json({ message: 'Vocabulary list not found' });
            const vocabs = await vocab.searchVocab(list_id, query);
            res.status(200).json(vocabs);
        } catch (err) {
            res.status(500).json({ message: 'Error searching vocabulary', error: err.message });
        }
    },
    async sortVocabsBy(req, res) {
        try {
            const { column, order } = req.query;
            const { list_id } = req.params;
            const vocab = new Vocab();
            const existingVocabList = await vocab.getVocabsByListId(list_id);
            if (!existingVocabList) return res.status(404).json({ message: 'Vocabulary list not found' });
            const vocabs = await vocab.sortVocabsBy(list_id, column, order);
            res.status(200).json(vocabs);
        } catch (err) {
            res.status(500).json({ message: 'Error sorting vocabulary', error: err.message });
        }
    },
}


module.exports = vocabController;