/*
Descricao: Projeto Blog do Matheus
nome_exercicio: SituaÃ§Ã£o de Aprendizagem 02
nome_aluno: Matheus Henrique Batista Raimundo
email_aluno: matheus.raimundo3@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/

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
