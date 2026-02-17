// This executes concurrently
/*

Create a function fetchUserActivityDashboard() that aggregates data from three concurrent API endpoints and produces an enriched user dataset:
API Endpoints:

Users: https://jsonplaceholder.typicode.com/users
Todos: https://jsonplaceholder.typicode.com/todos
Posts: https://jsonplaceholder.typicode.com/posts

Requirements:
// Expected output structure for EACH user:
{
  id: 1,
  name: "Leanne Graham", 
  activity: {
    todos: {
      total: 20,
      completionRate: 55, // percentage
      items: [] // array of todo objects
    },
    posts: {
      total: 10,
      items: [] // array of post objects
    },
  }
}

*/

async function fetchUserActivityDashboard() {
    try{
    const url1= "https://jsonplaceholder.typicode.com/users"
    const url2= "https://jsonplaceholder.typicode.com/todos"
    const url3= "https://jsonplaceholder.typicode.com/posts"
   
let [users, todos, posts] = await Promise.all([fetch(url1),fetch (url2),fetch (url3)])
    
let [usersRes, todosRes, postsRes]= await Promise.all([users.json(), todos.json(), posts.json()])

    //user details with todos and posts
  const userDetails= usersRes.map( user=>{
   const activityTodo= todosRes.filter(todo=> todo.userId=== user.id)
   const activityTopost= postsRes.filter(post=> post.userId === user.id)
   
   const completedActivityTodo = activityTodo.filter(todo=> todo.completed).length
      const   completionRate = activityTodo.length? Math.round((completedActivityTodo/activityTodo.length  )* 100): 0;                               
    return { 
      id: user.id,
      name: user.name,
      activity:{
        todos: {
          total: activityTodo.length,
          completionRate: completionRate,
          items: activityTodo,
        
      },
        posts: {
        total: activityTopost.length,
        items: activityTopost,
      }
    }
} 
   }) 
  return userDetails;
}catch (error){
  console.error("Failed to fetch",error)
  throw error
}
}
fetchUserActivityDashboard().then(res=>console.log(res))
                            .catch(error=>console.log(error))
