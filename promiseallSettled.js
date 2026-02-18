/*
Question 1
You are building a dashboard that needs to fetch:
User profile → /api/user
User posts → /api/posts
User notifications → /api/notifications


All three endpoints are independent.

Task: Fetch all three in the most efficient way.

If one request fails:
The others should still succeed.
You should return whatever data was successfully fetched.

Display a combined result like:

 {
  user: {...} | null,
  posts: [...],
  notifications: [...]
}


⚠️ Constraints:

Use async/await
Do NOT let one failed request stop the others.
Avoid unnecessary sequential execution.

Endpoints:
User : https://jsonplaceholder.typicode.com/users/1
Posts : https://jsonplaceholder.typicode.com/posts?userId=1
Comments (as notifications alternative) → https://jsonplaceholder.typicode.com/comments?postId=1 

*/

async function fetcher(){

     const userUrl="https://jsonplaceholder.typicode.com/users/1"
  const postsUrl="https://jsonplaceholder.typicode.com/posts?userId=1"
  const notificationUrl="https://jsonplaceholder.typicode.com/comments?postId=1"

  
  let settled= await Promise.allSettled([fetch (userUrl),fetch (postsUrl),fetch (notificationUrl)])
  
let data= await Promise.all( //promise.all because it returns data, but for Promise.allSettled, it only returns status and value
  settled.map(res=> {
    if(res.status=== 'fulfilled'){
    
    return  res.value.json()

    }else{
      console.log('There is an error')
    }
  }))

let[userRes,postRes,notificationRes]= data
 
  return {
    
    users:userRes,
    posts:postRes,
    notifications: notificationRes
  }

  }
  fetcher().then(res=>console.log(res))










