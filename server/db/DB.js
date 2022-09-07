const sqlite3 = require('sqlite3').verbose();
const { resolve } = require('path');
const path = require('path');

class DB {
    constructor({ NAME }) {
        this.db = new sqlite3.Database(path.join(__dirname, NAME));
    }

    destructor() {
        if (this.db) this.db.close();
    }

    getAllFromTable(query) {
        return new Promise((resolve, reject) => {
            this.db.all(query, (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getCondidateInfo() {
        return this.getAllFromTable('SELECT * FROM condidate_info');
    }

    getSlogans() {
        return this.getAllFromTable('SELECT * FROM slogans');
    }

}

module.exports = DB;