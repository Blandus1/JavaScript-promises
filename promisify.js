//Task
/*
Task
Convert the following callback-based asynchronous code into a Promise-based version.

Before solving:

Name the process of converting callback-based functions into Promise-based functions.

Use .then() and .catch() for handling results and errors.

Explain the demerits of callbacks that led to the introduction of Promises

function getUser(userId, callback) {
  setTimeout(() => {
    console.log("Fetched user:", userId);
    callback(null, { id: userId, name: "RUMANZI" });
  }, 1000);
}

function getOrders(user, callback) {
  setTimeout(() => {
    console.log("Fetched orders for user:", user.name);
    callback(null, ["order1", "order2"]);
  }, 1000);
}

function getOrderDetails(order, callback) {
  setTimeout(() => {
    console.log("Fetched details for order:", order);
    callback(null, { order, details: "Some details" });
  }, 1000);
}

function sendNotification(details, callback) {
  setTimeout(() => {
    console.log("Notification sent for order:", details.order);
    callback(null, "Done");
  }, 1000);
}


getUser(1, (err, user) => {
  if (err) return console.error(err);
  getOrders(user, (err, orders) => {
    if (err) return console.error(err);
    getOrderDetails(orders[0], (err, details) => {
      if (err) return console.error(err);
      sendNotification(details, (err, result) => {
        if (err) return console.error(err);
        console.log(result); 
      });
    });
  });
});
*/

//Answer
function getUser(userId){
return new Promise((resolve,reject)=>{
setTimeout(()=>{
console.log("Fetched user:",userId)
  resolve({id:userId,name:"RUMANZI"})
},1000)

})
}
getUser().then(res=>console.log(res))
         .catch(error=>console.log(error))

function getOrders(user){
return new Promise((resolve,reject)=>{
setTimeout(()=>{
console.log("Fetched orders for user:", user.name)
  resolve(["order1", "order2"])
},1000)

})
}
getOrders().then(res=>console.log(res))
           .catch(error=> console.log(error))

function getOrderDetails(order){
return new Promise((resolve,reject)=>{
setTimeout(()=>{
console.log("Fetched details for order:",order)
  resolve({ order, details: "Some details" })
},1000)

})
}
getOrderDetails().then(res=> console.log(res))
                 .catch(error=> console.log(error))

function sendNotification(details){
return new Promise((resolve,reject)=>{
setTimeout(()=>{
console.log("Notification sent for order:", details.order)
  resolve("Done")
},1000)

})
}
sendNotification().then(res=> console.log(res))
                   .catch(error=> console.log(error))

getUser(1).then(user => {
  console.log("user:",user)
  return getOrders(user)
})
.then(orders=>{
 console.log("orders:",orders)
  return getOrderDetails(orders[0])
})
.then (details=>{
  console.log("Details:",details)
  return sendNotification(details)
})
.then (result=>{
  console.log("final results:",result)
})
.catch(error=> console.error("Error:",error))
  


//Async approach
/*
async function processOrder() {
  try {
    const user = await getUser(1);
    console.log("User:", user);
    
    const orders = await getOrders(user);
    console.log("Orders:", orders);
    
    const details = await getOrderDetails(orders[0]);
    console.log("Details:", details);
    
    const result = await sendNotification(details);
    console.log("Final result:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

processOrder();
 */