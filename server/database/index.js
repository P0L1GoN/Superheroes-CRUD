const sqlite =require('sqlite3')

let db = new sqlite.Database('./heroes.db',err=>{ //Подключение к бд
    if(err)
        return console.error(err.message)
    console.log('Connected to SQlite DB')
})

db.serialize(()=> {
    //Таблица героев
    db.run(`CREATE TABLE IF NOT EXISTS Heroes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nickname TEXT,
        realName TEXT,
        originDescription TEXT,
        superpowers TEXT,
        catchPhrase TEXT)`)
    //Таблица картин героев
    db.run(`CREATE TABLE IF NOT EXISTS Heroes_Images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        hero_id INTEGER,
        image TEXT,
        FOREIGN KEY (hero_id) REFERENCES Heroes(id)
    )`)
});

module.exports=db