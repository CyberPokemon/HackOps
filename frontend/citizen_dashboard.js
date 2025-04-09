document.getElementById('waterRequestForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const urgency = document.getElementById('urgency').value;
    const description = document.getElementById('description').value;
  
    const table = document.querySelector('#historyTable tbody');
    const newRow = table.insertRow(0); // insert at top
  
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  
    newRow.innerHTML = `
      <td>${table.rows.length}</td>
      <td>${date}</td>
      <td>${urgency.charAt(0).toUpperCase() + urgency.slice(1)}</td>
      <td>${description}</td>
      <td><span class="badge bg-warning">Pending</span></td>
    `;
  
    // Reset form
    document.getElementById('waterRequestForm').reset();
  });
  