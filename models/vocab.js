const pool = require("../config/db");

class Vocab {
  constructor() {
    this.pool = pool;
  }
  async createVocab(
    list_id,
    word,
    translation,
    definition,
    part_of_speech,
    example_sentence,
    synonyms,
    antonyms,
    created_by,
    created_at
  ) {
    const query =
      "INSERT INTO vocab (list_id, word, translation, definition, part_of_speech, example_sentence, synonyms, antonyms, created_by, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const [result] = await this.pool.query(query, [
      list_id,
      word,
      translation,
      definition,
      part_of_speech,
      example_sentence,
      synonyms,
      antonyms,
      created_by,
      created_at,
    ]);
    return this.getVocabById(result.insertId);
  }
  async getVocabById(id) {
    const query = "SELECT * FROM vocab WHERE id =?";
    const [rows] = await this.pool.query(query, [id]);
    return rows[0];
  }
  async getVocabsByListId(list_id) {
    const query = "SELECT * FROM vocab WHERE list_id =?";
    const [rows] = await this.pool.query(query, [list_id]);
    return rows;
  }
  async updateVocab(
    id,
    word,
    translation,
    definition,
    part_of_speech,
    example_sentence,
    synonyms,
    antonyms
  ) {
    const query =
      "UPDATE vocab SET word =?, translation =?, definition =?, part_of_speech =?, example_sentence =?, synonyms =?, antonyms =? WHERE id =?";
    await this.pool.query(query, [
      word,
      translation,
      definition,
      part_of_speech,
      example_sentence,
      synonyms,
      antonyms,
      id,
    ]);
    return await this.getVocabById(id);
  }
  async deleteVocab(id) {
    const query = "DELETE FROM vocab WHERE id =?";
    await this.pool.query(query, [id]);
    return { message: "Vocabulary deleted successfully" };
  }
  async searchVocab(id, q) {
    const query = `
            SELECT * FROM vocab 
            WHERE (word LIKE ? 
            OR translation LIKE ? 
            OR id LIKE ? 
            OR definition LIKE ? 
            OR part_of_speech LIKE ? 
            OR example_sentence LIKE ? 
            OR synonyms LIKE ? 
            OR antonyms LIKE ?) 
            AND list_id = ?`;

    const searchPattern = `%${q}%`;
    const [rows] = await this.pool.query(query, [
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      searchPattern,
      id,
    ]);

    return rows;
  }
  async sortVocabsBy(id, column, order) {
    const query = `
            SELECT * FROM vocab 
            WHERE list_id =? 
            ORDER BY ${column} ${order}`;
    const [rows] = await this.pool.query(query, [id]);
    return rows;
  }
}
module.exports = Vocab;
