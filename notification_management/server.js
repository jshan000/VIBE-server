var express = require('express'); 
var app = express();

//요청 본문을 JSON 형식으로 req.body에 저장. 기본적으로는 텍스트 형식
app.use(express.json());

// notificationController.js를 라우터로 사용. 
// 모든 요청에서 notificationController의 라우트를 사용하도록 설정
const notificationController = require('./notificationController.js');
app.use(notificationController);

app.listen(3000, function(){
    console.log('Connected to 3000 port')
})
