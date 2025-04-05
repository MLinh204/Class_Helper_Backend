const pool = require('../config/db');

class Role{
    constructor(){
        this.pool = pool;
    }
    async getRoles(){
        const query = 'SELECT * FROM roles';
        const [rows] = await this.pool.query(query);
        return rows;
    }
    async getRoleById(id){
        const query = 'SELECT * FROM roles WHERE id =?';
        const [rows] = await this.pool.query(query, [id]);
        return rows[0];
    }
    async getRoleByName(name){
        const query = 'SELECT * FROM roles WHERE name =?';
        const [rows] = await this.pool.query(query, [name]);
        return rows[0];
    }
}

module.exports = Role;