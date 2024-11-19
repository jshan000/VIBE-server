var express = require('express'); 
const bodyParser = require("body-parser");
const router = express.Router();

//AWS RDS MySQL 연결 설정

const db = require('.aws_connect.js');
router.use(bodyParser.json());

// POST 요청으로 카테고리와 데이터 받기, (/front 자리에 프론트 파일)
router.post('/front', async (req, res) => {
  const { category, data } = req.body;

  let query = "";
  let params = [];
  try{
    switch(category){
      case "중고거래 사기":
        query = "INSERT INTO scams (which, when_and_where, price, problem, opposite, evidence) VALUES (?, ?, ?, ?, ?, ?)";
        params = [data.which, data.when_and_where, data.price, data.problem, data.opposite, data.evidence];
        break;

      case "온라인 욕설":
        query =  "INSERT INTO online_abuse (platform, when, how, opposite, evidence) VALUES (?, ?, ?, ?, ?)";
        params = [data.platform, data.when, data.how, data.opposite, data.evidence];
        break;
      
      case "성희롱/성추행":
        query = "INSERT INTO harassment (when_and_where, how, opposite, response, problem) VALUES (?, ?, ?, ?, ?)";
        params = [data.when_and_where, data.how, data.opposite, data.response, data.problem];
        break;
      
      case "폭행/상해":
        query = "INSERT INTO violence (when_and_where, how, opposite, damage, witness) VALUES (?, ?, ?, ?, ?)";
        params = [data.when_and_where, data.how, data.opposite, data.damage, data.witness];
        break;
      
      default: 
        return res.status(400).json({error: "Unknown category"});
    }
      
    // 데이터베이스 쿼리 실행
      const [results] = await db.query(query, params);
      res.status(200).json({
        message: "Data saved successfully",
        id: results.insertId, 
      });
    } catch (err) {
    console.error("Error saving data: ", err);
    res.status(500).json({ error: "Failed to save data" });
  }
});

module.exports = router;