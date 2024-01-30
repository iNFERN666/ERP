const produse = [];

function adaugaProdus() {
  const numeProdus = document.getElementById('numeProdus').value;
  const cantitateProdus = parseInt(document.getElementById('cantitateProdus').value);

  if (numeProdus && !isNaN(cantitateProdus) && cantitateProdus > 0) {
    const existent = produse.find(produs => produs.nume === numeProdus);

    if (existent) {
      existent.cantitate += cantitateProdus;
    } else {
      produse.push({ nume: numeProdus, cantitate: cantitateProdus });
    }

    afiseazaProduse();
  } else {
    alert('Te rog introdu numele și cantitatea validă a produsului.');
  }
}

function afiseazaProduse() {
  const listaProduse = document.getElementById('listaProduse');
  listaProduse.innerHTML = '';

  produse.forEach(produs => {
    const li = document.createElement('li');
    li.textContent = `${produs.nume}: ${produs.cantitate}`;
    listaProduse.appendChild(li);
  });
}

function exportaInExcel() {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(produse);

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Produse');

  const data = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([data], { type: 'application/octet-stream' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'produse.xlsx';
  a.click();
  URL.revokeObjectURL(url);
}


// Initialize Firebase app with your configuration
const firebaseConfig = {
  // Your Firebase configuration here
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