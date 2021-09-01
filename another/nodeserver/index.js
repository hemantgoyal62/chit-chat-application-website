const express=require('express')
// const { Server } = require('http')
const path =require('path')
const app=express()
const http=require('http').createServer(app)
const port=process.env.PORT || 8000
const io=require('socket.io')(http ,{
    cors: {
      origin: '*',
    }
  })  
const pathjoin=path.join(__dirname,'../');
app.use(express.static(pathjoin));
const users={};
io.on('connection', socket=>{
    socket.on('new-user-joined',name=>{
        // console.log("new user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id] } );
    });
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})
http.listen(port,function(){
    console.log(port);
})