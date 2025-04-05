const pool = require('../config/db');

class VocabList{
    constructor(){
        this.pool = pool;
    }
    async createVocabList(title, description, category, word_count, teacher_id, created_at){
        const query = 'INSERT INTO vocab_list (title, description, category, word_count, teacher_id, created_at) VALUES (?, ?, ?, ?, ?, ?)';
        const [result] = await this.pool.query(query, [title, description, category, word_count, teacher_id, created_at]);
        return this.getVocabListById(result.insertId);
    }
    async getVocabListById(id){
        const query = 'SELECT * FROM vocab_list WHERE id =?';
        const [rows] = await this.pool.query(query, [id]);
        return rows[0];
    }
    async getVocabListsByTeacherId(teacherId){
        const query = 'SELECT * FROM vocab_list WHERE teacher_id =?';
        const [rows] = await this.pool.query(query, [teacherId]);
        return rows;
    }
    async getVocabLists(){
        const query = 'SELECT * FROM vocab_list ORDER BY id DESC';
        const [rows] = await this.pool.query(query);
        return rows;
    }
    async updateVocabList(id, title, description, category){
        const query = 'UPDATE vocab_list SET title =?, description =?, category =? WHERE id =?';
        await this.pool.query(query, [title, description, category, id]);
        return this.getVocabListById(id);
    }
    async deleteVocabList(id){
        const query = 'DELETE FROM vocab_list WHERE id =?';
        await this.pool.query(query, [id]);
        return {message: 'Vocabulary list deleted successfully'};
    }
    async searchVocabList(q){
        const query = `SELECT * FROM vocab_list WHERE title LIKE '%${q}%' OR description LIKE '%${q}%' OR id LIKE '%${q}%'`;
        const [rows] = await this.pool.query(query);
        return rows;
    }
    async sortVocabListsBy(column, order){
        const query = `SELECT * FROM vocab_list ORDER BY ${column} ${order}`;
        const [rows] = await this.pool.query(query);
        return rows;
    }
    async updateWordCount(id, word_count){
        const query = 'UPDATE vocab_list SET word_count = ? WHERE id = ?';
        await this.pool.query(query, [word_count, id]);
        return this.getVocabListById(id);
    }
}

module.exports = VocabList;