const socket=io()
const form =document.getElementById("send-container");
const messageInput=document.getElementById("messageInp");
const messagecontainer=document.querySelector(".container");

var audio=new Audio('audio.mp3');

const append= (message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    messagecontainer.scrollTop=messagecontainer.scrollHeight;
    if(position=='left'){
        audio.play();
    }

}
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInput.value;
    if(message!=''){
        append(`You: ${message}`,'right');
    socket.emit('send',message);
    messageInput.value='';}
})
const user=prompt("enter user's name");
socket.emit('new-user-joined',user);
socket.on('user-joined',user=>{
    append(`${user} joined the chat`,'center');
})
socket.on('receive',data=>{
    append(`${data.name}:${data.message}`,'left');
})
socket.on('left',name=>{
    append(`${name} left the chat`,'center');
})