
//callback hell
loadScript('1.js', function(error, script) {
  if (error) {
    handleError(error);
  } else {
    loadScript('2.js', function(error, script) {
      if (error) {
        handleError(error);
      } else {
        loadScript('3.js', function(error, script) {
          if (error) {
            handleError(error);
          } else {
            // Finally, all scripts loaded
            console.log("All scripts loaded!");
          }
        });
      }
    });
  }
});

//Flattening callback hell without promises
function loadScript1(error,script) {
if(error) return handleError(error);
  loadScript('2.js', loadScript2);
}

function loadScript2(error, script) {
if(error) return handleError(error);
  loadScript('3.js', loadScript3);
}

function loadScript3(error, script) {
if(error) return handleError(error);
loadScript('4.js', handleComplete);
}

function handleComplete(error, script) {
  if(error) return handleError(error);
console.log('All scripts loaded!');
}

loadScript('1.js',loadScript1);



//Turning callback function to promise-based function
//callback based function
function fetchData(callback) {
    setTimeout(() => {
      const data = "Data fetched successfully!";
      callback(null, data);
    }, 1000);
  }
  
  fetchData((error, data) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log(data);
    }
  });

  //Promise-based function

function fetchData(){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
const data= "Data fetched successfully!";
      
      if(data){
        resolve(data)
      }else{
        reject(new Error("Failed to fetch data"))
      }
      
    },1000);
  })
}

fetchData().then(data=>console.log(data))
        .catch(error=>console.log(error))// we add this two parts to call/handle the promise otherwise it can not be logged


//myFetch fxn which uses XMLHttpRequest to return a promise

function myFetch(url, method="GET"){
 return new Promise((resolve,reject)=>{
   const xhr= new XMLHttpRequest()
   xhr.open(method,url,true)//used to specify the request's method and url, boolean true shows that it'll be async
   

  xhr.onload=function(){
    if(xhr.status >= 200 & xhr.status < 400){//this condition handles server errors and client errors
      resolve(JSON.parse(xhr.responseText))//xhr.responseText returns the response data as text and JSON parses it 
    }else{
      reject(new Error(`Request failed with status ${xhr.status}: ${xhr.statusText}`))
    }
  }
  xhr.onerror= function(){//onerror only checks network level failures
    reject(new Error("Network Error"))
  }
  xhr.send()//initiates the request -> no argument or null when the method is 'GET' since GET do not have body
})
}
myFetch('https://jsonplaceholder.typicode.com/users')
.then(data => console.log(data))
.catch(error => console.log('Error:', error))//check all promise errors (like with status) even those in onload.





