import sqlite3 from 'better-sqlite3'

const db = new sqlite3('searches.sqlite')



// db.prepare(`DROP TABLE IF EXISTS search;`).run()
// db.prepare(`
//   CREATE TABLE IF NOT EXISTS search (
//     id INTEGER PRIMARY KEY AUTOINCREMENT,
//     username VARCHAR NOT NULL,
//     tag VARCHAR(5) NOT NULL
//   );
// `).run()

// db.prepare(`
//   INSERT INTO search(username, tag)
//   VALUES ('rokusho', 'kana');
// `).run()