/*Variable para detectar donde esta la aplicacion, force new true para forzar la conexion,
poner la ip local para que los demas puedan acceder en la red local

*/
var socket = io.connect('192.168.0.12:6677',{'ForceNew':true});

/*Recibo de los mensajes: */
/*data son los datos del server, en este caso lo de la variable messages*/
socket.on('Servermessages',function(data) {
  console.log(data);
  template(data)//le pasamos los datos
});

/*Funcion para mostrar el mensaje del server al usuario*/
/*
creamos una variable (tag) que permite recorrer la info del mensaje almacenado en el backend,
y retornamos una plattilla html la cual contiene el mensaje del backend

*/
function template(data){
  var tag=data.map(function(content,index) {

    return(`

      <div class="template">

      <strong>${content.nickname}</strong> say:
      <p>${content.text}</p>

      </div>

      `)
  }).join('-----------------');

var div=document.getElementById('messages');
  div.innerHTML=tag;
  div.scrollTop=div.scrollHeight;

}

function addmesage(e){
  var message= {
    nickname: document.getElementById('nickname').value,
    text: document.getElementById('text').value
  };
  document.getElementById('nickname').style.display='none';
  socket.emit('add-mesage',message);
  return false;//para cortar la ejecucion
}
