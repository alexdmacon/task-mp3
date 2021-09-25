# task-mp4

# Summary:
For this group assignment, we were asked to create a project that solves a real-world problem. We divided up our duties while still working as a team. In the end, our skills came together to create something useful.

This was the user story that guided us: 
- "As a bored person,
- I want a task or activity to do and a video that will show me how to do it,
- So that I won’t be bored anymore."

To solve that bored person's problem, we created Task.mp4. Our app first asks the user for a type of activity they might be interested in doing. Are they interested in cooking or in music? Doing something social or something creative? Based on the user's choice, Task.mp4 will then recommend a suitable task (using the Bored API) and generate a YouTube video (using the YouTube API) that shows the user how to get started doing that task. The app also stores past activities so the user can again retrieve that information.

With Task.mp4, no one ever has to be bored again.

The final result: https://alexdmacon.github.io/task-mp3/ 

Our project meets these criteria:

* Use a CSS framework other than Bootstrap

* Has to be interactive 

* Use at least two server side API's 

* Does not use alerts, confirms, or promts 

* Use client side storage to store persistent data 

* Be responsive 

* Have a polished UI

* Have a clean repository that meets quality coding standards

* Have a quality ReadMe and be deployedto GitHub Pages

![Gif of the app in action](/assets/images/Task.mp4.gif)

# Usage
From the dropdown, select what type of activity you're in the mood for and hit "submit." Task.mp4 will recommend a corresponding activity and generate an embedded YouTube video with more details on how to go about doing that activity. You can ask for as many activity recommendations as you'd like. Select a past activity from the generated buttons to retrieve a previously generated YouTube video and task recommendation.

# How We Came Up With This
For our assignment, we were asked to use two different APIss that went along with each other in order to create a full functioning appplication that a user can use. 

As a group, we began to brainstorm many differnet ideas that would not only be fun, but actually useful in a real life situation. Some of the ideas included:

- A Crime Database: A way to look up crime in your area.

- Songs and Movies: Look up a particular song and you'll have a list of movies that that particular song has appeared in. 

    - Even more movie ideas: Look up a movie and you will be presented with a trailer (This sounded very similar to what IMDB does so that idea was vetoed faster than all the other ones)

- Songs and The Weather: Bring up song ideas that was based on the weather, for example if its a rainy day, then the app will play "sad" music. 

And then finally, after awhile of brainstorming some cool and crazy ideas, we came up with this super cool, interactive app that will take the user through a quiz that will give them a task to do, along with a playlist to do that task with. 
    - for example: "As the user, I want to do something productive! (like read or work on homework), our app would provide a "chill beats" playlist that the user can listen to while doing this task.

A super cool idea that we all agreed on!

After getting a solid idea of what we wanted to do, we came up with a rough sketch/wireframe that provided a basic outline of what our website is going to look like. 

<!-- We can insert the rough sketch here if y'all want -->
![Wireframe of the app](/assets/images/wireframe.png)

 From there, it seemed like we had a good place to start... 


# Got a cool project name?
Coming up with a super cool name for our project was our next task in mind after spending awhile with the brainstorming of project ideas, since our project had something to do with music, we wanted the title to have something "music related" in it, so we got names like:
- Do a task and get a song
- Soundtrack ____________ or whatever
Turns out, we weren't that creative with names, but in the end, we came up with a unique name that described our project's purpose. We came up with "Task.mp3"!


# A Change in Idea:
When starting to work on the project, we encountered a small problem with the Spotify music API that we were originally going to use, unfortunately, the API required a lot more work and authorizing in order for a playlist to actually be displayed, so we scrapped the idea and moved on to our next idea:
Instead of having a playlist being put out after the user takes the quiz, why not provide an actual video on how to do a certain task?

    - For example: The user wants to do something that "gets them out there", the app will provide a video on how to go Thift Shopping! 

And instead of having a quiz that the user has to go through, we narrowed it down to having one dropdown that will have a genre of differnt kinds of activities, for example: productive, relaxing, creative, etc. Then from there, the user will pick the type of activity and the app will provide a video to go along with that kind of task.

Okay, we have a super cool name that took us ages to come up with, now what? Since the team was very attatched to the name "Task.mp3" we figured it needed just a small change to it, so we came up with the even more creative name "Task.mp4"! 


# Getting started: 

* Working on the HTML: With working with the HTML, we based our structure on the sketch that we made for our project, the structure had to include:
    - A header with the title, a container where our dropdown menu and our submit button would be, a place where our YouTube video will be after the user picks an activity type, and a place where the past searches can be placed and of course, a footer where a creative group name will be placed.

    - While working on the project, the HTML had to be modified several times in order for it to start working with the JavaScript as well as the CSS. The ID's of the options listed for the dropdown were changed throughout working on the project in order to get everything working properly. 

* Working with the CSS: Using materialize to fine-tune the appearance of this app involved studying a lot of the documentation and implementing a variety of specific class names to induce certain properties. The largest obstacle in regards to using materialize involved a specific initiation function that had to be included in our main javascript file to prevent element overlapping.

* Working with the JavaScript: Using Fetch, we first wrote two functions that would retrieve data from the YouTube API and Bored API, respectively. We wanted to take the user input ("type of activity") chosen from the HTML dropdown to adjust our query to the Bored API, which contains a database of activities sorted by type and other parameters. We then pass the selected activity (preceded by "How to," which we found returned more relevant results) as a parameter in our query to the YouTube API, selecting the top YouTube search result for "How to (selected activity)."

    - We then use jQuery and JavaScript selectors to create or change DOM elements that will populate our app with both the text of that generated activity and the corresponding YouTube video that will show the user how they might go about doing that generated activity.

    - Using a for loop, we store each generated activity in an array in localStorage. Another function retrieves the objects from the array and displays them as buttons on the page, so that the user can return to a previously generated activity with its matching YouTube video, even after refreshing or closing and returning to the app.

    - Conditional statements help determine whether certain methods will run, including those that determine whether anything is saved in the user's localStorage.


![Image of the app](/assets/images/taskmp4.png)

# Final Thoughts:


## Credits
Thanks to our SMU coding boot camp cohort, and to our TAs.

Here are also a few of the links that proved useful in developing this app:
- https://www.boredapi.com/documentation
- https://developers.google.com/youtube/v3
- https://materializecss.com/
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
- https://stackoverflow.com/questions/24900875/whats-the-meaning-of-an-arrow-formed-from-equals-greater-than-in-javas
- https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_hover
- https://stackoverflow.com/questions/11315416/how-do-i-get-a-random-youtube-video-with-the-youtube-api
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
- https://stackoverflow.com/questions/3138564/looping-through-localstorage-in-html5-and-javascript
- https://www.youtube.com/watch?v=TE66McLMMEw&t=406s
- https://rapidapi.com/hub
- https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem
