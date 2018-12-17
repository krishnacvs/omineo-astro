
  // Initialize Firebase
var config = {
apiKey: "AIzaSyCvLYF1j4Q84GC0HPY7HZoQNYg7fiJAyAk",
authDomain: "thunder-3b277.firebaseapp.com",
databaseURL: "https://thunder-3b277.firebaseio.com",
projectId: "thunder-3b277",
storageBucket: "thunder-3b277.appspot.com",
messagingSenderId: "715972416652"
};
firebase.initializeApp(config);
// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

messagesRef.on('value', function(snapshot) {
	var foo = document.getElementById('message-list');
	while (foo.firstChild) foo.removeChild(foo.firstChild);
	snapshot.forEach(function(childSnapshot) {
	  node = document.getElementsByClassName('message-template')[0];
	  cloneNode = node.cloneNode(true);
	  cloneNode.children[0].textContent = childSnapshot.val().name;
	  cloneNode.children[1].textContent = childSnapshot.val().email;
	  cloneNode.children[2].textContent = childSnapshot.val().message;
	  cloneNode.hidden = false;
	  document.getElementById("message-list").appendChild(cloneNode);
    });
});

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var email = getInputVal('email');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, email, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, email, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    email:email,
    message:message
  });
}

function getMessage(){
  var newMessageRef = messagesRef.pull();
}