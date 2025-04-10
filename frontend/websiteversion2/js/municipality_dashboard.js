const token = sessionStorage.getItem('token');
if (!token) {
  window.location.href = '../index.html';
}

const requestsTableBody = document.querySelector('#requests-table tbody');
const calendarContainer = document.getElementById('calendar');
const municipalityNameEl = document.getElementById('municipality-name');
const logoutBtn = document.getElementById('logout-btn');

let municipalityCapacity = 0;
let approvedAmountThisMonth = 0;

logoutBtn.addEventListener('click', () => {
  sessionStorage.removeItem('token');
  window.location.href = '../html/index.html';
});

async function fetchData(url) {
  const res = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return res.json();
}

async function initDashboard() {
  const [requests, approved, profile, dispatch] = await Promise.all([
    fetchData('http://localhost:8080/api/municipality/waterrequests'),
    fetchData('http://localhost:8080/api/municipality/approvedwater'),
    fetchData('http://localhost:8080/api/municipality/profile'),
    fetchData('http://localhost:8080/api/municipality/dispatchschedule'),
  ]);

  console.log(profile);
  municipalityCapacity = profile.watercapacity;
  approvedAmountThisMonth = approved.approvedAmountThisMonth;

  municipalityNameEl.textContent = profile.municipalityName || 'Unknown Municipality';

  renderRequests(requests);
  renderCalendar(dispatch);
}

function renderRequests(requests) {
  requestsTableBody.innerHTML = '';
  requests.forEach(req => {
    const tr = document.createElement('tr');
    let actionButtons = '';

    if (req.status === 'PENDING') {
      actionButtons = `
        <input type="number" min="0" max="${req.requestedAmount}" id="alloc-${req.requestId}" placeholder="Amt" />
        <button onclick="approveRequest(${req.requestId}, ${req.requestedAmount})">Approve</button>
        <button onclick="rejectRequest(${req.requestId})">Reject</button>
      `;
    } else {
      actionButtons = 'N/A';
    }

    tr.innerHTML = `
      <td>${req.requestId}</td>
      <td>${req.createdByName}</td>
      <td>${req.wardNo}</td>
      <td>${req.requestedAmount}</td>
      <td>${new Date(req.requireDateTime).toLocaleString()}</td>
      <td>${req.status}</td>
      <td>${req.allocatedAmount ?? '-'}</td>
      <td>${actionButtons}</td>
    `;
    requestsTableBody.appendChild(tr);
  });
}

async function approveRequest(requestId, maxAmount) {
  const input = document.getElementById(`alloc-${requestId}`);
  const amount = parseInt(input.value);
  if (isNaN(amount) || amount < 0 || amount > maxAmount) {
    alert('Invalid allocation amount');
    return;
  }

  if ((approvedAmountThisMonth + amount) > municipalityCapacity) {
    alert('Allocation exceeds monthly water capacity');
    return;
  }

  const url = `http://localhost:8080/api/municipality/waterreqdecision?requestId=${requestId}&allocatedAmount=${amount}&status=APPROVED`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (res.ok) {
    alert('Request approved!');
    initDashboard();
  } else {
    alert('Failed to approve request');
  }
}

async function rejectRequest(requestId) {
  const url = `http://localhost:8080/api/municipality/waterreqdecision?requestId=${requestId}&allocatedAmount=0&status=REJECTED`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` }
  });

  if (res.ok) {
    alert('Request rejected!');
    initDashboard();
  } else {
    alert('Failed to reject request');
  }
}

function renderCalendar(schedule) {
  calendarContainer.innerHTML = '';
  schedule.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'calendar-entry';
    div.innerHTML = `<strong>${entry.date}</strong><br/>${entry.totalApprovedAmount} L`;
    calendarContainer.appendChild(div);
  });
}

initDashboard();
