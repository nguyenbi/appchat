var socket = io("http://localhost:3000/");

$(document).ready(function(){
  $("#btnTaoRoom").click(function(){
    socket.emit("tao-room", $("#txtTaoRoom").val());
  });
  $(".btnSendChat").click(function(){
    socket.emit("client_send_chuoi", $(".txtSendChat").val());
  });

  socket.on("server_send_room", function(data){
    $(".roomHienTai").html(data);
  });
  socket.on("server_send_lstRooms", function(data){
   $(".lstRoom").html("");
   console.log(data);
    data.forEach(function(r){
      $(".lstRoom").append("<li class='clsroom'>" +r+ "</li>");
    });
  });
  socket.on("server_send_message", function(data){
      $(".lstMessage").append(data);
  });

  });
