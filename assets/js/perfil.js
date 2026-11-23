/*
Descricao: Projeto Blog do Matheus
nome_exercicio: SituaÃ§Ã£o de Aprendizagem 02
nome_aluno: Matheus Henrique Batista Raimundo
email_aluno: matheus.raimundo3@aluno.cps.sp.gov.br
turma: WEBI-ISW028-A
*/

const sessao = obterSessao();
const ultimoAcesso = document.getElementById("ultimoAcesso");

if (sessao) {
    const data = new Date(sessao.entrada);
    ultimoAcesso.textContent = data.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
}

const formPerfil = document.getElementById("formPerfil");
const alertaPerfil = document.getElementById("alertaPerfil");
const campoTelefone = document.getElementById("telefone");

// Máscara simples de telefone: (00) 00000-0000
campoTelefone.addEventListener("input", () => {
    const numeros = campoTelefone.value.replace(/\D/g, "").slice(0, 11);
    let formatado = numeros;
    if (numeros.length > 2) formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    if (numeros.length > 6) {
        const meio = numeros.length === 11 ? 7 : 6;
        formatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, meio)}-${numeros.slice(meio)}`;
    }
    campoTelefone.value = formatado;
});

formPerfil.addEventListener("submit", (evento) => {
    evento.preventDefault();
    let primeiroInvalido = null;

    formPerfil.querySelectorAll("input[required], select[required]").forEach((campo) => {
        const valido = campo.checkValidity();
        campo.classList.toggle("is-invalid", !valido);
        if (!valido && !primeiroInvalido) primeiroInvalido = campo;
    });

    if (primeiroInvalido) {
        alertaPerfil.classList.add("d-none");
        primeiroInvalido.focus();
        return;
    }

    document.getElementById("nomeUsuario").textContent = document.getElementById("nome").value.trim();
    alertaPerfil.textContent = "Dados atualizados com sucesso.";
    alertaPerfil.classList.remove("d-none");
});

formPerfil.addEventListener("reset", () => {
    formPerfil.querySelectorAll(".is-invalid").forEach((campo) => campo.classList.remove("is-invalid"));
    alertaPerfil.classList.add("d-none");
});
