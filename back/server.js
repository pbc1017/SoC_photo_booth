const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const mongoose = require('mongoose');
// const fs=require('fs')
// const prompt=require('prompt-sync')({singint:true});

// import * as roomRepository from './data/room.js';
// import * as userRepository from './data/users.js';

var app = express();
var server = require('http').createServer(app);
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

  const newRequest = new Request({
    requestType,
    requestTime: new Date(),
  });

  await newRequest.save();
  }

app.post('/api/login', async (req, res) => {
  try {
    console.log(req.body);
    await client.connect();
    userdata = client.db('User').collection('user');
    const result = await userdata.find(req.body).toArray();
    if (result.length > 0) {
      res.json(result[0]);
    } else res.json('false');
  } finally {
  }
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

server.listen(3000, main);

//DB CODE

const uri =
  'mongodb+srv://knsol2:1017@cluster0.ussb1gv.mongodb.net/?retryWrites=true&w=majority';
//api key E2kpU7xTXiQrNi6WEWE6p1gNFC6dCpd4ZcMEuWHgsn0NHyc86dB3pGVSSwWED7Uz

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

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
  //await collection.updateOne(QUERYDATA},{$set:{CHANGEDATA}})
  console.log('Server On');
  // combineImages(images, outputPath, backgroundImagePath);
}
