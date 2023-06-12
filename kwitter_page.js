const firebaseConfig = {
    apiKey: "AIzaSyARucD4LCgTbkQeNwo-Wn0gm4nroiLr_NQ",
    authDomain: "comesotalk.firebaseapp.com",
    databaseURL: "https://comesotalk-default-rtdb.firebaseio.com",
    projectId: "comesotalk",
    storageBucket: "comesotalk.appspot.com",
    messagingSenderId: "597671301973",
    appId: "1:597671301973:web:be1f8a6cdcea28c2a895dc"
  };
firebase.initializeApp(firebaseConfig);  

  var userName = localStorage.getItem("nome")
  var roomName = localStorage.getItem("roomName")
  

  function send() {
      var meesagem=document.getElementById("msg").value
      firebase.database().ref(roomName).push({
        Nome:userName,
        mensagem:meesagem,
        like:0
      })
  } 

  function getData() {  
   firebase.database().ref("/" + roomName).on('value', function(snapshot) { 
     document.getElementById("output").innerHTML = ""; 
     snapshot.forEach(function(childSnapshot) { 
       childKey  = childSnapshot.key;
       childData = childSnapshot.val();
       if (childKey != "sala") {
         firebaseMessageId = childKey
         messageData = childData;
          Nome=messageData['Nome']
          like=messageData['like']      
          mensagem=messageData['mensagem']   


         nameWithTag = "<h4>" + Nome + "<img class='user_tick' src='tick.png'> </h4>"
         messageWithTag = "<h4 class='message_h4'>" + mensagem + "</h4>"
         likeWithTag = "<button class='btn btn-warning' id="+ firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>"
         iconeWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
         row = nameWithTag + messageWithTag + likeWithTag + iconeWithTag
         document.getElementById("output").innerHTML += row
       }
 });
 });
 
 
 }

 getData();

 function updateLike(messageId) {
    btnd=messageId
   likes=document.getElementById(btnd).value
   updateLikes=Number(likes)+1

    firebase.database().ref(roomName).child(messageId).update({
    like:updateLikes      
      })
 }

 function logout() {
   localStorage.removeItem("nome")
   localStorage.removeItem("roomName")
   window.location.replace("index.html")
}
