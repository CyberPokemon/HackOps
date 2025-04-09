function showForm(formId) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.form').forEach(f => f.classList.remove('active'));
    document.querySelector(`.tab[onclick="showForm('${formId}')"]`).classList.add('active');
    document.getElementById(formId).classList.add('active');
  
    // Reset sub-forms
    document.querySelectorAll('.sub-form').forEach(sub => sub.classList.remove('active'));
  }
  
  function chooseSignup(type) {
    document.querySelectorAll('.sub-form').forEach(form => form.classList.remove('active'));
    document.getElementById(`${type}-form`).classList.add('active');
  }
  
  function redirectToDashboard(role) {
    if (role === 'citizen') {
      window.location.href = 'citizen_dashboard.html';
    } else if (role === 'municipality') {
      window.location.href = 'municipality_dashboard.html';
    }
  }
  
  function handleSignIn() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
  
    // Dummy logic for demo
    if (email.includes('admin')) {
      window.location.href = 'municipality_dashboard.html';
    } else {
      window.location.href = 'citizen_dashboard.html';
    }
  }
  