// AWS RDS MySQL 연결 설정
var mysql = require('mysql2');

var db = mysql.createPool({
  host: process.env.DB_HOST, // AWS RDS 엔드포인트
  port: process.env.DB_PORT, // 포트
  user: process.env.DB_USER, // RDS 사용자 이름
  password: process.env.DB_PASSWORD, // RDS 비밀번호
  database: process.env.DB_NAME // 데이터베이스 이름
});

db.query = db.promise().query;

module.exports = db;