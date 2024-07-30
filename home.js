import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import { auth } from "./config.js";
import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js"; 
import { db } from "./config.js";


onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid)
    } else {
        window.location = 'index.html'
    }
  });

const logout = document.querySelector('#logout-btn')

logout.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log('logout Successfully')
        window.location = 'index.html'
      }).catch((error) => {

        console.log('error')
    });
})



// todo app

const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const ul = document.querySelector("#ul");


const arr = [];


async function getData(){
  const querySnapshot = await getDocs(collection(db, "todos"));
querySnapshot.forEach((doc) => {
  console.log(doc.data());
  arr.push(doc.data());
});
renderTodo();
}
getData()


function renderTodo(){
  ul.innerHTML= "";
  if (arr.length === 0) {
    ul.innerHTML = "No Data Found"
    return;
  }
  arr.map((item)=>{
    ul.innerHTML += `
    <li>${item.todo}</li>
    `
  });
}


form.addEventListener('submit', async (event)=>{
event.preventDefault();
console.log('todo.value', todo.value)
arr.push({
  todo: todo.value,
})
renderTodo()
try {
  const docRef = await addDoc(collection(db, "todos"),{
    todo: todo.value,
  });
  todo.vale = "";
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}
})



