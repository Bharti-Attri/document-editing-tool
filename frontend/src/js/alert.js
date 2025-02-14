function hide(){
    const messageBox = document.getElementById('message-box');
    messageBox.style.display="none";
    messageBox.style.top="20px";
}
function failedMessage(message) {
    const messageBox = document.getElementById('message-box');
    const messageDiv = document.getElementById('message');
    const messageIcon = document.getElementById('message-icon');
    messageBox.style.display="flex";
    messageBox.style.top="0px";
    messageDiv.textContent = message;
    messageBox.classList.remove("success");
    messageBox.classList.add("failed");
    messageIcon.textContent = "!";
    setTimeout(()=>{
        hide();
    },1000)
}
function successMessage(message) {
    const messageBox = document.getElementById('message-box');
    const messageDiv = document.getElementById('message');
    const messageIcon = document.getElementById('message-icon');
    messageBox.style.display="flex";
    messageBox.style.top="0px";
    messageBox.classList.remove("failed");
    messageBox.classList.add("success");
    messageDiv.textContent = message;
    messageIcon.innerHTML = "&#10003;";
    setTimeout(()=>{
        hide();
    },1000)
}

export {failedMessage,successMessage};