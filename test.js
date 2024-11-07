var express = require('express'); 
var app = express();

//요청 본문을 JSON 형식으로 req.body에 저장. 기본적으로는 텍스트 형식
app.use(express.json());

app.listen(3000, function(){
    console.log('Connected to 3000 port')
})

//threshold.js 에서 NOISE_THRESHOLD 가져오기
const {NOISE_THRESHOLD} = require('./threshold.js'); 
const {sendPushNotification} = require('./pushNotification.js');


//프론트에서 noiseLevel 받기
app.post('/notifications/alert', (req, res) => {
    //const { noiseLevel } = req.body;
    //임의로 값 설정
    const noiseLevel = 80;
    //기준에 따라 소음여부 판단
    if (noiseLevel >= NOISE_THRESHOLD){
        console.log('소음으로 판단되었습니다');
        sendPushNotification("소음 경고", "주위에서 소음이 발생했습니다");
        return res.status(200).json({ message: '알림이 전송되었습니다.' });
    }
    else{
        return res.status(200).json({ message: '소음 수치가 기준 이하입니다.' });
    }
});
