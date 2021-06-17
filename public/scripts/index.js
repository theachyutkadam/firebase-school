const studentList = document.querySelector('#students-list');
const studentForm = document.querySelector('#add-student-form');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin')
const studentLists = document.querySelector('.students');
const studentTable = document.querySelector('#studentTable');

const setupUI = (user) => {
  if (user){
    if (user.admin){
      adminItems.forEach(item => item.style.display = 'block');
    }
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div class="pink-text">${user.admin? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    })

    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  }else{
    adminItems.forEach(item => item.style.display = 'none');
    accountDetails.innerHTML = '';
    // toggle UI elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

// collect guidelist
const setupStudents = (data) => {
  if (data.length) {
    let html = '';
    const row = "<tr><th>'Name'</th><th>'Standard'</th><th>X</th></tr>";
    data.forEach(doc => {
      const student = doc.data();
      const row = "<tr><td>" + student.name + "</td><td>" + student.standard + "</td><td>Edit</td><td>Delete</td></tr>";
      html += row;
    });
    studentTable.innerHTML = html;

  }else{
    studentLists.innerHTML = '<h5 class="center align">Login to view students</h5>'
  }

  cross.addEventListener('click', (e) => {
    e.stopPropagation
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('products').doc(id).delete();
  })
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
