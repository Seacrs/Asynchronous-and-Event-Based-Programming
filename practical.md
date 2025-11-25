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
function changeColor(d) {
      const color = ["red","yellow","blue","green","black","white","purple"];
      for (let i = 0; i < color.length; i++) {
        setTimeout(() => {
          d.style.backgroundColor = color[i];
        }, i * 3000);
      }
    }
    const d = document.querySelector("body");
    document.addEventListener("click", () => changeColor(d));
```
```bash
function changeColor(d) {
      const colors = ["red", "yellow", "blue", "green", "black", "white", "purple"];
      let i = 0;
      setInterval(()=>{
        d.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
      }, 3000)
    }
    const d = document.querySelector("body");
    document.addEventListener("click", () => changeColor(d));
```
## 4. Create a function called myFetch that should work as a simple version of the native fetch() API. The function myFetch should use the XMLHttpRequest to make a GET Request and return a promise that resolves with the request’s response and rejects with an error if any.function
```
myFetch(){ //... your code here
}
myFetch('https://my-random-api.com/data')
.then(data => console.log(data))
.catch(error => console.log('Error:', error));Bonus points (optional)
Make your fetch function perform other request methods like POST or receive request options.
```
### solution
```bash
function myFetch(method, url, data){
    return new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open(method,url);
      
        if(data){
            xhr.setRequestHeader('Content-Type', 'application/json'); 
        }
      
        xhr.onload = ()=>{
            if(xhr.status === 200){
                let data = JSON.parse(xhr.response);
                resolve(data);
            }
            else{
                reject(`${xhr.status} : ${xhr.responseText}`);
            }
        };
        xhr.onerror = ()=>{
            reject(`Something went wrong`);
        };
        xhr.send(JSON.stringify(data));
    })
}
```
### 5. Write a JavaScript function that fetches data from an API and retries the request a specified number of times if it fails.
### solution
```bash

```