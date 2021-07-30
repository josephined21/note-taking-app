let googleUserId;

window.onload = event => {
  // Use this to retain user state between html pages.
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("Logged in as: " + user.displayName);
      googleUserId = user.uid;
      getNotes(googleUserId);
    } else {
      // If not logged in, navigate back to login page.
      window.location = "index.html";
    }
  });
};

const getNotes = userId => {
  const notesRef = firebase.database().ref(`users/${userId}`);
  // notesRef.orderBy("title")
  // var myUserId = firebase.auth().currentUser.uid;
  // var topUserPostsRef = firebase.database().ref('user-posts/' + myUserId).orderByChild('starCount');
  // var notesRef = firebase.database().ref('')
  
  notesRef.orderByChild('title').on("value", snapshot => {
  // snapshot.forEach( => {
    //const data = snapshot.val();
    renderDataAsHtml(snapshot);
  });
};

const renderDataAsHtml = data => {
  let cards = ``;
  // for (const noteItem in data) {
  data.forEach((child) => {
    // const note = data[noteItem];
    const note = child.val();
    console.log(note);
    const noteKey = child.key;
    // For each note create an HTML card
    // cards += createCard(note, noteItem);
    cards += createCard(note, noteKey);
  })
  // Inject our string of HTML into our viewNotes.html page
  document.querySelector("#app").innerHTML = cards;
};

const editNote = noteId => {
  const editNoteModal = document.querySelector("#editNoteModal");
  const notesRef = firebase.database().ref(`users/${googleUserId}`);
  notesRef.on("value", snapshot => {
    const data = snapshot.val();
    const noteDetails = data[noteId];
    document.querySelector("#editNoteId").value = noteId;
    document.querySelector("#editTitleInput").value = noteDetails.title;
    document.querySelector("#editTextInput").value = noteDetails.text;
  });

  editNoteModal.classList.toggle("is-active");
};

const deleteNote = noteId => {
  if (confirm("Are you sure that you want to delete this post?") == true) {
    firebase
    .database()
    .ref(`users/${googleUserId}/${noteId}`)
    .remove();
  }
};

const saveEditedNote = () => {
  const noteId = document.querySelector("#editNoteId").value;
  const noteTitle = document.querySelector("#editTitleInput").value;
  const noteText = document.querySelector("#editTextInput").value;
  const noteEdits = {
    title: noteTitle,
    text: noteText
  };
  firebase
    .database()
    .ref(`users/${googleUserId}/${noteId}`)
    .update(noteEdits);
  closeEditModal();
};

const closeEditModal = () => {
  const editNoteModal = document.querySelector("#editNoteModal");
  editNoteModal.classList.toggle("is-active");
};

// const createCard = (note, noteId) => {
//   let innerHTML = "";
//   innerHTML += `<div class="column is-one-quarter">`;
//   innerHTML += `<div class="card">`;
//   innerHTML += `<header class="card-header">`;
//   innerHTML += `<p class="card-header-title">`;
//   innerHTML += `${note.title}`;
//   innerHTML += `</p>`;
//   innerHTML += `</header>`;
//   innerHTML += `<div class="card-content">`;
//   innerHTML += `<div class="content">`;
//   innerHTML += `${note.text}`;
//   innerHTML += `</div>`;
//   innerHTML += `</div>`;
//   innerHTML += `<footer class="card-footer">`;
//   innerHTML += `<a id="${noteId}" class="card-footer-item" onclick="editNote(this.id)">Edit</a>`;
//   innerHTML += `<a id="${noteId}" href="#" class="card-footer-item" onclick="deleteNote(this.id)">Delete</a>`;
//   innerHTML += `</footer>`;
//   innerHTML += `</div>`;
//   innerHTML += `</div>`;

//   return innerHTML;
// };

const createCard = (note, noteId) => {
  return `
         <div class="column is-one-quarter">
         <div class="card">
           <header class="card-header">
             <p class="card-header-title">${note.title}</p>
           </header>
           <div class="card-content">
             <div class="content">${note.text}</div>
           </div>
           <footer class="card-footer">
           <a id="${noteId}" class="card-footer-item" onclick="editNote(this.id)">Edit</a>
           <a id="${noteId}" href="#" class="card-footer-item" onclick="deleteNote(this.id)">Delete</a>
          </footer>
         </div>
       </div> `;
};
