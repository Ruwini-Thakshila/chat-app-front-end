const txtMessageElm = document.querySelector("#txt-message");
const btnSendElm = document.querySelector("#btn-send");
const outputElm = document.querySelector("#output");

btnSendElm.addEventListener('click', () =>{
    const message = txtMessageElm.value.trim();
    if(!message) return;
});