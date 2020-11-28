function criaUsuario() {
    const usuario = new Usuario(document.getElementById('nome-cadastro').value, document.getElementById('ra-cadastro').value, document.getElementById('password-cadastro').value);
    usuario.salvar();
}

function logarUsuario() {
    const usuario = new Usuario(document.getElementById('nome-login').value, document.getElementById('ra-login').value, document.getElementById('password-login').value);
    usuario.logar();
}

function logout() {
    const usuario = new Usuario(localStorage.getItem('nome'), localStorage.getItem('ra'), localStorage.getItem('senha'));
    usuario.logout();
}

function mostraDados() {
    const usuario = new Usuario(localStorage.getItem('nome'), localStorage.getItem('ra'), localStorage.getItem('senha'));
    usuario.mostraDados();
}

function deletar() {
    const usuario = new Usuario(localStorage.getItem('nome'), localStorage.getItem('ra'), localStorage.getItem('senha'));
    usuario.deletar();
}

function atualizar() {
    const usuario = new Usuario(localStorage.getItem('nome'), localStorage.getItem('ra'), localStorage.getItem('senha'));
    usuario.atualizar();
}