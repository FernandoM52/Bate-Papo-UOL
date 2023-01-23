let userLogin;
let messagesList = [];

function login() {
    userLogin = prompt("Qual seu nome?");
    postLogin();
}
login()

// Post para logar no servidor
function postLogin() {
    const nameObject = { name: userLogin };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nameObject);
    promise.then(loginSuccess);
    promise.catch(loginFailure);
    connectionRequest();
}
function loginSuccess() {
    console.log("Login Success");
    getMessages()
    setInterval(connectionRequest, 5000);
    setInterval(getMessages, 3000);
}
function loginFailure(erroToLogin) {
    console.log("Login falhou");
    const statusError = erroToLogin.response.status;
    console.log(statusError);
    if (statusError === 400) {
        alert("Nome de usuário já está sendo usado, digite um novo nome de usuário");
        window.location.reload()
    }

}

// Request de conexao no servidor
function connectionRequest() {
    const nameObject = { name: userLogin };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nameObject);
    promise.catch(disconnected);
}
function disconnected(req) {
    alert("Voce foi desconectado");
}

// Puxando mensagens do servidor
function getMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(showMessages);
    promise.catch(getMessagesFailure);
}
function getMessagesSuccess(msgsResponse) {
    messagesList = msgsResponse.data;
    showMessages(messagesList);

}
function getMessagesFailure(msgsError) {
    console.log("Erro ao obter mensagens");
    window.location.reload()
}

let page = document.querySelector("main");

function showMessages(response) {
    messagesList = response.data;
    let mensagem = "";

    for (let i = 0; i < messagesList.length; i++) {
        const time = messagesList[i].time;
        const from = messagesList[i].from;
        const to = messagesList[i].to;
        const text = messagesList[i].text;
        const type = messagesList[i].type;


        if (type === "status") {
            mensagem += `<li>
                            <div data-test="message" class="box-msgs statusChat">
                                <p> <span clas="msgTime">(${time})</span> <span class="msgUser">${from}</span> <span class="normalText">${text}</span> </p>
                            </div>
                         </li>
                        `
        } else if (type === "message") {
            mensagem += `<li>
                             <div data-test="message" class="box-msgs allChat">
                                <p> <span clas="msgTime">(${time})</span> <span class="msgUser">${from}</span> para <span class="msgUser">${to}:</span> <span class="normalText">${text}</span> </p>
                             </div>
                         </li>
                        `
        } else if (type === "private_message" && messagesList.to === userLogin) {
            mensagem += `<li>
                             <div data-test="message" class="box-msgs privateChat">
                                <p> <span clas="msgTime">(${time})</span> <span class="msgUser">${from}</span> para <span class="msgUser">${to}:</span> ${text} </p>
                             </div>
                         </li>
                        `
        }

        document.querySelector("ul").innerHTML = mensagem;

    }
    page.scrollIntoView();
}
let messageInput = document.querySelector('input');
function sendMessage() {
    let inputMessageTemplate = {
        from: userLogin,
        to: "Todos",
        text: messageInput.value,
        type: "message"
    };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", inputMessageTemplate);
    promise.then(sendMessageSuccess);

}

function sendMessageSuccess() {
    messageInput.value = "";
    getMessages();
}

function sendMessageFailure() {
    alert("Erro ao enviar mensagem, faça o login novamente.");
    window.location.reload();
}