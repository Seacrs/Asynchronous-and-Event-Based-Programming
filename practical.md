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