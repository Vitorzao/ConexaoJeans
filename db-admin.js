/**
 * db-admin.js — Utilitário de administração do banco de dados
 *
 * Uso:
 *   node db-admin.js list      → lista todos os usuários
 *   node db-admin.js clear     → apaga todos os usuários
 *   node db-admin.js reset     → apaga e recria a tabela
 */
 
const Database = require('better-sqlite3');
const path = require('path');
 
const db = new Database(path.join(__dirname, 'database.db'));
 
const command = process.argv[2];
 
if (command === 'list') {
    const users = db.prepare('SELECT id, firstName, lastName, email, username, created_at FROM users').all();
    if (users.length === 0) {
        console.log('Nenhum usuário cadastrado.');
    } else {
        console.table(users);
    }
 
} else if (command === 'clear') {
    db.prepare('DELETE FROM users').run();
    console.log('Todos os usuários foram removidos.');
 
} else if (command === 'reset') {
    db.exec('DROP TABLE IF EXISTS users');
    db.exec(`
        CREATE TABLE users (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName   TEXT    NOT NULL,
            lastName    TEXT    NOT NULL,
            email       TEXT    NOT NULL UNIQUE,
            cpf         TEXT    NOT NULL UNIQUE,
            username    TEXT    NOT NULL UNIQUE,
            password    TEXT    NOT NULL,
            created_at  TEXT    DEFAULT (datetime('now','localtime'))
        )
    `);
    console.log('Tabela recriada com sucesso.');
 
} else {
    console.log('Comandos disponíveis:');
    console.log('  node db-admin.js list    → listar usuários');
    console.log('  node db-admin.js clear   → apagar todos os usuários');
    console.log('  node db-admin.js reset   → recriar a tabela');
}
 
db.close();