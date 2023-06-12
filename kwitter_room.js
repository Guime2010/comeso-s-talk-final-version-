const firebaseConfig = {
      apiKey: "AIzaSyARucD4LCgTbkQeNwo-Wn0gm4nroiLr_NQ",
      authDomain: "comesotalk.firebaseapp.com",
      databaseURL: "https://comesotalk-default-rtdb.firebaseio.com",
      projectId: "comesotalk",
      storageBucket: "comesotalk.appspot.com",
      messagingSenderId: "597671301973",
      appId: "1:597671301973:web:be1f8a6cdcea28c2a895dc"
    };
    firebase.initializeApp(firebaseConfig)


userName = localStorage.getItem("nome");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";


function getData() {  
firebase.database().ref("/").on('value', function(snapshot) { 
  document.getElementById("output").innerHTML = ""; 
  snapshot.forEach(function(childSnapshot) { 
    childKey  = childSnapshot.key;
    roomNames = childKey;
  console.log("Nome da Sala - " + roomNames);
  row = "<div class='roomName' id="+roomNames+" onclick='redirecionar(this.id)' >#"+ roomNames +"</div><hr>";
  document.getElementById("output").innerHTML += row;
});
});


}
getData();
function addRoom()
{
roomName = document.getElementById("roomName").value;

firebase.database().ref("/").child(roomName).update({
      sala: "sala adicionada"
});
  //armazenar o nome da sala no local Storage e redirecionar para a sala
  localStorage.setItem("roomName",roomName)
  window.location="kwitter_page.html"
}




function redirecionar(name){
  localStorage.setItem("roomName",name)   
  window.location="kwitter_page.html"
}

function logout() {
localStorage.removeItem("nome")
localStorage.removeItem("roomName")
window.location="index.html"
}
