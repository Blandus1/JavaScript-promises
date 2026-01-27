// 1. Coding Challenge: The Movie Night Dependency. You are building a movie booking app. However, the "server" is old and only supports **callbacks**. To book a ticket, you must follow a strict sequence of steps. You cannot skip a step because each one requires information from the one before it.
// Write a JavaScript script that completes the following four steps in order:
    
//     ## **The Scenario**
    
//     ## **Your Goal**
    
//     1. **Login** to the system.
//     2. **Fetch the Movie List** for that user.
//     3. **Get Showtimes** for the first movie in that list.
//     4. **Book a Ticket** for the first available showtime.
// 2. --
// Copy and paste this code at the top of your script. These functions simulate a slow internet connection using `setTimeout`.
// Write the implementation code below the API setup.
// Once your code runs successfully and finishes after ~4 seconds, look at your screen and answer:
    
//     ## **Step 1: The "Legacy API" Setup**
    
//     ```jsx
//     const legacyAPI = {
//         login: (username, callback) => {
//             console.log("🔑 Logging in...");
//             setTimeout(() => callback(null, { userId: 42, user: username }), 1000);
//         },
//         getMovies: (userId, callback) => {
//             console.log(`📂 Fetching movies for User ID: ${userId}...`);
//             setTimeout(() => callback(null, ["Inception", "The Matrix", "Interstellar"]), 1000);
//         },
//         getShowtimes: (movieName, callback) => {
//             console.log(`🕒 Getting showtimes for: ${movieName}...`);
//             setTimeout(() => callback(null, ["7:00 PM", "9:30 PM", "11:00 PM"]), 1000);
//         },
//         bookTicket: (time, callback) => {
//             console.log(`🎟️ Booking ticket for ${time}...`);
//             setTimeout(() => callback(null, { success: true, seat: "F-14" }), 1000);
//         }
//     };
    
//     ```
    
//     ## **Step 2: The Instructions**
    
//     - You must call `legacyAPI.login("YourName", ...)` first.
//     - Inside that callback, call `getMovies`.
//     - Inside the movies callback, take the **first movie** from the array and call `getShowtimes`.
//     - Inside the showtimes callback, take the **first time** and call `bookTicket`.
//     - **Final Output:** Use `console.log` to print the final result: *"Success! Booked seat [SEAT] at [TIME]."*
    
//     ## **Step 3: Discussion Questions (The Mental Model)**
    
//     1. **The Shape:** Does your code look like a staircase or a pyramid? This is the "Pyramid of Doom."
//     2. **The Brackets:** Count how many `});` you have stacked at the bottom of your code. How easy would it be to delete one by accident?
//     3. **Error Handling:** If the `login` failed, where would you handle that error? What if you had to handle errors for *every* step?
// 3. **Implementation Tips**
//     - Every function in `legacyAPI` takes a **callback function** as its second argument.
//     - The callback functions follow the "Error-First" pattern: `(error, data) => { ... }`.

const legacyAPI = {
    login: (username, callback) => {
        console.log("🔑 Logging in...");
        setTimeout(() => callback(null, { userId: 42, user: username }), 1000);
    },
    getMovies: (userId, callback) => {
        console.log(`📂 Fetching movies for User ID: ${userId}...`);
        setTimeout(() => callback(null, ["Inception", "The Matrix", "Interstellar"]), 1000);
    },
    getShowtimes: (movieName, callback) => {
        console.log(`🕒 Getting showtimes for: ${movieName}...`);
        setTimeout(() => callback(null, ["7:00 PM", "9:30 PM", "11:00 PM"]), 1000);
    },
    bookTicket: (time, callback) => {
        console.log(`🎟️ Booking ticket for ${time}...`);
        setTimeout(() => callback(null, { success: true, seat: "F-14" }), 1000);
    }
};

legacyAPI.login('Blandine',(error,data)=>{
      if (error) {
        console.log("login error", error.message)
        return
    }
    legacyAPI.getMovies(data.userId,(error,movieArr)=>{
          if (error) {
        console.log("getMovies error",error.message)
        return
    }
        legacyAPI.getShowtimes(movieArr[0],(error,timeArr)=>{
              if (error) {
        console.log("showTimes error", error.message)
        return
    }
            legacyAPI.bookTicket(timeArr[0],(error,seat)=>{
                  if (error) {
        console.log("booking error", error.message)
        return
    }
                console.log(`Success! Booked seat ${seat.seat} at ${timeArr[0]}.`)
                
            })
        })
    })
})


/*About  fetch: Challenge 1
 Build A function that shows all posts written by one specific user.
*The Goal
 When you give a user ID, get all their posts and display:
-How many posts they wrote
-The title of each post
*/


async function getUserPosts(userId){
   const usersUrl=`https://jsonplaceholder.typicode.com/users/${userId}`
   const postUrl=`https://jsonplaceholder.typicode.com/posts?userId=${userId}`
   
    try{
        const userRes = await fetch(usersUrl);
        if(!userRes.ok){
            throw new Error(`Fetch user failed: ${userRes.status}`)
        };
        const user = await userRes.json();

        const postsRes = await fetch(postUrl);
        if(!postsRes.ok){
            throw new Error(`Fetch posts failed: ${postsRes.status}`)
        };
        const posts = await postsRes.json();

        return{
            userName: user.name,
            postCount: posts.length,
            posts: posts.map(post => ({
                id: post.id,
                title: post.title
            }))
        }
    }catch(error){
        console.error(error.message);
        throw error
    }
}
getUserPosts(1).then(result => console.log(result));

