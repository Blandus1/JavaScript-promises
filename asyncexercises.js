
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
