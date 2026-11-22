// Protege as páginas internas: sem sessão, volta para o login.
function obterSessao() {
    const dados = sessionStorage.getItem("lumenSessao") || localStorage.getItem("lumenSessao");
    return dados ? JSON.parse(dados) : null;
}

if (!obterSessao()) {
    window.location.replace("../index.html");
}

// Botão "Sair" encerra a sessão
document.querySelectorAll("[data-sair]").forEach((link) => {
    link.addEventListener("click", () => {
        sessionStorage.removeItem("lumenSessao");
        localStorage.removeItem("lumenSessao");
    });
});
