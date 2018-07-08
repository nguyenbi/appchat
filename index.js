var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
var mangUser = [];
server.listen(process.env.PORT || 3000);
io.sockets.on("connection", function(socket){
  console.log("co nguoi ket noi " + socket.id);
  socket.username = "";
  socket.on("client_send_addUser", function(user){

    var kq = true;
    if(mangUser.indexOf(user) == -1)
    {
     mangUser.push(user);
     //socket.username = user;
     kq=true;
     }
     else {
       kq = false;
     }
     var userNa = socket.username;
     socket.emit("server_send_ketquaAddUser", {ketqua:kq});
     socket.on("client_send_chat", function(dulieuchat){
        io.sockets.emit("server_send_chat", {noiDung: dulieuchat, userName: userNa});
      });
      //mangUser.push(new UserChar(user));
      //console.log(mangUser);
      io.sockets.emit("server_send_lstUser", mangUser);
  });

});
function UserChar(ten){
  this.ten = ten;
}
app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});
