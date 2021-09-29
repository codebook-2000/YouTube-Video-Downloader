"use strict";

const host = "http://localhost:3000/";

let getVideoInfobtn = document.querySelector("#get-video-info-btn");

getVideoInfobtn.addEventListener("click", function () {
  let videoURL = document.querySelector("#videoURL").value.trim();

  if (videoURL.length === 0) {
    alert("Please enter proper youtube video link!");
    return;
  }
  fetch(host + "videoInfo?videoURL=" + videoURL)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      let detailNodes = {
        thumbnail: document.querySelector(".video-data .thumbnail img"),
        title: document.querySelector(".video-data .info h2"),
        description: document.querySelector(".video-data .info p"),
        video_URL: document.querySelector(".video-data .controls #video-url"),
        downloadOptions: document.querySelector(
          ".video-data .controls #download-options"
        ),
      };
      let html = "";
      for (let i = 0; i < data.formats.length; i++) {
        if (data.formats[i].container != "mp4") continue;
        if (data.formats[i].qualityLabel == null) continue;
        if (data.formats[i].audioCodec == null) continue;

        html =
          html +
          `
        <option value="${data.formats[i].itag}">${data.formats[i].container} - ${data.formats[i].qualityLabel}</option>
        `;
      }
      detailNodes.thumbnail.src =
        data.videoDetails.thumbnails[
          data.videoDetails.thumbnails.length - 1
        ].url; //For getting the maximum resolution thumbnail image

      detailNodes.title.innerText = data.videoDetails.title;
      detailNodes.description.innerText = data.videoDetails.description;
      detailNodes.video_URL.value = videoURL;
      detailNodes.downloadOptions.innerHTML = html;

      document.querySelector(".video-data").style.display = "block";
      document.querySelector(".video-data").scrollIntoView({
        behavior: "smooth",
      });
    })
    .catch(function (error) {
      alert("Some error has occured!!!");
    });
});

document.querySelector("#download-btn").addEventListener("click", function () {
  let videoURL = document.querySelector("#video-url").value.trim();
  let itag = document.querySelector("#download-options").value;
  window.open(host + "download?videoURL=" + videoURL + "&itag=" + itag);
});
