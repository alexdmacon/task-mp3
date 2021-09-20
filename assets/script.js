// YouTube has a daily quota on how many times we can use its API with this key, so only test the getVideo function when necessary. I've been commenting it out off and on.
var YOUTUBE_API_KEY = "AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM";

// various selectors
var youTubeSearchTerm = "";
var oldSearchesKeywords = [];
var submitButton = document.querySelector("#submit-search");
var activitySelection = document.querySelector("#activity-type-select");
var recommendedActivity = document.querySelector("#recommended-activity");
var YTVideo = document.querySelector("#YT-Video");
var pastActivities = $("#past-activities");
var tryAgainH3 = document.querySelector("#try-again");
var clearSearchBtn = document.querySelector("#clear-searches-button");

// for Materalize/CSS styling
window.addEventListener("load", function () {
  M.AutoInit();
});

// event listener for Submit button
submitButton.addEventListener("click", activitySearch);

// gets user's choice from dropdown select and passes through to getActivity function
function activitySearch() {
  var userInput = activitySelection.value;
  console.log(userInput);
  getActivity(userInput);
}

// will run after the user chooses a type of activity and hits search/submit.
function getActivity(userInput) {
  console.log(userInput);

  // clears previous YouTube video if it's there
  YTVideo.innerHTML = "";

  // adds the type of activity to the url to narrow down the selection of randomly chosen activities
  var boredurl = "http://www.boredapi.com/api/activity?type=" + userInput;

  // fetches a set of data and brings it back (as the array "data") using the Bored API. The randomly generated activity, which is the object we want, is "data.activity"
  fetch(boredurl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.activity);

      youTubeSearchTerm = data.activity;

      // will pass the randomly generated activity on into our next function, which will get the YouTube video
      getVideo(youTubeSearchTerm);

      if (youTubeSearchTerm) {
        console.log(youTubeSearchTerm);
        // takes search term and puts it in an array we can stash into local storage
        oldSearchesKeywords.push(youTubeSearchTerm);
        // puts past searches into local storage.
        localStorage.setItem(
          "oldSearches",
          JSON.stringify(oldSearchesKeywords)
        );
        displaySearches();
      }
    });
}
// This is the function that will get the YouTube video
function getVideo(youTubeSearchTerm) {
  console.log(youTubeSearchTerm);

  // displays text of generated activity recommendation
  recommendedActivity.textContent = youTubeSearchTerm;

  // makes the randomly generated activity from the previous function the text for a YouTube search. "maxResults=1" means it's selecting the first ranked video in response to our search terms.
  var youTubeurl =
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" +
    "How to " +
    youTubeSearchTerm +
    "&key=" +
    YOUTUBE_API_KEY;

  // fetches a set of data from the parameters/YouTube search of "How to [whatever the recommended activity was]"
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

// if user has already used this app and has previous activities in localstorage, they will display on page load/refresh.
onload = function () {
  if (localStorage.oldSearches.length > 1) {
    displaySearches();

    // creates button that will clear old searches when clicked
    var clearSearches = document.createElement("button");
    clearSearches.textContent = "Clear Past Activities";
    clearSearchBtn.append(clearSearches);
  }
};

// takes past searches from array in localstorage and displays them on page as buttons
function displaySearches() {
  pastActivities.empty();
  tryAgainH3.textContent = "Or try one of these activities again!";
  var oldSearches = JSON.parse(localStorage.oldSearches);
  for (let i = 0; i < oldSearches.length; i++) {
    var oldSearch = oldSearches[i];
    var displaySearches = document.createElement("button");
    displaySearches.setAttribute("id", oldSearch);
    displaySearches.textContent = oldSearch;
    pastActivities.append(displaySearches);

    // gives each button in our past search/activity history an event listener
    displaySearches.addEventListener("click", getPastSearch);
  }
}

// takes text content of whatever button is clicked and passes it as a parameter/search term for our getVideo function.
function getPastSearch(event) {
  var youTubeSearchTerm = event.target.textContent;
  console.log(youTubeSearchTerm);

  if (youTubeSearchTerm) {
    YTVideo.innerHTML = "";
    getVideo(youTubeSearchTerm);
  }
}

// clears past searches and localstorage
clearSearchBtn.addEventListener("click", clearSearchHistory);

function clearSearchHistory() {
  pastActivities.empty();
  tryAgainH3.textContent = "";
  localStorage.clear();
  clearSearchBtn.style.display = "none";
}

// Everything below here is not code for the project, just for instruction and reference.

// first API Key generated for task-mp3: "AIzaSyD20DXa9mrzyZxfJD16pNU5G455s598pvY"

// the most recent API Key I generated on task-seeker:    AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM

// https://developers.google.com/youtube/v3/

// https://developers.google.com/youtube/v3/docs/search/list

// https://developers.google.com/youtube/iframe_api_reference

// https://electrictoolbox.com/jquery-set-multiple-attributes/

// https://stackoverflow.com/questions/35975030/button-group-click-handler-how-to-get-text-content-of-clicked-button
