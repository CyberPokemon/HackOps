document.addEventListener("DOMContentLoaded", () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please login again.");
      window.location.href = "login.html";
      return;
    }
  
    const requestForm = document.getElementById("water-request-form");
    const historyTable = document.getElementById("history-table-body");
    const calendarDiv = document.getElementById("calendar");
  
    // Handle form submission
    requestForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const amount = document.getElementById("amount").value;
      const requireDateTime = document.getElementById("requireDateTime").value;
  
      try {
        const res = await fetch("http://localhost:8080/api/water/request", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify({
            requestedAmount: parseInt(amount),
            requireDateTime: requireDateTime
          })
        });
  
        const data = await res.json();
  
        if (!res.ok) throw new Error(data.message || "Request failed");
  
        alert("Water request submitted successfully!");
        requestForm.reset();
        loadHistory();
        loadCalendar();
      } catch (error) {
        alert("Error submitting request: " + error.message);
      }
    });
  
    async function loadHistory() {
      try {
        const res = await fetch("http://localhost:8080/api/water/history", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        historyTable.innerHTML = "";
        data.forEach(req => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${req.requestId}</td>
            <td>${req.municipality}</td>
            <td>${req.wardNo}</td>
            <td>${req.requestedAmount}</td>
            <td>${req.allocatedAmount}</td>
            <td>${req.status}</td>
            <td>${new Date(req.requireDateTime).toLocaleString()}</td>
          `;
          historyTable.appendChild(row);
        });
      } catch (err) {
        console.error("Error loading history:", err);
      }
    }
  
    async function loadCalendar() {
      try {
        const res = await fetch("http://localhost:8080/api/citizen/dispatch-history", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        calendarDiv.innerHTML = "";
        data.forEach(entry => {
          const dayDiv = document.createElement("div");
          dayDiv.innerHTML = `<strong>${entry.date}</strong><br>${entry.totalApprovedAmount}L`;
          calendarDiv.appendChild(dayDiv);
        });
      } catch (err) {
        console.error("Error loading calendar:", err);
      }
    }
  
    loadHistory();
    loadCalendar();
  });
  