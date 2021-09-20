var YOUTUBE_API_KEY = "AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM";
var youTubeSearchTerm = "";
var oldSearchesKeywords = [];
var submitButton = document.querySelector("#submit-search");
var activitySelection = document.querySelector("#activity-type-select");
var recommendedActivity = document.querySelector("#recommended-activity");
var YTVideo = document.querySelector("#YT-Video");

// for Materalize/CSS styling
window.addEventListener("load", function () {
  M.AutoInit();
});

// event listener for Submit button
submitButton.addEventListener("click", activitySearch);

// gets user's choice from dropdown and passes through to getActivity function
function activitySearch() {
  var userInput = activitySelection.value;
  console.log(userInput);
  getActivity(userInput);
}

// will run after the user chooses a type of activity and hits search/submit.
function getActivity(userInput) {
  console.log(userInput);

  // clears previous YouTube video
  YTVideo.innerHTML="";

  // adds the type of activity to the url to narrow down the selection of randomly chosen activities
  var boredurl = "http://www.boredapi.com/api/activity?type=" + userInput;

  // fetches a set of data and brings it back (as "data") from the Bored API. The randomly generated activity is "data.activity"
  fetch(boredurl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.activity);

      youTubeSearchTerm = data.activity;

      // displays text of generated activity recommendation
      recommendedActivity.textContent = youTubeSearchTerm;

      // will pass the randomly generated activity on into our next function, which will get the YouTube video
      getVideo(youTubeSearchTerm);

      if (youTubeSearchTerm) {
        console.log(youTubeSearchTerm);
        // takes search term and puts it in an array we can stash into local storage
        oldSearchesKeywords.push(youTubeSearchTerm);
        // puts past searches into local storage. still need to write different function to get it out. I don't know if this will work.
        localStorage.setItem(
          "oldSearches",
          JSON.stringify(oldSearchesKeywords)
        );
      }
    });
}
// This is the function that will get the YouTube video
function getVideo(youtTubeSearchTerm) {
  console.log(youTubeSearchTerm);
  // makes the randomly generated activity from the previous function the text for a YouTube search. "maxResults=1" means it's selecting the first ranked video in response to our search terms.
  var youTubeurl =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
    "How to " +
    youtTubeSearchTerm +
    "&key=" +
    YOUTUBE_API_KEY;

  // fetches a set of data from the parameters of "How to [whatever the recommended activity was]"
  fetch(youTubeurl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // following line should log the ID of the first video found by the search, which we'll need to embed it in the html.
      console.log(data.items[0].id.videoId);

      // creates iframe player and embeds video to HTML
      var videoDisplay = document.createElement("iframe");
      videoDisplay.setAttribute(
        "src",
        "https://www.youtube.com/embed/" + data.items[0].id.videoId
      );
      videoDisplay.setAttribute("height", 340);
      videoDisplay.setAttribute("width", 560);
      YTVideo.append(videoDisplay);
    });
}

// Everything below here is not code for the project, just for instruction and reference.

// generated for task-mp3: "AIzaSyD20DXa9mrzyZxfJD16pNU5G455s598pvY"

// the most recent one I generated on task-seeker:    AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM

// "AIzaSyA8vlF8g2afZUNNSEftj5xUtcpUwNg5uR8";

// https://developers.google.com/youtube/v3/

// https://developers.google.com/youtube/v3/docs/search/list

// https://developers.google.com/youtube/iframe_api_reference

// https://electrictoolbox.com/jquery-set-multiple-attributes/
