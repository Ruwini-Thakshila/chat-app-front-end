import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import { auth } from '../firebase';

const txtMessageElm = document.querySelector("#txt-message");
const btnSendElm = document.querySelector("#btn-send");
const outputElm = document.querySelector("#output");
const btnSignInElm = document.querySelector("#btn-sign-in");
const loginOverlayElm = document.querySelector("#login-overlay");
const accountElm = document.querySelector("#account");
const userNameElm = document.querySelector("#user-name");
const userEmailElm = document.querySelector("#user-email");

const provider = new GoogleAuthProvider();
const user = {
    email: null,
    name: null,
    picture: null
};

let ws = null;

accountElm.addEventListener('click', (e)=>{
    accountElm.querySelector("#account-details").classList.remove('d-none');
    e.stopPropagation();
});

document.addEventListener('click', ()=>{
    accountElm.querySelector("#account-details").classList.add('d-none');
})

btnSendElm.addEventListener('click', () =>{
    const message = txtMessageElm.value.trim();
    if(!message) return;
});

onAuthStateChanged(auth, (loggedUser) =>{
    if(loggedUser){
        user.email = loggedUser.email;
        user.name = loggedUser.displayName;
        user.picture = loggedUser.photoURL;
        finalizeLogin();
        loginOverlayElm.classList.add('d-none');

    }else{
        user.email = null;
        user.name = null;
        user.picture = null;
        loginOverlayElm.classList.remove('d-none');

    }
})
btnSignInElm.addEventListener('click', ()=>{
    signInWithPopup(auth, provider)
    .then(res =>{
        user.email = res.user.email;
        user.name = res.user.displayName;
        user.picture = res.user.photoURL;
        loginOverlayElm.classList.add('d-none');
        finalizeLogin();
    }).catch(err => alert("Failed to sign in, try again!"));
});

function finalizeLogin(){
    userEmailElm.innerText = user.email;
    userNameElm.innerText = user.name;
    accountElm.style.backgroundImage = `url(${user.picture})`;
}


