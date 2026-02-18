
//Task
/*Create a counter function that counts from 1 to 5, with a 1-second delay between each number. The function should return a promise that resolves with an array of all the numbers when counting is complete. This tests your ability to create async flows with timing and collect results over time.

Requirements:

- Function `asyncCounter()` counts 1, 2, 3, 4, 5
- 1-second delay between each number
- Return promise that resolves with `[1, 2, 3, 4, 5]`
- Use async/await or promise chaining

*/

//answer
function asyncCounter(){
  return new Promise((resolve,reject)=>{
     let arr=[]
     let i=1
     function count(){
       if(i<=5){
           setTimeout(()=>{
     arr.push(i)
     console.log(i)
             i++;
             count();
    },1000);
       }else{
         resolve(arr)
       }
    
     }
   count()
  })
}

asyncCounter().then(res=>console.log(res))
.catch(error=>console.log(error))
