// YouTube has a daily quota on how many times we can use its API with this key, so only test the getVideo function when necessary. I've been commenting this key out mostly when testing.
var YOUTUBE_API_KEY = "AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM";
//backup YouTube API key: "AIzaSyD20DXa9mrzyZxfJD16pNU5G455s598pvY";

var youTubeSearchTerm = "";

// this is kind of a shorthand for a conditional: if on page load there is anything in local storage attached to the key "oldSearches", then it will retrieve objects from that array and put the old searches on the page. Else it will be an empty array that the user will fill by searching.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
var oldSearchesKeywords = localStorage.oldSearches
  ? JSON.parse(localStorage.oldSearches)
  : [];

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

// hides "Clear activities" button if localstorage is empty
clearSearchBtn.style.display = "none";

submitButton.addEventListener("click", activitySearch);

// gets user's choice from dropdown select and passes through to getActivity function
function activitySearch() {
  var userInput = activitySelection.value;
  console.log(userInput);

  // prevents user from hitting submit without selecting type of activity
  if (userInput === "stop") {
    console.log(userInput);
    return;
  } else if (userInput != "stop") {
    getActivity(userInput);
  }
}

function getActivity(userInput) {
  console.log(userInput);

  // clears previous YouTube video if it's there
  YTVideo.innerHTML = "";

  // adds the type of activity chosen by the user to the parameters of the query we send to the API, narrowing down the selection of randomly chosen activities
  var boredurl = "http://www.boredapi.com/api/activity?type=" + userInput;

  // fetches a set of data and brings it back (as the array "data") using the Bored API. The randomly generated activity, which is the object we want, is "data.activity"
  // re: the => https://stackoverflow.com/questions/24900875/whats-the-meaning-of-an-arrow-formed-from-equals-greater-than-in-javas
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

        if (localStorage.oldSearches.length > 1) {
          displaySearches();
          clearSearchBtn.style.display = "flex";
        }
      }
    });
}

// This is the function that will get the YouTube video
function getVideo(youTubeSearchTerm) {
  console.log(youTubeSearchTerm);

  // displays text of generated activity recommendation
  recommendedActivity.textContent =
    "Here's something you can do: " + youTubeSearchTerm;

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
  }
};

// takes past searches from array in localstorage and displays them on page as buttons
function displaySearches() {
  pastActivities.empty();

  clearSearchBtn.style.display = "flex";

  tryAgainH3.textContent = "Or try one of these activities again!";
  var oldSearches = JSON.parse(localStorage.oldSearches);
  for (let i = 0; i < oldSearches.length; i++) {
    var oldSearch = oldSearches[i];
    var displaySearches = document.createElement("button");
    displaySearches.setAttribute("id", oldSearch);
    displaySearches.textContent = oldSearch;
    displaySearches.setAttribute("class", "waves-effect waves-light btn-small");
    pastActivities.append("<br>");
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
  if (localStorage.oldSearches.length > 1) {
    displaySearches();
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
