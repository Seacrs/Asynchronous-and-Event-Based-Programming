## Practical exercises (Asynchronous & Event-Based Programming) - 27 November 2025
## 1. Write a function that takes a URL and fetches data from that URL but aborts when the request takes more than 10ms
### solution
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