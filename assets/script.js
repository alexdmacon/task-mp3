var YOUTUBE_API_KEY = "AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM";

// generated for task-mp3: "AIzaSyD20DXa9mrzyZxfJD16pNU5G455s598pvY"

// the most recent one I generated on task-seeker:    AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM

// "AIzaSyA8vlF8g2afZUNNSEftj5xUtcpUwNg5uR8";

// URLS all relative to https://www.googleapis.com/youtube/v3

// how to: https://developers.google.com/youtube/v3/docs/search/list#usage

var youTubeSearchTerm = "";

 var youTubeurl =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=" +
  "How to" +
  youtTubeSearchTerm +
  "&key=" +
  YOUTUBE_API_KEY;

fetch(youTubeurl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

var userInput="recreational";

var boredurl = "http://www.boredapi.com/api/activity?type="
  + userInput;

fetch(boredurl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(data.activity);

    youTubeSearchTerm = data.activity;

    getVideo(youTubeSearchTerm);
  });

/* const searchTerms = [
  "factory%20functions",
  "data%20structures",
  "array%20functions%20javascript",
  "composition%20over%20inheritance",
  "lambda%20functions",
  "streams%20java",
  "higher%20order%functions%javascript",
  "functional%20programming",
  "c++%20lambda%20functions",
  "sorting%20algorithms",
];
const getSearchTerm = () =>

  searchTerms[Math.floor(Math.random() * (searchTerms.length - 1))];

const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=
${getSearchTerm()}
&key=${YOUTUBE_API_KEY}`;

console.log(url);

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.items[0].id.videoId);
    document.querySelector(
      ".youtubeVideo"
    ).src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
  });


 */
/* 
  <section id="skills" class="site-wrap" tabindex="2">
  <div class="write-section">
    <h4 class="">Random Programming Video</h4>
      <div class="write-container">
        <iframe width="100%" height="600px" class="youtubeVideo">
      </iframe>
      </div>
   </div>
</section> */
