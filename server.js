var express = require('express'); 
var app = express();

//요청 본문을 JSON 형식으로 req.body에 저장. 기본적으로는 텍스트 형식
app.use(express.json());

//얘 수정
const routeDatatoDB = require('./routeDatatoDB.js');
app.use(routeDatatoDB);

app.listen(3000, function(){
    console.log('Connected to 3000 port')
})