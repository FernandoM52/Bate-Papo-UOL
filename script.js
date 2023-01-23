let userLogin;

function login() {
    userLogin = prompt("Qual seu nome?");
    postLogin();
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
    setInterval(connectionRequest, 5000);
}

function loginFailure(erro) {
    console.log("Login falhou");
    const statusError = erro.response.status;
    console.log(statusError);
    /*if (userLogin === "") {

    }*/

}

// Request de conexao no servidor
function connectionRequest() {
    const nameObject = { name: userLogin };
    const promise = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", nameObject);
    promise.catch(disconnected);
}


// Promise da request
function disconnected(req) {
    console.log("Voce foi desconectado");
}