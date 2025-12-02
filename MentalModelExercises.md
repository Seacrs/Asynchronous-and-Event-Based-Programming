# Practical exercises (Asynchronous & Event-Based Programming) - 27 November 2025
## 1. Write a function that takes a URL and fetches data from that URL but aborts when the request takes more than 10ms
### Solution
```bash
async function fetchData(url){
  controller = new AbortController();
  let signal = controller.signal;
  const timer = setTimeout(()=> controller.abort(), 10);
  try{
    const r = await fetch(url, {signal});
    clearTimeout(timer);
    if(!r.ok){
      throw new Error(`Error: ${r.status}`);
    }
    const d = await r.json();
    console.log(d);
  } catch (err) {
    if(err.name === "AbortError"){
      console.log("Request Timed Out");
    } else {
      console.log(err);
    }
  }
}

fetchData("https://jsonplaceholder.typicode.com/todos/1");
```
## 2. Write a javascript function that displays a number every two seconds and stops displaying after 5 seconds
### Solution
```bash
async function display(){
  const colors = ["red", "orange", "yellow", "green", "blue", "Violet"];
  let i = 0;
  
  let interval = setInterval(()=>{
    console.log(colors[i]);
    if(i === colors.length - 1) clearInterval(interval);
    i++;
  }, 2000);

  setTimeout(()=> {
    clearInterval(interval);
  },5000);
}

display();
```
## 3. Write a JavaScript function that fetches data from an API and retries the request a specified number of times if it fails. Wrap a promise around it.
### solution
```bash
function fetchData(url, retry = 5){
  return new Promise(async (resolve, reject)=>{
    let count = 0;
    while(count < retry){
      try{
        const r = await fetch(url);
        if(r.ok){
          const d = await r.json();
          return resolve(d);
        } 
        count ++;
      } catch (err) {
        count++;
      }
    }
    return reject(`Failed after ${count} attempts`);
  })
}

fetchData("https://jsonplaceholder.typicode.com/post", 3).then(value => console.log(value)).catch(err => console.log(err));
```
## 4. Write a JavaScript function fetchToDo that uses XMLHttpRequest to fetch data from the given URL (https://jsonplaceholder.typicode.com/todos/1). The function should handle both successful responses and errors (such as network issues or invalid URLs). Upon receiving a successful response, it should log the fetched data to the console. If there's an error, it should catch the error and log an appropriate message.
```bash
function fetchToDo(url){
  
  let xhr = new XMLHttpRequest();

  xhr.open('GET', url);
  xhr.onload = ()=>{
    try{
      if(xhr.status === 200){
        const data = JSON.parse(xhr.response);
        console.log(data)
      }
      else{
        throw new Error(`Http Error: ${xhr.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  xhr.onerror = ()=>{
    console.warn("Network Failure");
  }
  xhr.send();
}

fetchToDo("https://jsonplaceholder.typicode.com/todos/1");
```
## 5. Extend the fetchToDo function from Question 4 to include custom headers in the request. Specifically, you need to add a User-Agent header with a custom value and a Content-Type header set to application/json. Additionally, modify the function to send a JSON payload in the request body. After sending the request, the function should parse the JSON response and log the parsed object to the console.
### solution
```bash
function fetchToDo(method, url, options){
  return new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = 'json';
    if(options){
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('User-Agent', 'MyCustomValue');
    }
    xhr.onload = ()=>{
        if(xhr.status >= 200 && xhr.status <300){
          resolve(xhr.response);
        }
        else{
          reject(`Http Error: ${xhr.status}`);
        }
    }
    xhr.onerror = ()=>{
      reject("Network Failure");
    }
  
    xhr.send(JSON.stringify(options));
  })
}

fetchToDo('POST', 'https://jsonplaceholder.typicode.com/posts',{
  userId: 125,
  id: 125,
  title: "lorem ipsum toler",
  body: "meanglisess endless can't stop me can't never"
}).then(value => console.log(value)).catch(err => console.log(err));

```
## 6. What is the output of the following code snippets
```
// Promise Chain

const promise = new Promise((resolve, reject) => {
  console.log('Promise created');
  resolve('First resolve');
});

promise
  .then((result) => {
    console.log(result);
    return 'Second resolve';
  })
  .then((result) => {
    console.log(result);
    throw new Error('Error in chain');
  })
  .catch((error) => {
    console.error('Caught:', error.message);
  })
  .then(() => {
    console.log('After catch');
  });

```
### solution
```bash
# Expected output:
# Promise created
# First resolve
# Second resolve
# Caught: Error in chain
# After catch
```
```
// Async/Await with Promises

async function asyncFunction() {
  console.log('Inside async function');
  return 'Async Function Result';
}

console.log('Start');

asyncFunction().then((result) => {
  console.log(result);
});

console.log('End');
```
### solution 
```bash
# Expected output:
# Start
# Inside async function
# End
# Async Function Result
```

```
// Nested promises

Promise.resolve('Outer Promise')
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      console.log('Inner Promise created');
      resolve('Inner Promise');
    });
  })
  .then((result) => {
    console.log(result);
  });

```
### solution
```bash
# Expected output:
# Outer Promise
# Inner Promise created
# Inner Promise
```
```
console.log("Start");

setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("promise 1");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("promise 2");
  setTimeout(function () {
    console.log("setTimeout 2");
    resolve("resolve 1");
  }, 0);
}).then((res) => {
  console.log("dot then 1");
  setTimeout(() => {
    console.log(res);
  }, 0);
});
```
### solution
```bash
# Expected Output
# Start
# promise 2
# setTimeout 1
# promise 1
# setTimeout 2
# dot then 1
# resolve 1
```
```
console.log('Start');

setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Promise 2');
      }, 0);
    });
  })
  .then((result) => {
    console.log(result);
  });

console.log('End');
```
### solution
```bash
# Expected Output
# Start
# End
# Promise 1
# Timeout
# Promise 2
```
## 7. Create a function called myFetch that should work as a simple version of the native fetch() API. The function myFetch should use the XMLHttpRequest to make a GET Request and return a promise that resolves with the request's response and rejects with an error if any.

```
// Usage Example
function myFetch(){
    //... your code here
}

myFetch('https://jsonplaceholder.typicode.com/users')
.then(data => console.log(data))
.catch(error => console.log('Error:', error))
```

##

### solution
```bash
function myFetch(url){
  return new Promise((resolve, reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = ()=>{
      if(xhr.status >= 200 && xhr.status <=300){
        return resolve(xhr.response);
      }
      else{
        return reject(`Something went Wrong Error: ${xhr.status}`);
      }
    }
    xhr.onerror = ()=>{
      return reject(`Network failure`);
    }
    xhr.send();
  })
}

myFetch('https://jsonplaceholder.typicode.com/users')
.then(data => console.log(data))
.catch(error => console.log('Error:', error))
```
## 8. Create a button that counts clicks, but with a twist - after each click, the button should be disabled for 2 seconds while showing "Processing..." text. Once the delay is over, re-enable the button and show the updated count. This tests your ability to manage UI state during async operations triggered by user interactions.
## Requirements:
```
    
    - Button shows "Click me! Count: 0" initially
    - When clicked, immediately show "Processing..." and disable button
    - After 2 seconds, re-enable button and show new count
    - Handle multiple rapid clicks properly (they should queue or be ignored)
```
##
### solution
```bash
const btn = document.querySelector("#clickbtn");
const update = document.querySelector("#text");

let count = 0;

function addition(){
  count++;
  update.textContent = count;
}
update.textContent = count;

btn.addEventListener("click", async ()=>{
    update.textContent = 'processing';
    btn.setAttribute("disabled", true);
    await new Promise((resolve)=>{
      setTimeout(()=>{
        resolve(btn.removeAttribute("disabled"));
      }, 2000)
    })
    addition();
});
```

