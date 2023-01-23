let userLogin;

function login() {
    userLogin = prompt("Qual seu nome?");
    if (userLogin !== "") {
        postLogin();
    } //else if () {

    //}
}
login()

// Post para logar no servidor
function postLogin() {
    const nameObject = { name: userLogin };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", nameObject); // Enviando nome de login para o servidor
    promise.then(loginSuccess);
    promise.catch(loginFailure); //*****Nao esquecer de fazer o tratamento em caso de login igual********
    //connectionRequest();
}

// Promise do post login
function loginSuccess(response) {
    console.log("Login Success");
}

function loginFailure(erro) {
    console.log("Login Failure");
    console.log(erro);
}

// Request de conexao no servidor
function connectionRequest() {
    //setInterval(axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: userLogin }), 5000);
    //promise.then(requestSuccess);
    //promise.catch(requestFailure);
}


// Promise da request
function requestSuccess(response) {
    console.log("Conexao OK");
}
function requestFailure(erro) {
    console.log("Conexao caiu");
    console.log(erro);
}