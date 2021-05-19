const express = require('express');
const app = express()
const port = 3000
const bodyparser = require('body-parser');

const config = require('./config/key');
const {User} = require("./models/User");


//바디파서는 클라이언트에서 보내온 정보를 서버에서 분석 
app.use(bodyparser.urlencoded({extended:true}));
//json 형태로 보내온 정보를 분석
app.use(bodyparser.json());


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI,{
    useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
}).then(()=> console.log('연결됨'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!'+ "개졸립네에에")
})

app.post('/register',(req,res) => {
    //회원가입할때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다
     const user = new User(req.body)
     
     
     user.save((err,userInfo) => {
         if(err) return res.json({success: false, err})
         return res.status(200).json({
             success:true
         })
     })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})