// Initialize Firebase app with your configuration
const firebaseConfig = {
    apiKey: "AIzaSyCocj-iFXprN6X3lDc6Cu3xaNkCfRiUY20",
    authDomain: "nextgenfactory-future.firebaseapp.com",
    databaseURL: "https://nextgenfactory-future-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "nextgenfactory-future",
    storageBucket: "nextgenfactory-future.appspot.com",
    messagingSenderId: "656505366836",
    appId: "1:656505366836:web:6de30ad6040345a2b8dd61",
    measurementId: "G-CJC3F3QHY9"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  
  // Function to handle form submission
  document.getElementById('goodReceiptForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission from reloading the page
  
    // Get form values
    const materialDescription = document.getElementById('materialDescription').value;
    const materialCode = document.getElementById('materialCode').value;
    const quantity = document.getElementById('quantity').value;
    const price = document.getElementById('price').value;
  
    // Save the data to Firebase Realtime Database
    const newReceiptRef = push(ref(database, 'goodReceipts'));
    set(newReceiptRef, {
      materialDescription,
      materialCode,
      quantity,
      price
    });
  
    // Clear form fields after submission
    document.getElementById('materialDescription').value = '';
    document.getElementById('materialCode').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';
  
    alert('Good receipt submitted successfully!');
  });