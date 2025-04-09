const requestsData = [
    {
      citizen: "Amit Roy",
      urgency: "High",
      description: "No water for 3 days",
      date: "2025-04-08",
      status: "Pending"
    },
    {
      citizen: "Sneha Das",
      urgency: "Medium",
      description: "Require water for wedding",
      date: "2025-04-06",
      status: "Supplied"
    }
  ];
  
  document.getElementById('zoneForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const zone = document.getElementById('zoneSelect').value;
    loadRequests(zone);
  });
  
  function loadRequests(zone) {
    const tbody = document.querySelector('#requestsTable tbody');
    tbody.innerHTML = "";
  
    requestsData.forEach((req, index) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${req.citizen}</td>
        <td>${req.urgency}</td>
        <td>${req.description}</td>
        <td>${req.date}</td>
        <td><span class="badge ${req.status === 'Pending' ? 'bg-warning' : 'bg-success'}">${req.status}</span></td>
        <td>
          ${req.status === 'Pending' ? '<button class="btn btn-sm btn-success" onclick="markSupplied(this)">Mark Supplied</button>' : ''}
        </td>
      `;
  
      tbody.appendChild(row);
    });
  }
  
  function markSupplied(button) {
    const row = button.closest('tr');
    row.cells[5].innerHTML = '<span class="badge bg-success">Supplied</span>';
    button.remove();
  }
  