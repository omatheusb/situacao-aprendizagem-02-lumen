// Tela de login: validação dos campos e acesso de demonstração.
// Sem back-end nesta etapa, então o usuário de teste fica definido aqui.
const USUARIO_DEMO = {
    email: "ana@lumen.com.br",
    senha: "lumen123"
};

const formLogin = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const alerta = document.getElementById("alertaLogin");
const botaoMostrar = document.getElementById("mostrarSenha");

function mostrarErro(mensagem) {
    alerta.textContent = mensagem;
    alerta.classList.remove("d-none");
}

function validarCampo(campo) {
    const valido = campo.checkValidity();
    campo.classList.toggle("is-invalid", !valido);
    return valido;
}

// Mostrar ou esconder a senha
botaoMostrar.addEventListener("click", () => {
    const visivel = campoSenha.type === "text";
    campoSenha.type = visivel ? "password" : "text";
    botaoMostrar.textContent = visivel ? "Mostrar" : "Ocultar";
    botaoMostrar.setAttribute("aria-pressed", String(!visivel));
    botaoMostrar.setAttribute("aria-label", visivel ? "Mostrar senha" : "Ocultar senha");
});

// Remove o erro assim que o usuário corrige o campo
[campoEmail, campoSenha].forEach((campo) => {
    campo.addEventListener("input", () => {
        if (campo.classList.contains("is-invalid")) {
            validarCampo(campo);
        }
        alerta.classList.add("d-none");
    });
});

formLogin.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const emailOk = validarCampo(campoEmail);
    const senhaOk = validarCampo(campoSenha);

    if (!emailOk || !senhaOk) {
        (emailOk ? campoSenha : campoEmail).focus();
        return;
    }

    const email = campoEmail.value.trim().toLowerCase();
    if (email !== USUARIO_DEMO.email || campoSenha.value !== USUARIO_DEMO.senha) {
        mostrarErro("E-mail ou senha incorretos. Confira os dados e tente de novo.");
        campoSenha.value = "";
        campoSenha.focus();
        return;
    }

    const lembrar = document.getElementById("lembrar").checked;
    const armazenamento = lembrar ? localStorage : sessionStorage;
    armazenamento.setItem("lumenSessao", JSON.stringify({ email, entrada: new Date().toISOString() }));

    window.location.href = "pages/perfil.html";
});
