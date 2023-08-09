const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
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

server.listen(80, main);

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

//이미지 합성 변수
const images = [
  './userImages/image1.jpg',
  './userImages/image2.jpg',
  './userImages/image3.jpg',
  './userImages/image4.jpg',
];
const outputPath = './output/outputImage.png';
const backgroundImagePath = './background/background1.png';

const { combineImages } = require('./image_frame');

function main() {
  //await collection.updateOne(QUERYDATA},{$set:{CHANGEDATA}})
  console.log('Server On');
  combineImages(images, outputPath, backgroundImagePath);
}
