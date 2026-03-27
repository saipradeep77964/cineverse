
// Firebase configuration idhi chala sensitive info
const firebaseConfig = {
  apiKey: "AIzaSyD-EcSWge67MUXbZKehwdNxO2QGWUFATvo",
  authDomain: "ciniverse-dd5a3.firebaseapp.com",
  databaseURL: "https://ciniverse-dd5a3-default-rtdb.firebaseio.com",
  projectId: "ciniverse-dd5a3",
  storageBucket: "ciniverse-dd5a3.firebasestorage.app",
  messagingSenderId: "1082908216807",
  appId: "1:1082908216807:web:39c4b52cb065b1a76e8142"
};

//  Firebase initialization kosam
firebase.initializeApp(firebaseConfig);

// Initialize EmailJS mail ki message raniki
emailjs.init("g3zR3vVAeCTTkrESZ"); 


const database = firebase.database();


const joinForm = document.getElementById('joinForm');
const formMessage = document.getElementById('formMessage');

joinForm.addEventListener('submit', function(e) {
  e.preventDefault(); 

  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const roll = document.getElementById('roll').value;
  const branch = document.getElementById('branch').value;
  const interest = document.getElementById('interest').value;

  
  const newMemberRef = database.ref('members').push();
  newMemberRef.set({
    name: name,
    email: email,
    phone: phone,
    roll: roll,
    branch: branch,
    interest: interest,
    joinedAt: new Date().toISOString()
  })
  .then(() => {

    
    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone,
      roll: roll,
      branch: branch,
      interest: interest
    };

    
    emailjs.send('service_0r62w8t', 'template_m9lqqvb', templateParams)
    .then((response) => {
      console.log('Email successfully sent!', response.status, response.text);
    })
    .catch((error) => {
      console.error('Email sending failed:', error);
    });

    
    localStorage.setItem("userEmail", email);

   
    formMessage.textContent = "🎉 You're officially part of CineVerse! We will reach you out soon!";

    
    joinForm.reset();

    
  })
  .catch((error) => {
   
    formMessage.textContent = "❌ Something went wrong. Try again!";
    console.error('Firebase Error:', error);
  });
});
