// const studentList = document.querySelector('#students-list');
const studentForm = document.querySelector('#add-student-form');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin')

const studentLists = document.querySelector('.students');
const studentTable = document.querySelector('#studentTable');
const teacherLists = document.querySelector('.teachers');
const teacherTable = document.querySelector('#teacherTable');

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

function deleteStudent(argument) {
  db.collection('students').doc(argument).delete();
  alert("Student deleted successfully.")
}

function deleteTeacher(argument) {
  db.collection('teachers').doc(argument).delete();
  alert("Teacher deleted successfully.")
}

function editStudent(argument) {
  console.log(argument)
  var studentFrom = document.getElementById('modal-edit');
  studentFrom.classList.add("open");
  studentFrom.setAttribute("style", "z-index: 1003; display: block; opacity: 1; top: 10%; transform: scaleX(1) scaleY(1);");
  document.getElementById('studentUid').value = argument;
}

function editTeacher(argument) {
  db.collection('teachers').doc(argument).update()
  alert("Teacher was update successfully.")
}
// collect studentlist
const setupStudents = (data) => {
  if (data.length) {
    let html = '';
    const row = "<tr><th>'Name'</th><th>'Standard'</th><th>X</th></tr>";
    data.forEach(doc => {
      const cross = doc._delegate._key.path.segments.slice(-1)[0]
      const student = doc.data();
      const row = "<tr><td>" + student.name + "</td><td>" + student.standard + "</td><td>" + '<input type="button" id="'+cross+'" class="waves-effect waves-light btn-small" value="Edit" onclick="editStudent(this.id);"/>' + "</td><td>" + '<input type="button" id="'+cross+'" class="waves-effect waves-light btn-small red" value="Delete" onclick="deleteStudent(this.id);"/>' + "</td></tr>";
      html += row;
    });
    studentTable.innerHTML = html;

  }else{
    studentLists.innerHTML = '<h5 class="center align">Login for access the application</h5>'
  }
}

// collect teacherList
const setupTeachers = (data) => {
  if(data.length) {
    let html = '';
    data.forEach(doc => {
      const cross = doc._delegate._key.path.segments.slice(-1)[0]
      const teacher = doc.data();
      const row = "<tr><td>" + teacher.name + "</td><td>" + teacher.email + "</td><td>" + teacher.birthdate + "</td><td>" + teacher.is_active + "</td><td>" + teacher.user_id + "</td><td>" + '<input type="button" id="'+cross+'" class="waves-effect waves-light btn-small" value="Edit" onclick="editTeacher(this.id);"/>' + "</td><td>" + '<input type="button" class="waves-effect waves-light btn-small red" id="'+cross+'" value="Delete" onclick="deleteTeacher(this.id);"/>' + "</td></tr>";
      html += row;
    });
    teacherTable.innerHTML = html;
  }else{
    teacherLists.innerHTML = ''
  }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});
