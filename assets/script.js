var YOUTUBE_API_KEY = "AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM";
var youTubeSearchTerm = "";
var oldSearchesKeywords = [];

window.addEventListener('load', function() {
  M.AutoInit();
})
// will run after the user chooses a type of activity and hits search/submit. will need a button event listener to call it.
function getActivity() {
  // This will be the variable that gets the value of whatever the user selects as the type of activity they want. Eventually we will need an event listener or an event.target.getAttribute to get the value of the user's choice and use it to define this variable.
  var userInput = "recreational";

  // adds the type of activity to the url to narrow down the selection of randomly chosen activities
  var boredurl = "http://www.boredapi.com/api/activity?type=" + userInput;

  // fetches a set of data and brings it back (as "data") from the Bored API. The randomly generated activity is "data.activity"
  fetch(boredurl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.activity);

      youTubeSearchTerm = data.activity;
      // will pass the randomly generated activity on into our next function, which will get the YouTube video
      
      // getVideo(youTubeSearchTerm);

      // Trying to get past search terms into local storage, but none of this is working.
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
    YOUTUBE_API_KE;

  // fetches a set of data from the parameters of "How to [whatever the recommended activity was]"
  fetch(youTubeurl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // following line should log the ID of the first video found by the search, which we'll need to embed it in the html.
      console.log(data.items[0].id.videoId);

      // This is the url I think we'll need to eventually use to embed our videos on the page: https://www.youtube.com/embed/${data.items[0].id.videoId}
    });
}

getActivity();

// Everything below here is not code for the project, just for instruction and reference.

// generated for task-mp3: "AIzaSyD20DXa9mrzyZxfJD16pNU5G455s598pvY"

// the most recent one I generated on task-seeker:    AIzaSyD_uBzuA9_xBhHQPUXnwD9z8FXwcGsPOnM

// "AIzaSyA8vlF8g2afZUNNSEftj5xUtcpUwNg5uR8";
