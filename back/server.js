const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const http = require('http');
const https = require('https'); // HTTPS 를 위한 라이브러리 추가
const fs = require('fs'); 

var app = express();
const frontBuildPath = path.join(__dirname, '../front/build');
app.set('trust proxy', true);  // Express가 프록시 뒤에서 실행될 때 필요

app.use((req, res, next) => {
    if (!req.secure) {
        // HTTP 요청만 리다이렉트
        return res.redirect(301, `https://${req.get('Host')}${req.url}`);
    }
    next();
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(frontBuildPath));
app.set('trust proxy', true);  // Express가 프록시 뒤에서 실행될 때 필요

const options = {
  key: fs.readFileSync('./rootca.key'),
  cert: fs.readFileSync('./rootca.crt')
};

// 원래의 HTTP 서버 생성
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
  console.log("HTTP Server running on port 80");
});

// 새로운 HTTPS 서버 생성
const httpsServer = https.createServer(options, app);
httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
});

mongoose.connect('mongodb+srv://user:1234@cluster0.z1goqxn.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // 옵션 추가
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Create schema for request model
const requestSchema = new mongoose.Schema({
  requestType: {
    type: String,
    enum: ['photo', 'print'],
    required: true,
  },
  requestTime: {
    type: Date,
    required: true,
  },
});

const countSchema = new mongoose.Schema({
  requestType: {
    type: String,
    enum: ['photo', 'print'],
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
});

const Request = mongoose.model('Request', requestSchema);
const Count = mongoose.model('Count', countSchema);

async function getCurrentCount(requestType) {
  const currentCount = await Count.findOne({ requestType });

  // count가 없으면 새로 만들어줌
  if (!currentCount) {
    const newCount = new Count({
      requestType,
      count: 0,
    });

    await newCount.save();
    return newCount;
  }
  return currentCount;
}

async function addRequest(requestType) {
  const currentCount = await getCurrentCount(requestType);
  currentCount.count += 1;
  await currentCount.save();
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 9); // UTC 기준에서 9시간 추가 (한국은 UTC+9)
  const newRequest = new Request({
    requestType,
    requestTime: currentDate,
  });

  await newRequest.save();
}

// 루트 경로에 대한 GET 요청 처리
app.get('/', function (req, res) {
  res.sendFile(path.join(frontBuildPath, 'index.html'));
});

app.get('/.well-known/pki-validation/E9B295FE981D0935321859051BE60789.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'E9B295FE981D0935321859051BE60789.txt'));
});

// POST /api/photo
app.post('/api/photo', async (req, res) => {
  await addRequest('photo');
  res.sendStatus(200);
});

//GET /api/photo
app.get('/api/photo', async (req, res) => {
  const currentStats = await getCurrentCount('photo');
  res.json({ photoRequestCount: currentStats.count });
})

//POST /api/print
app.post('/api/print', async (req, res) => {
  await addRequest('print');
  res.sendStatus(200);
});

//GET /api/print
app.get('/api/print', async (req, res) => {
  const currentStats = await getCurrentCount('print');
  res.json({ printRequestCount: currentStats.count });
});

app.get('*', function (req, res) {
  res.sendFile(path.join(frontBuildPath, 'index.html'));
});

// server.listen(80, main);

//DB CODE

// const uri = 'mongodb+srv://knsol2:1017@cluster0.ussb1gv.mongodb.net/?retryWrites=true&w=majority';
//api key E2kpU7xTXiQrNi6WEWE6p1gNFC6dCpd4ZcMEuWHgsn0NHyc86dB3pGVSSwWED7Uz

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// //이미지 합성 변수
// const images = [
//   './userImages/image1.jpg',
//   './userImages/image2.jpg',
//   './userImages/image3.jpg',
//   './userImages/image4.jpg',
// ];
// const outputPath = './output/outputImage.png';
// const backgroundImagePath = './background/background1.png';

// const { combineImages } = require('./image_frame');

function main() {
  console.log('Server On');
}
