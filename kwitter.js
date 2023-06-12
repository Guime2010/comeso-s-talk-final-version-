function addUser(){
var username=document.getElementById("User").value
localStorage.setItem("nome",username)
window.location="kwitter_room.html"
}