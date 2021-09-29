"use strict";

//const { request, response } = require("express");
const express = require("express"); //Imports the express module and stores in variable express
const ytdl = require("ytdl-core");
const cors = require("cors");

const app = express(); //Creates a server with the express functionalities and storing it in app

app.use(cors()); //Enabling cors() for all routes

app.use(express.json()); //Helps in converting the HTTP requests in JSON format and putting it into effect by   using app.use

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo", async function (req, res) {
  const videoURL = req.query.videoURL;
  const info = await ytdl.getInfo(videoURL);

  res.status(200).json(info);
});

app.get("/download", function (req, res) {
  const videoURL = req.query.videoURL;
  const itag = req.query.itag;

  res.set("Content-Disposition", 'attachment ; filename="YoutubeVideo.mp4"');

  //res.header("Content-Disposition", 'attachment; filename = "video.mp4"');

  ytdl(videoURL, { filter: (format) => format.itag == itag }).pipe(res); //we pass the object "format" inside the filter function.That "format" object will check each format one at a time and it would return true or false according to the condition.
});

app.listen(3000, function (err) {
  if (err) console.log("There is error in Server setup");
  else console.log(`Server listening at port 3000`);
});
