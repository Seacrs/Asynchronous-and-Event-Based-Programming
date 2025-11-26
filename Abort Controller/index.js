const d = document.querySelector("#download-btn");
const abortBtn = document.querySelector('#abort-btn');

d.addEventListener("click", downloadFile);
abortBtn.addEventListener("click", ()=>{
    if(controller){
        controller.abort("User Aborted the download action");
        console.warn("Download Aborted");
    }
})

const url = '/dummy.txt';
controller = new AbortController();
const signal = controller.signal;

async function downloadFile(){

    try{
        console.log("Downloading...");
        setTimeout(async()=>{
            const response = await fetch(url, {signal});
            console.log("Download complete");

            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = objectUrl;
            link.download = "dummy.txt";
            link.click();
            URL.revokeObjectURL(objectUrl);
        }, 2000)
    } catch (err){
        console.error(`Download error: ${err.message}`);
    }
}