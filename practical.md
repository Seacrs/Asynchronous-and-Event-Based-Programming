# Practical Questions 
## 1. Create a function called createAlarm that generates a wake-up message for a person after a specified time delay. This function should accept two parameters: the person's name and the delay time in seconds.The function should return a promise that resolves with the wake-up message (e.g.Wake up person) but if the delay is less than 2 seconds,the promise should be immediately rejected with an error message stating Delay is not sufficient
### solution
```bash
async function createAlarm(name, time){
    return new Promise((resolve, reject)=>{
        if(time < 2) reject("Delay insufficient");
        setTimeout(()=>{
            resolve("Wake up "+name);
        }, time);
    })
}

createAlarm("John", 1).then((message)=>console.log(message)).catch((error)=> console.error(error));
```
## 2. Write a JavaScript function that fetches data from multiple APIs concurrently and returns a combined result using Promises

### solution

```bash
async function fetchMultipleAPIs(apiUrls){
    try{
        const r = apiUrls.map(x => fetch(x).then((response)=> {
            if(!response.ok) throw new Error(`HTTP request failed at ${x}`);
            return response.json();
        }));
        const d = await Promise.all(r);
        return d;
    } catch(e){
        console.log("Error fetching APIs:", e.message);
    }
}
```
## 3. Write a javascript function that changes the background color of the body (HTML tag) every 3 seconds.
### solution
```bash

```