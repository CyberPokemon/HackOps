// municipality_dashboard.js

const token = sessionStorage.getItem('token');
const requestsTableBody = document.querySelector('#requests-table tbody');
const calendarContainer = document.getElementById('calendar');
let municipalityCapacity = 0;
let approvedAmountThisMonth = 0;

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

  municipalityCapacity = profile.watercapacity;
  approvedAmountThisMonth = approved.approvedAmountThisMonth;

  renderRequests(requests);
  renderCalendar(dispatch);
}

function renderRequests(requests) {
  requestsTableBody.innerHTML = '';
  requests.filter(r => r.status === 'PENDING').forEach(req => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${req.requestId}</td>
      <td>${req.createdByName}</td>
      <td>${req.wardNo}</td>
      <td>${req.requestedAmount}</td>
      <td>${new Date(req.requireDateTime).toLocaleString()}</td>
      <td>${req.status}</td>
      <td>
        <input type="number" min="0" max="${req.requestedAmount}" id="alloc-${req.requestId}" placeholder="Amt" />
        <button onclick="approveRequest(${req.requestId}, ${req.requestedAmount})">Approve</button>
      </td>
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
