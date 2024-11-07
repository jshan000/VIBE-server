var express = require('express'); 
const router = express.Router();

//threshold.js 에서 NOISE_THRESHOLD 가져오기
const {NOISE_THRESHOLD} = require('./threshold.js'); 
const {sendPushNotification} = require('./pushNotification.js');

//임의로 값 설정
const noiseLevel = 80;

//프론트에서 noiseLevel 받기
app.post('/notifications/alert', (req, res) => {
    //const { noiseLevel } = req.body;

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
module.exports = router;  // app 객체를 모듈로 내보냄
