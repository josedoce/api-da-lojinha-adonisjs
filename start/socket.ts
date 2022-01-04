import WebSocket from "App/Services/WebSocket";

WebSocket.boot();

WebSocket.io.on('connection', (socket)=>{
  console.log('id is connected'+socket.id);
  socket.emit('news', {hello: 'world'});

  socket.on('my other event', (data)=>{
    console.log(data);
  });
});