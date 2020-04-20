/*cargar express*/
var express=require('express');

var app=express();//metodo express que viene del modulo
var server= require('http').Server(app);//cargar el servidor http, y se pasa al metodo server la app de express
var io=require('socket.io')(server);//cargamos socket io dependencia y ligamos con express

/*
Definition of middleware:  Un middleware es un bloque de código que se ejecuta
entre la petición que hace el usuario (request) hasta que la petición llega al servidor.
*/


/*Cargar una vista:*/
//app.use para usar un middleware de express
app.use(express.static('client'));//le decimos que cargue una vista estatica que esta en la carpeta client por medio de express


/*Routing para texto, pagina inicial*/
app.get('/home',function(req,res) {
  res.status(200).send('Hello World since Home');
});

/*Crear mensaje por defecto a los que se conectan:*/
/*Hay que pasarselos por la funcion io.on*/
var messages=[{
  id:1,
  text:'Welcome to the private lan Chat',
  nickname:'server'
}]

/*io.on llama a la libreria para poder permitir lanzar eventos,
evento connection,
permite la conexion de los usuarios,
la funcion recibe una variable que lleva la info de la coneccion para poder utilizar mas metodos
*/
io.on('connection',function(socket){
  console.log("The client with the Ip:"+socket.handshake.address+"Has been conected");
  socket.emit('Servermessages',messages);
  //funcio para agregar el mensaje a la variable
  socket.on('add-mesage',function(data) {
    messages.push(data);
//le decimos que vuelva a emitir los mensajes
    io.sockets.emit('Servermessages', messages)
  });
});

server.listen(6677,function(){
  console.log("Server de Socket.io Corriendo en http://localhost:6677");
});//Le asignamos un puerto para que escuche
