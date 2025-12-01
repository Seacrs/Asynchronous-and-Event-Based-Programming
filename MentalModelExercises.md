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
```