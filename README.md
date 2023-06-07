# omed5844-tracker
STEPS TO INSTALL APPLICATION 
1. Clone the GitHub Repository
    Within your terminal, paste the following code:
    git clone https://github.com/olgamedvedieva/omed5844-tracker.git

2. Install Node.js
    Install Node.js through their website here:https://nodejs.org/en ; this will also install NPM for you.

3. Install Dependencies
    Run the following command in the root directory of the cloned repository:
    npm install express

4. Start the Server
    Run the following command to start the server:
    npm run start

5. Open application
    Open your browser and input to the corresponding localhost URL (the port may differ)

PROCESS AND FUTURE

Overall, I had to adapt quite a bit during the process of creating this app - my main feedback from the prior assesment was that I might need to look into changing the format of the movie cards to resemble current conventions, which I had done (the title is now bigger and centered), but that was far from the only change. Unfortunately, due to the complexity of the API-based function, I wasn't able to get the mobile view to work as expected. Nor was I able to introduce an empty state with no movies added as I had intended to do so. However, other changes I implemented successfuly.

For one, the API ended working out a lot better than expected as a provider of poster images - this was in big part due to the documentation provided by TMDB and also chatGPT - for example I input "how do i use an api to import movie posters into my web application? I already have a key" into it and went from there. That being said, this was a very long process and involved a lot of trial and error, so the AI is far from perfect as evidenced by my commits. Nevertheless, in most cases the API will procure a functional poster, which is a big relief, as that is a big part of my app. The only big concern is whether it is able to verify the movie simply by name, as some films share the same name but have different releaseYears, etc. in the future maybe looking into a way to include other details while fetching the URL from the API could be beneficial for more clarity.

Elements such as the star ratings, modals and scroll to top buttons were implemented successfully thanks to online tutorials and also the information provided in the tutorials. The tutorials in particular were very helpful while developing the bulk of the main function, as I relied on them to add local storage functionality and also to maintain an updated movie list.

Overall, through this project I learned that it is definitely better to make distinct functions separately, as crosschecking the scope of all variables within one massive function was a complete nightmare. Also, using responsive units to begin with, such as vw, would help in making usable mobile interfaces. 

REFERENCES 
How to create interactive star ratings. (n.d.) Retrieved from https://buttered-thorium-f6a.notion.site/How-To-Create-Interactive-Star-Ratings-171c5514b58744c2b531dcb96cedd89b
Dcode. (2019). Create a "scroll to top" button with HTML, CSS & JavaScript | Web design tutorial for beginners [YouTube Video]. Retrieved from https://www.youtube.com/watch?v=FK5DEa1Hvco&t=1s
Pit, C. (2020). How to capitalize the first letter of each Word in JavaScript – a JS uppercase tutorial. Retrieved from https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
Ail, Vijit. (2020). JavaScript date now – How to get the rurrent date in JavaScript. Retrieved from https://www.freecodecamp.org/news/javascript-date-now-how-to-get-the-current-date-in-javascript/
W., J. (2022). How can I remove a specific item from an array?. Retrieved from https://sentry.io/answers/remove-specific-item-from-array/#:~:text=If%20you%20want%20to%20remove,to%20remove%20the%20first%20element.
TMDB. (n.d.) FAQ. Retrieved from https://developer.themoviedb.org/docs/faq
Javatpoint. (n.d.). How to check a radio button using JavaScript?. Retrieved from https://www.javatpoint.com/how-to-check-a-radio-button-using-javascript#:~:text=Get%20the%20value%20of%20selected%20radio%20button%3A%20querySelector()&text=Remember%20you%20need%20to%20specify,the%20group%20of%20radio%20buttons.
Web Dev Simplified Blog. (2023). Modals will never be the same - HTML dialog element. Retrived from https://blog.webdevsimplified.com/2023-04/html-dialog/
Prevent body from scrolling when opening a modal. (n.d.). Retrieved from https://htmldom.dev/prevent-body-from-scrolling-when-opening-a-modal/
ChatGPT. (n.d.). Retrieved from https://chat.openai.com/