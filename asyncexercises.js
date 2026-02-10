
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





