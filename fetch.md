# Fetch questions and answers
## 1. Use fetch() to retrieve a list of users from https://jsonplaceholder.typicode.com/users and log the names to the console
### Solution
```bash
const url = "https://jsonplaceholder.typicode.com/users";

async function fetchList(url){
    try{
        const r = await fetch(url);
        const d = await r.json();
        d.forEach( u => console.log(u.name));
    } catch(error){
        console.log(error);
    }
}

fetchList(url);
```
## 2. Fetch all posts by userId=1 from https://jsonplaceholder.typicode.com/posts?userId=1 and display the titles

### solution
```bash
async function fetchposts(link){
    
    const queryParams = {
        userId : 1,
    };
    try{
        const queryString = new URLSearchParams(queryParams).toString();
        const url = `${link}?${queryString}`;
        const r = await fetch(url);
        const d = await r.json();
        d.forEach(u => console.log(u.title));
    } catch(error){
        console.log(error);
    }
}
const APIurl = "https://jsonplaceholder.typicode.com/posts";


fetchposts(APIurl);
```
## 3. Send a POST request to https://jsonplaceholder.typicode.com/posts with a new post (title, body, userId). Show the response in console

### solution
```bash
async function newPost(postData){
    const URL = "https://jsonplaceholder.typicode.com/posts";

    try{
        const r = await fetch(URL, {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(postData),
        });
        const d = await r.json();
        console.log(d);
    } catch (error){
        console.log(error);
    }
}

const newPostData = {
    userId: 2,
    title: "communication importance no end",
    body: "Ugoki o tomeru koto wa dekinai",
}

newPost(newPostData);
```
## 4. Update the post with ID = 1 by sending a PUT request with a new title and body. Use the same endpoint
### solution
```bash
async function updatePost(postData){
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    try {
        const r = await fetch(url, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postData)
        })
        const d = await r.json();
        console.log(d);
    } catch (error) {
        console.log(error);
    }
    
}


const newPost = {
    ID: 1,
    title: "delivery of all there is",
    body: "Die Bewegung lässt sich nicht aufhalten",
}
updatePost(newPost);
```
## 5. Send a PATCH request to update just the title of post ID = 1
### solution
```bash
// Send a PATCH request to update just the title of post ID = 1

async function patchPost(postData){
    const url = "https://jsonplaceholder.typicode.com/posts/1"

    try {
        const r = await fetch(url, {
            method: "PATCH",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(postData),
        })
        const d = await r.json();
        console.log(d);
    } catch (error) {
        console.log(error);
    }
}

const patchTitle = {
    title: "Impact movement",
}

patchPost(patchTitle);
```
## 6. Send a DELETE request to remove post with ID = 1. Log the status of the response
### solution
```bash
async function deletePost(id){
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    try {
        const r = await fetch(url, {
            method: "DELETE",
        });
        const d = await r.json();
        console.log("response status: ",r.status);
        
    } catch (error) {
        console.log(error);
    }
}
deletePost(1);
```
## 7. Send a POST request to https://jsonplaceholder.typicode.com/posts with Content-Type: application/json in headers. Log the response
### solution
```bash
async function postRequest(postData){
    const url = "https://jsonplaceholder.typicode.com/posts";
    try {
        const r = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(postData),
        })
        const d = await r.json();
        console.log(d);
    } catch (error) {
        console.log(error);
    }
}

const newPost = {
    ID: 1,
    title: "testing new post request" ,
    body: "new post make success no null never know",
}

postRequest(newPost);
```
## 8. Create a custom function request(url, options) that wraps fetch. Use it to GET users and POST a new post
### solution
```bash
async function request(url, options={}){
    try {
        const r = await fetch(url, options);
        const d = await r.json();
        console.log("Success: ",d);
    } catch (error) {
        console.log(error);
    }
    
}
request("https://jsonplaceholder.typicode.com/posts");

request("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({
        id: crypto.randomUUID(),
        title: "How to make requests",
        body: "Make requests like am doing right now",
    })
});
```
## 9. Make a fetch call to a broken URL and use .catch() or try...catch to show a user-friendly error message
### solution
```bash
async function fakeCall(url){
        try {
            const r = await fetch(url);
            if(!r.ok){
                throw new Error(`Response status: ${r.status}`);
            }
            const d = await r.json();
            console.log(d);
        } catch (error) {
            console.log(error);
        }
    }

    const API_url = "https://jsonplaceholder.typicode.co";

    fakeCall(API_url);
``` 
## 10. Use AbortController to cancel a long-running fetch request (you can delay the response using a mock server or setTimeout)
### solution
``` bash
const d = document.querySelector("#download-btn");
const a = document.querySelector("#abort-btn");

controller = new AbortController();
let signal = controller.signal;

d.addEventListener("click", download());
a.addEventListener("click", ()=>{
  if(controller){
    controller.abort();
    console.warn("User Aborted");
  }
})
async function download(){
  try{
    const r = await fetch ("https://jsonplaceholder.typicode.com/users", {signal});
    const d = await r.blob();
    const url = URL.createObjectURL(d);
    const l = document.createElement('a');
    l.href = d;
    link.download = "dummy.txt";
    l.click();
    URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err.message);
  }
}
```
## 11. Fetch the list of users from the JSONPlaceholder API:
    - Endpoint: `https://jsonplaceholder.typicode.com/users`
    - If the request fails, retry up to **3 times** before throwing an error.
    Selects the first user from the retrieved list.
### solution
```bash
async function fetchFirstUserPostsWithRetries(url, retries = 3, options={}){
    let r = 0;
    while(r < retries){
        try{
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Check the URL or your Internet connection! Try again later");
            }
            const d = await response.json();
            console.log(d[0]);
            return d[0];
        }catch(error){
            console.log(error.message);
            r++;
        }
    }
    console.error("Failed to retrieve");
}
fetchFirstUserPostsWithRetries("https://jsonplaceholder.typicode.com/users");
```