// // add admin cloud function
// const adminForm = document.querySelector('.admin-actions');
// adminForm.addEventListener('submit', (e) => {
//   e.preventDefault();

//   const adminEmail = document.querySelector('#admin-email').value;
//   const addAdminRole = functions.httpsCallable('addAdminRole');
//   addAdminRole({ email: adminEmail }).then(result => {
//     console.log(result);
//   });
// });

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      bio: signupForm['signup-bio'].value,
      gender: signupForm[name='gender'].value
    })
  }).then(() => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
})

// login form
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // sign up the user
  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // close the login modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });
});

// auth status change.
auth.onAuthStateChanged(user => {
  console.log(user)
  if (user){
    user.getIdTokenResult().then(idTokenResult => {
      user.admin = idTokenResult.claims.admin;
      setupUI(user);
    })
    document.querySelector('#user_id').value = user.uid
    db.collection('students').onSnapshot(snapShot => {
      setupStudents(snapShot.docs);
    }, err => {
      console.log(err.message);
    });
    db.collection('teachers').where('user_id', '==', user.uid).onSnapshot(snapShot => {
      setupTeachers(snapShot.docs);
    }, err => {
      console.log(err.message);
    });
  }else{
    setupStudents([]);
    setupTeachers([]);
    setupUI();
  }
})

// create student
const createForm = document.querySelector('#create-student');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();

  db.collection('students').add({
    name: createForm['name'].value,
    standard: createForm['standard'].value
  }).then(() => {
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  })
});

// edit student
const editForm = document.querySelector('#edit-student');
editForm.addEventListener('submit', (e) => {
  e.preventDefault();
  var id = document.getElementById('studentUid').value
  db.collection('students').doc(id).update({
    name: editForm['name'].value,
    standard: editForm['standard'].value
  }).then(() => {
    const modal = document.querySelector('#modal-edit');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  })
  alert("Student was update successfully.")
});

// create teacher
const createTeacher = document.querySelector('#create-teacher');
createTeacher.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('teachers').add({
    name: createTeacher['name'].value,
    email: createTeacher['email'].value,
    birthdate: createTeacher['birthdate'].value,
    is_active: createTeacher[name='is_active'].value,
    user_id: createTeacher['user_id'].value
  }).then(() => {
    const modal = document.querySelector('#modal-create-teacher');
    M.Modal.getInstance(modal).close();
    createTeacher.reset();
  })
})