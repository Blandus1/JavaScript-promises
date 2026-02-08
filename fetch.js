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

/*About fetch: challenge 2
A function that shows popular posts - posts with the most comments.
*The Goal
Get the top 5 posts that have the most comments, and show:
-Post title
-Author name (the user who wrote it)
-How many comments it has
*/

async function getTopPosts(limit) {
const postUrl="https://jsonplaceholder.typicode.com/posts"
const userUrl="https://jsonplaceholder.typicode.com/users"
const commentsUrl="https://jsonplaceholder.typicode.com/comments"
try{
  const userres= await fetch(userUrl)
  if(!userres.ok){
    throw new Error(`Failed to fetch users:${userres.status}`)
  }
  const user= await userres.json()
  
  const commentres= await fetch(commentsUrl)
  if(!commentres.ok){
    throw new Error(`Failed to fetch comments:${commentres.status}`)
  }
  const comments= await commentres.json()
  
  const postres= await fetch(postUrl)
  if(!postres.ok){
    throw new Error(`Failed to fetch posts: ${postres.status}`)
  }
  const posts= await postres.json()
  
  //The post with details
  const postDetails=posts.map(post=>{
   const authorName = user.find(users=>users.id===post.userId)
   const commentCount= comments.filter(comment=>  comment.postId === post.id).length
   
     return {
      postId:post.id,
      title: post.title,
      authorname:authorName.name,
      commentCount:commentCount,
  
         };
  })
  //Sorting the posts by comment count
const sortedPosts= postDetails.sort((a,b)=> b.commentCount -a.commentCount)

//Using the given limit parameter
const topLimitPosts= sortedPosts.slice(0,limit)
return {posts: topLimitPosts}
}
  catch(error){
    console.error(error.message);
    throw error
  }
}
getTopPosts(5).then(result => console.log(result));

/*About fetch: Challenge 3
A complete dashboard that shows everything about all users: their posts and engagement.
*The Goal
Create a report showing:
-All users
-How many posts each user wrote
-How many comments each user received (on all their posts)
-The average comments per post for each user
-Find the most active user (most posts)
-Find the most popular user (most comments received)
*/





