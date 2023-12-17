import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut} from 'firebase/auth'
import { auth } from '../firebase';

const txtMessageElm = document.querySelector("#txt-message");
const btnSendElm = document.querySelector("#btn-send");
const outputElm = document.querySelector("#output");
const btnSignInElm = document.querySelector("#btn-sign-in");
const btnSignOutElm = document.querySelector("#btn-sign-out");
const loginOverlayElm = document.querySelector("#login-overlay");
const accountElm = document.querySelector("#account");
const userNameElm = document.querySelector("#user-name");
const userEmailElm = document.querySelector("#user-email");
const {API_BASE_URL} = process.env;

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
});

btnSignOutElm.addEventListener('click', (e) =>{
    accountElm.querySelector("#account-details").classList.add('d-none');
    e.stopPropagation();
    signOut(auth);
})


onAuthStateChanged(auth, (loggedUser) =>{
    if(loggedUser){
        user.email = loggedUser.email;
        user.name = loggedUser.displayName;
        user.picture = loggedUser.photoURL;
        finalizeLogin();
        loginOverlayElm.classList.add('d-none');

        if(!ws){
            ws = new WebSocket(`${API_BASE_URL}/messages`);
            ws.addEventListener('message', loadNewChatMessages);
            ws.addEventListener('error', ()=>{
                alert("Connection failure, try refreshing the application");
            })
        }
    }else{
        user.email = null;
        user.name = null;
        user.picture = null;
        loginOverlayElm.classList.remove('d-none');
        if(ws){
            ws.close();
            ws = null;
        }
    }
});

function loadNewChatMessages(e){
    const msg = JSON.parse(e.data);
    addChatMessageRecord(msg);
}

function addChatMessageRecord({message, email, name}){
    const labelElm = document.createElement('label');
    labelElm.classList.add('lbl-name');
    const messageElm = document.createElement('div');
    messageElm.classList.add('message');
    if(email === user.email){
        messageElm.classList.add('me');

    }else{
        messageElm.classList.add('others');
        outputElm.append(labelElm);
        labelElm.innerText = name;
    }
    outputElm.append(messageElm);
    messageElm.innerText = message;
}

btnSendElm.addEventListener('click', () =>{
    const message = txtMessageElm.value.trim();
    if(!message) return;

    const msgObj = {
        message,
        email: user.email,
        name: user.name
    };

    ws.send(JSON.stringify(msgObj));
    addChatMessageRecord(msgObj);
    outputElm.scrollTo(0, outputElm.scrollHeight);
    txtMessageElm.value = '';
    txtMessageElm.focus();
});

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


