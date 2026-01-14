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