// requireでexpressモジュールを読み込む
const express = require('express');

// mysql2を読み込む
const mysql = require('mysql2');

// expressモジュールを実体化して、定数appに代入
const app = express();

// ポート番号を指定
const port = 3001;

// mysqlと接続するための設定
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '??',
    database: 'todo_db'
})

// '/'パスにGET要求あった際に実行する処理
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// '/api'パスにGET要求がった場合に実行
app.get('/api', (req, res) => {
    // /apiにアクセスした際に、MySQLに対して行う処理
    connection.query(
        // usersテーブルからデータを取得する処理
        'SELECT * FROM todo',
        function(err, results, fields) {
            if (err) {
                console.log('接続エラー');
                console.log(err);
                throw err;
            }
            try {
                console.log("try id:" + results[0].id);
                res.json({ message: results[0] });
            } catch (err) {
                console.error(err);
            }
        }
    );
});

// 3001ポートでlisten
app.listen(port, () => {
    console.log(`listening on *:${port}`);
});
